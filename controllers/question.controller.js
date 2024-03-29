const Question = require("../models/Question");
const Option = require("../models/Option");

async function createNewQuestion(req, res) {
  const highestOrder = await Question.findOne(
    { quizId: req.body.quizId },
    { orderNum: 1 },
    { sort: { orderNum: -1 } }
  );
  let nextOrderNumber = 1;

  if (highestOrder) {
    nextOrderNumber = highestOrder.orderNum + 1;
  }
  const newQuestion = new Question({
    orderNum: nextOrderNumber,
    quizId: req.body.quizId,
    questionText: req.body.questionText,
    questionType: req.body.questionType,
    questionId: req.body.quizId,
    level: req.body.level,
  });
  const options = new Option(req.body.options);
  await newQuestion.save()
    .then((question) => {
      options.
      options.map(option => {
        Option.save(option)
      })
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
        res.status(500).json({
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
        return res.status(500).json({
          success: false,
          message: err.message,
          data: null,
        });
      });
  }
}

async function updateQuestionById(req, res) {
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
        level: req.body.level,
        quizId: req.body.quizId,
        answer: req.body.answer,
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
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
}

module.exports = {
  createNewQuestion,
  updateQuestionById,
  getQuestionById,
  deleteQuestionById,
};