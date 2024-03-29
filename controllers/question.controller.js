const Question = require("../models/Question");

async function createNewQuestion(req, res) {
  const newQuestion = new Question(req.body);
  await newQuestion
    .save()
    .then((question) => {
      return res.status(200).json({
        success: true,
        message: "Tạo câu hỏi thành công",
        data: question,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err.message,
        data: null,
      });
    });
}

async function getAllQuestion(req, res) {
  //Query get all
  await Question.find()
    .then((allQuestion) => {
      return res.status(200).json({
        success: true,
        message: "Successful!",
        data: allQuestion,
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

async function getQuestionById(req, res) {
  const reqId = req.params.id;

  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Question.findById(reqId)
      .then((question) => {
        return res.status(200).json({
          success: true,
          message: "Câu hỏi: ",
          data: question,
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

async function deleteQuestionById(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Question.findByIdAndDelete(reqId)
      .then((question) => {
        return res.status(200).json({
          success: true,
          message: "Xóa câu hỏi thành công",
          data: question,
        });
      })
      .catch((err) => {
        return res.status(200).json({
          success: false,
          message: err.message,
          data: null,
        });
      });
  }
}

async function updateQuestion(req, res) {
  const reqId = req.body._id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Question.findByIdAndUpdate(
      reqId,
      {
        questionText: req.body.questionText,
        questionType: req.body.questionType,
        quizId: req.body.quizId,
      },
      {
        returnDocument: "after",
      }
    )
      .then((question) => {
        return res.status(200).json({
          success: true,
          message: "Chỉnh sửa câu hỏi thành công!",
          data: question,
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
  createNewQuestion,
  getAllQuestion,
  updateQuestion,
  getQuestionById,
  deleteQuestionById,
  updateQuestion,
};
