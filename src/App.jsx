import { useState } from "react";
import { questionsData } from "./questions";
import "./App.css";

// Helper function to shuffle questions (Bonus Challenge)
function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 1. Reusable Component: QuizProgress
function QuizProgress({ current, total }) {
  const progressPercentage = ((current + 1) / total) * 100;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="question-count">
          Question {current + 1}/{total}
        </span>
        <span className="progress-percent">{Math.round(progressPercentage)}%</span>
      </div>
      <div className="progress-bar-bg">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// 2. Reusable Component: Option
function Option({ text, index, isSelected, onSelect }) {
  const letters = ["A", "B", "C", "D"];
  return (
    <button
      className={`option-btn ${isSelected ? "selected" : ""}`}
      onClick={() => onSelect(index)}
    >
      <span className="option-letter">{letters[index]}</span>
      <span className="option-text">{text}</span>
    </button>
  );
}

// 3. Reusable Component: Question
function Question({ questionObj, selectedOption, onSelectOption }) {
  return (
    <div className="question-card">
      <h2 className="question-text">{questionObj.question}</h2>
      <div className="options-list">
        {questionObj.options.map((optionText, idx) => (
          <Option
            key={idx}
            index={idx}
            text={optionText}
            isSelected={selectedOption === idx}
            onSelect={onSelectOption}
          />
        ))}
      </div>
    </div>
  );
}

// 4. Reusable Component: Result
function Result({ score, total, onRestart }) {
  const incorrect = total - score;
  const percentage = Math.round((score / total) * 100);

  let resultMessage = "";
  if (percentage >= 85) {
    resultMessage = "Outstanding! You have a rock-solid grasp of web development!";
  } else if (percentage >= 60) {
    resultMessage = "Great job! You know your fundamentals well.";
  } else if (percentage >= 40) {
    resultMessage = "Good effort! A little more practice and you'll master these concepts.";
  } else {
    resultMessage = "Keep practicing! Review the basics and give it another shot.";
  }

  return (
    <div className="screen result-screen">
      <div className="score-badge">
        <span className="score-number">{score}</span>
        <span className="score-total">/ {total}</span>
      </div>

      <h2>Quiz Completed!</h2>
      <p className="result-message">{resultMessage}</p>

      <div className="stats-grid">
        <div className="stat-box correct">
          <span className="stat-value">{score}</span>
          <span className="stat-label">Correct</span>
        </div>
        <div className="stat-box incorrect">
          <span className="stat-value">{incorrect}</span>
          <span className="stat-label">Incorrect</span>
        </div>
      </div>

      <button className="primary-btn" onClick={onRestart}>
        Restart Quiz
      </button>
    </div>
  );
}

// Main App Component
export default function App() {
  const [quizStage, setQuizStage] = useState("start"); // "start" | "quiz" | "result"
  const [questions, setQuestions] = useState(questionsData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);

  // Start or Restart the Quiz with Shuffled Questions
  const handleStartQuiz = () => {
    setQuestions(shuffleArray(questionsData));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setQuizStage("quiz");
  };

  // Move to the Next Question or Finish
  const handleNextQuestion = () => {
    if (selectedOption === null) return;

    if (selectedOption === questions[currentIndex].answer) {
      setScore((prevScore) => prevScore + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizStage("result");
    }
  };

  return (
    <div className="app-wrapper">
      <div className="quiz-container">
        {/* Conditional Rendering: 1. Home / Start Screen */}
        {quizStage === "start" && (
          <div className="screen start-screen">
            <h1>Interactive Frontend Quiz</h1>
            <p className="description">
              Test your foundational knowledge across HTML, CSS, JavaScript, and
              React. Questions are shuffled on every attempt!
            </p>
            <div className="info-pill">
              Total Questions: <strong>{questionsData.length}</strong>
            </div>
            <button className="primary-btn" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </div>
        )}

        {/* Conditional Rendering: 2. Quiz Screen */}
        {quizStage === "quiz" && (
          <div className="screen quiz-screen">
            <QuizProgress
              current={currentIndex}
              total={questions.length}
            />
            <Question
              questionObj={questions[currentIndex]}
              selectedOption={selectedOption}
              onSelectOption={setSelectedOption}
            />
            <button
              className="primary-btn next-btn"
              onClick={handleNextQuestion}
              disabled={selectedOption === null}
            >
              {currentIndex + 1 === questions.length
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        )}

        {/* Conditional Rendering: 3. Results Screen */}
        {quizStage === "result" && (
          <Result
            score={score}
            total={questions.length}
            onRestart={handleStartQuiz}
          />
        )}
      </div>
    </div>
  );
}