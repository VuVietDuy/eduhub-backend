const Quiz = require("../models/Quiz");

function createNewQuiz(req, res) {
  const newQuiz = new Quiz(req.body);
  newQuiz.save()
    .then(quiz => {
      return res.status(200).json({
        success: true,
        message: "Tạo bài thi thành công",
        data: quiz,
      });
    })
    .catch(err => {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      })
    })
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
    Quiz.update(
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
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
