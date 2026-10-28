import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react";

import "../styles/quiz.css";

const questions = [
  {
    question: "What is AngularJS?",
    options: [
      "A JavaScript framework",
      "A database",
      "An operating system",
      "A programming language",
    ],
    answer: 0,
  },
  {
    question: "Which directive repeats HTML elements?",
    options: ["ng-if", "ng-repeat", "ng-hide", "ng-click"],
    answer: 1,
  },
  {
    question: "Which directive provides two-way data binding?",
    options: ["ng-repeat", "ng-init", "ng-model", "ng-show"],
    answer: 2,
  },
  {
    question: "Which syntax is used for AngularJS expressions?",
    options: ["[[ ]]", "{{ }}", "(())", "<% %>"],
    answer: 1,
  },
  {
    question: "Which directive handles click events?",
    options: ["ng-click", "ng-value", "ng-repeat", "ng-filter"],
    answer: 0,
  },
  {
    question: "Which component manages application logic?",
    options: ["Filter", "Controller", "HTML tag", "CSS class"],
    answer: 1,
  },
  {
    question: "Which method creates an AngularJS module?",
    options: [
      "angular.create()",
      "angular.module()",
      "angular.start()",
      "angular.controller()",
    ],
    answer: 1,
  },
  {
    question: "Which filter converts text to uppercase?",
    options: ["lowercase", "orderBy", "uppercase", "filter"],
    answer: 2,
  },
  {
    question: "Which directive initializes an AngularJS application?",
    options: ["ng-model", "ng-app", "ng-repeat", "ng-submit"],
    answer: 1,
  },
  {
    question: "Which directive displays content conditionally?",
    options: ["ng-repeat", "ng-model", "ng-if", "ng-app"],
    answer: 2,
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentQuestion];

  const answeredCount = Object.keys(selectedAnswers).length;

  const score = questions.reduce((total, item, index) => {
    return total + (selectedAnswers[index] === item.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  function selectAnswer(optionIndex) {
    if (submitted) return;

    setSelectedAnswers((previous) => ({
      ...previous,
      [currentQuestion]: optionIndex,
    }));
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSubmitted(false);
  }

  function submitQuiz() {
    if (answeredCount === questions.length) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="quiz-page">
        <div className="quiz-container quiz-result-container">
          <div className="quiz-result">
            <div className="result-icon">
              <Trophy size={42} />
            </div>

            <p className="quiz-label">QUIZ COMPLETED</p>
            <h1>Your Result</h1>

            <div className="score-circle">
              <strong>
                {score}/{questions.length}
              </strong>
              <span>Marks</span>
            </div>

            <p className="result-percentage">{percentage}% Score</p>

            <h2>
              {score >= 8
                ? "Excellent Work!"
                : score >= 5
                  ? "Good Job!"
                  : "Keep Practicing!"}
            </h2>

            <p>
              You answered {score} out of {questions.length} questions correctly.
            </p>

            <div className="result-actions">
              <button onClick={restartQuiz} className="primary-button">
                <RotateCcw size={17} />
                Try Again
              </button>

              <Link to="/topics" className="secondary-button">
                Back to Topics
              </Link>

              <Link to="/dashboard" className="secondary-button">
                Dashboard
              </Link>
            </div>
          </div>

          <section className="answer-review">
            <h2>Review Your Answers</h2>
            <p className="review-description">
              Check your answers and learn from your mistakes.
            </p>

            {questions.map((item, index) => {
              const isCorrect = selectedAnswers[index] === item.answer;

              return (
                <article
                  key={index}
                  className={`review-item ${
                    isCorrect ? "correct" : "incorrect"
                  }`}
                >
                  <div className="review-question-heading">
                    <h3>
                      {index + 1}. {item.question}
                    </h3>

                    {isCorrect ? (
                      <CheckCircle size={21} />
                    ) : (
                      <XCircle size={21} />
                    )}
                  </div>

                  <p>
                    <strong>Your answer:</strong>{" "}
                    {item.options[selectedAnswers[index]]}
                  </p>

                  {!isCorrect && (
                    <p>
                      <strong>Correct answer:</strong>{" "}
                      {item.options[item.answer]}
                    </p>
                  )}

                  <span className="review-status">
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </article>
              );
            })}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <Link to="/topics" className="back-link">
          <ArrowLeft size={17} />
          Back to Topics
        </Link>

        <header className="quiz-heading">
          <p className="quiz-label">TEST YOUR KNOWLEDGE</p>
          <h1>AngularJS Quiz</h1>
          <p>Answer all the questions and check your score.</p>
        </header>

        <div className="quiz-progress">
          <div className="progress-info">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <section className="question-card">
          <div className="question-number">
            QUESTION {String(currentQuestion + 1).padStart(2, "0")}
          </div>

          <h2>{question.question}</h2>

          <div className="answer-options">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion] === index;

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  className={`answer-option ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => selectAnswer(index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  {isSelected && (
                    <CheckCircle className="option-check" size={19} />
                  )}
                </button>
              );
            })}
          </div>

          <div className="quiz-navigation">
            <button
              type="button"
              className="secondary-button"
              disabled={currentQuestion === 0}
              onClick={previousQuestion}
            >
              <ArrowLeft size={17} />
              Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                type="button"
                className="primary-button"
                onClick={nextQuestion}
              >
                Next
                <ArrowRight size={17} />
              </button>
            ) : (
              <button
                type="button"
                className="primary-button"
                disabled={answeredCount !== questions.length}
                onClick={submitQuiz}
              >
                Submit Quiz
                <CheckCircle size={17} />
              </button>
            )}
          </div>

          {currentQuestion === questions.length - 1 &&
            answeredCount !== questions.length && (
              <p className="quiz-warning">
                Please answer all questions before submitting.
              </p>
            )}
        </section>

        <div className="quiz-footer-info">
          <p>
            Answered: <strong>{answeredCount}</strong> / {questions.length}
          </p>

          <button
            type="button"
            className="reset-button"
            onClick={restartQuiz}
          >
            <RotateCcw size={15} />
            Reset Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quiz;

