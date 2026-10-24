# Interactive Fundamentals Quiz

An interactive multiple-choice quiz web application built with **React** and **Vite**. Designed to test foundational web development concepts across HTML, CSS, JavaScript, and React through a clean, responsive interface.

## 🔗 Live Demo
**[Play the Live Quiz Here](#)** *(Replace `#` with your Vercel link after deploying)*

---

## ✨ Features

* **Start Screen:** Displays the quiz title, overview, total question count (15 questions), and a quick-start button.
* **Dynamic Quiz Interface:** 
  * Renders one multiple-choice question at a time with four selectable options.
  * Highlights the currently selected answer option.
  * Tracks real-time progress with a question counter (`e.g., Question 3/15`) and an animated progress bar.
* **Question Shuffling:** Randomizes the order of questions on every start and restart using the Fisher-Yates shuffle algorithm.
* **Results & Analytics Screen:** 
  * Displays the final score, a breakdown of correct vs. incorrect answers, and personalized performance feedback.
  * Includes a one-click **Restart Quiz** button for immediate replay.
* **Responsive Design:** Fully optimized for both desktop and mobile screens.

---

## 🛠️ Tech Stack & React Concepts Used

* **Frontend:** React (Functional Components & JSX), JavaScript (ES6+), CSS3, HTML5
* **Build Tool:** Vite
* **Core React Architecture:**
  * **Reusable Components:** Modularized into `QuizProgress`, `Question`, `Option`, and `Result` components.
  * **Props:** Passes question data, option states, and callback handlers cleanly from parent to child components.
  * **State Management (`useState`):** Tracks quiz stage (`start`, `quiz`, `result`), current question index, selected option, and user score.
  * **Conditional Rendering:** Dynamically switches views based on the current stage of the quiz.
  * **List Rendering:** Uses `.map()` to dynamically generate answer options from structured data objects.

---

## 📂 Project Structure

```text
quiz-web-app/
├── public/
├── src/
│   ├── App.css          # Custom styling and mobile responsiveness
│   ├── App.jsx          # Main application logic and reusable UI components
│   ├── index.css        # Global reset styles
│   ├── main.jsx         # React DOM entry point
│   └── questions.js     # Array of 15 structured question objects
├── index.html
├── package.json
└── vite.config.js
