const QuizAttempt = require("../models/QuizAttempt");

const saveQuizAttempt = async (req, res) => {
  try {
    const { quizTitle, answers, score, totalQuestions, percentage } = req.body;

    if (
      !Array.isArray(answers) ||
      answers.length === 0 ||
      !Number.isInteger(score) ||
      !Number.isInteger(totalQuestions) ||
      totalQuestions < 1 ||
      score < 0 ||
      score > totalQuestions ||
      answers.length !== totalQuestions ||
      !Number.isFinite(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      return res.status(400).json({
        message: "Invalid quiz result data.",
      });
    }

    const validAnswers = answers.every(
      (answer) =>
        typeof answer.questionId === "string" &&
        typeof answer.questionText === "string" &&
        typeof answer.selectedAnswer === "string" &&
        typeof answer.correctAnswer === "string" &&
        typeof answer.isCorrect === "boolean"
    );

    if (!validAnswers) {
      return res.status(400).json({
        message: "Each answer must include the question, selected answer, and correct answer.",
      });
    }

    // Recalculate the score on the server instead of trusting the browser.
    const actualScore = answers.filter(
      (answer) =>
        answer.selectedAnswer === answer.correctAnswer
    ).length;

    if (score !== actualScore) {
      return res.status(400).json({
        message: "The submitted score does not match the answers.",
      });
    }

    const actualPercentage = Math.round(
      (actualScore / totalQuestions) * 100
    );

    if (percentage !== actualPercentage) {
      return res.status(400).json({
        message: "The submitted percentage is incorrect.",
      });
    }

    const attempt = await QuizAttempt.create({
      student: req.user._id,
      quizTitle:
        typeof quizTitle === "string" && quizTitle.trim()
          ? quizTitle.trim()
          : "AngularJS Quiz",
      answers: answers.map((answer) => ({
        ...answer,
        isCorrect:
          answer.selectedAnswer === answer.correctAnswer,
      })),
      score: actualScore,
      totalQuestions,
      percentage: actualPercentage,
    });

    return res.status(201).json({
      message: "Quiz result saved successfully.",
      attempt,
    });
  } catch (error) {
    console.error("Save quiz attempt error:", error.message);

    return res.status(500).json({
      message: "Unable to save quiz result.",
    });
  }
};

const getMyQuizAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({
      student: req.user._id,
    }).sort({ completedAt: -1 });

    return res.status(200).json({ attempts });
  } catch (error) {
    console.error("Fetch quiz attempts error:", error.message);

    return res.status(500).json({
      message: "Unable to load quiz history.",
    });
  }
};

module.exports = { saveQuizAttempt, getMyQuizAttempts };