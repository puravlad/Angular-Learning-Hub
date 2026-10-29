import { useRef, useState } from "react";
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

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const saveStarted = useRef(false);

  const question = questions[currentQuestion];

  const answeredCount = Object.keys(selectedAnswers).length;

  const score = questions.reduce((total, item, index) => {
    return total + (selectedAnswers[index] === item.answer ? 1 : 0);
  }, 0);

  const percentage = Math.round((score / questions.length) * 100);

  function selectAnswer(optionIndex) {
    if (submitted) return;

    setSelectedAnswers((previousAnswers) => ({
      ...previousAnswers,
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

  async function saveAttempt() {
    if (saveStarted.current || saved) return;

    saveStarted.current = true;
    setSaving(true);
    setSaveError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please log in again before saving your result.");
      }

      const answers = questions.map((item, index) => ({
        questionId: String(index + 1),
        questionText: item.question,
        selectedAnswer:
          item.options[selectedAnswers[index]],
        correctAnswer: item.options[item.answer],
        isCorrect: selectedAnswers[index] === item.answer,
      }));

      const response = await fetch(
        "http://localhost:5000/api/quizzes/attempts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            quizTitle: "AngularJS Quiz",
            answers,
            score,
            totalQuestions: questions.length,
            percentage,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save quiz result."
        );
      }

      setSaved(true);
    } catch (error) {
      setSaveError(
        error.message || "Unable to save quiz result."
      );

      // Allow the student to retry.
      saveStarted.current = false;
    } finally {
      setSaving(false);
    }
  }

  function submitQuiz() {
    if (answeredCount !== questions.length || submitted) {
      return;
    }

    setSubmitted(true);
    saveAttempt();
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setSubmitted(false);
    setSaving(false);
    setSaved(false);
    setSaveError("");
    saveStarted.current = false;
  }

  if (submitted) {
    return (
      <div className="quiz-container">
        <div className="quiz-result">
          <div className="result-icon">
            <Trophy size={48} />
          </div>

          <h1>Quiz Completed!</h1>

          <p className="result-score">
            You scored {score} out of {questions.length}
          </p>

          <p className="result-percentage">
            {percentage}% Score
          </p>

          {saving && (
            <p role="status">
              Saving your result to the database...
            </p>
          )}

          {saved && (
            <p role="status">
              Quiz result saved successfully!
            </p>
          )}

          {saveError && (
            <div role="alert">
              <p>{saveError}</p>

              <button
                type="button"
                className="primary-button"
                onClick={saveAttempt}
                disabled={saving}
              >
                {saving ? "Saving..." : "Retry Saving Result"}
              </button>
            </div>
          )}

          <div className="quiz-review">
            <h2>Answer Review</h2>

            {questions.map((item, index) => {
              const isCorrect =
                selectedAnswers[index] === item.answer;

              return (
                <div
                  className="review-item"
                  key={index}
                >
                  <div className="review-question">
                    {isCorrect ? (
                      <CheckCircle size={20} />
                    ) : (
                      <XCircle size={20} />
                    )}

                    <strong>
                      {index + 1}. {item.question}
                    </strong>
                  </div>

                  <p>
                    Your answer:{" "}
                    {item.options[selectedAnswers[index]]}
                  </p>

                  {!isCorrect && (
                    <p>
                      Correct answer:{" "}
                      {item.options[item.answer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="quiz-actions">
            <button
              type="button"
              className="primary-button"
              onClick={restartQuiz}
            >
              <RotateCcw size={18} />
              Try Again
            </button>

            <Link
              to="/dashboard"
              className="secondary-button"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <Link
          to="/dashboard"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1>AngularJS Quiz</h1>

        <p>
          Test your knowledge of AngularJS concepts.
        </p>
      </div>

      <div className="quiz-card">
        <div className="quiz-progress">
          <div className="progress-info">
            <span>
              Question {currentQuestion + 1} of{" "}
              {questions.length}
            </span>

            <span>
              {answeredCount}/{questions.length} answered
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentQuestion + 1) /
                    questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        <h2 className="question-title">
          {question.question}
        </h2>

        <div className="options-list">
          {question.options.map((option, index) => (
            <button
              type="button"
              key={index}
              className={`quiz-option ${
                selectedAnswers[currentQuestion] === index
                  ? "selected"
                  : ""
              }`}
              onClick={() => selectAnswer(index)}
            >
              <span className="option-letter">
                {String.fromCharCode(65 + index)}
              </span>

              <span>{option}</span>

              {selectedAnswers[currentQuestion] ===
                index && (
                <CheckCircle size={18} />
              )}
            </button>
          ))}
        </div>

        <div className="question-navigation">
          <button
            type="button"
            className="secondary-button"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={18} />
            Previous
          </button>

          {currentQuestion < questions.length - 1 ? (
            <button
              type="button"
              className="primary-button"
              onClick={nextQuestion}
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              className="primary-button"
              onClick={submitQuiz}
              disabled={answeredCount !== questions.length}
            >
              Submit Quiz
            </button>
          )}
        </div>

        {answeredCount !== questions.length && (
          <p className="quiz-hint">
            Please answer all {questions.length} questions
            before submitting.
          </p>
        )}
      </div>
    </div>
  );
}

export default Quiz;