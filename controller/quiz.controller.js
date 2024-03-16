const Quiz = require("../models/Quiz");

function createNewQuiz(req, res) {
  try {
    const newQuiz = new Quiz(req.body);
    newQuiz.save();
    return res.status(200).json({
      success: true,
      message: "Successful!",
      data: newQuiz,
    });
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: err.message,
    });
  }
}

function getAllQuiz(req, res) {
  Quiz.find()
    .then((allQuiz) => {
      return res.status(200).json({
        success: true,
        message: "Successful",
        data: allQuiz,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
}

function getQuizById(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    Quiz.findById(id)
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Successful!",
          data: quiz,
        });
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
}

function deleteQuiz(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    Quiz.findByIdAndDelete(id).then((response) => {
      return res.status(200).json({
        success: true,
        message: response,
      });
    });
  }
}

function updateQuiz(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    Quiz.findOneAndUpdate(
      {
        id: reqId,
      },
      {
        title: req.body.title,
        description: req.body.description,
        timeLimit: req.body.timeLimit,
        deadline: req.body.deadline,
        imgURL: req.body.imgURL,
        active: req.body.active,
      },
      {
        returnOriginal: false,
      }
    )
      .then(() => {
        return res.status(200).json({
          success: true,
          message: "Successful!",
        });
      })
      .catch((err) => {
        res.status(200).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
}

module.exports = {
  createNewQuiz,
  getAllQuiz,
  updateQuiz,
  getQuizById,
  deleteQuiz,
  updateQuiz,
};
