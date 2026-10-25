
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
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
        question: "Which directive is used to repeat HTML elements?",
        options: ["ng-if", "ng-repeat", "ng-hide", "ng-click"],
        answer: 1,
    },
    {
        question: "Which directive creates two-way data binding?",
        options: ["ng-repeat", "ng-init", "ng-model", "ng-show"],
        answer: 2,
    },
    {
        question: "Which symbol is used for AngularJS expressions?",
        options: ["[[ ]]", "{{ }}", "(())", "<% %>"],
        answer: 1,
    },
    {
        question: "Which directive is used to handle a click event?",
        options: ["ng-click", "ng-value", "ng-repeat", "ng-filter"],
        answer: 0,
    },
    {
        question: "Which AngularJS component contains application logic?",
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
        question: "Which directive can display content conditionally?",
        options: ["ng-repeat", "ng-model", "ng-if", "ng-app"],
        answer: 2,
    },
];

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const question = questions[currentQuestion];

    const score = questions.reduce((total, item, index) => {
        return total + (selectedAnswers[index] === item.answer ? 1 : 0);
    }, 0);

    function selectAnswer(optionIndex) {
        if (submitted) return;

        setSelectedAnswers({
            ...selectedAnswers,
            [currentQuestion]: optionIndex,
        });
    }

    function restartQuiz() {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <div className="quiz-page">
                <div className="quiz-result">
                    <div className="result-icon">🏆</div>

                    <p className="quiz-label">QUIZ COMPLETED</p>
                    <h1>Your Result</h1>

                    <div className="score-circle">
                        <strong>{score}/{questions.length}</strong>
                        <span>Marks</span>
                    </div>

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
                            <RotateCcw size={17} /> Try Again
                        </button>

                        <Link to="/topics" className="secondary-button">
                            Back to Topics
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                <Link to="/topics" className="back-link">
                    <ArrowLeft size={17} /> Back to Topics
                </Link>

                <div className="quiz-heading">
                    <p className="quiz-label">TEST YOUR KNOWLEDGE</p>
                    <h1>AngularJS Quiz</h1>
                    <p>Answer the questions and check your score.</p>
                </div>

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
                                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                <div className="question-card">
                    <h2>{question.question}</h2>

                    <div className="answer-options">
                        {question.options.map((option, index) => (
                            <button
                                key={option}
                                className={`answer-option ${selectedAnswers[currentQuestion] === index
                                        ? "selected"
                                        : ""
                                    }`}
                                onClick={() => selectAnswer(index)}
                            >
                                <span className="option-letter">
                                    {String.fromCharCode(65 + index)}
                                </span>

                                <span>{option}</span>
                            </button>
                        ))}
                    </div>

                    <div className="quiz-navigation">
                        <button
                            className="secondary-button"
                            disabled={currentQuestion === 0}
                            onClick={() =>
                                setCurrentQuestion(currentQuestion - 1)
                            }
                        >
                            <ArrowLeft size={17} /> Previous
                        </button>

                        {currentQuestion < questions.length - 1 ? (
                            <button
                                className="primary-button"
                                onClick={() =>
                                    setCurrentQuestion(currentQuestion + 1)
                                }
                            >
                                Next <ArrowRight size={17} />
                            </button>
                        ) : (
                            <button
                                className="primary-button"
                                onClick={() => setSubmitted(true)}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </div>
                </div>

                <p className="quiz-note">
                    Selected answers: {Object.keys(selectedAnswers).length} /{" "}
                    {questions.length}
                </p>
            </div>
        </div>
    );
}

export default Quiz;
