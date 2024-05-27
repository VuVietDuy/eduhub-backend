const QuizPart = require("./quizPart.model");

async function createNewQuizPart(req, res) {
  const newQuizPart = new QuizPart({
    quizId: req.body.quizId,
    title: req.body.title,
    desc: req.body.desc,
  });
  await newQuizPart
    .save()
    .then((quizPart) => {
      return res.status(200).json({
        success: true,
        message: "Tạo phần thi thành công",
        data: quizPart,
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

const getAllQuizPartOfQuiz = async (req, res) => {
  // const reqId = req.params.quizPartId;
  await QuizPart.find()
    .populate("quizId")
    .then((QuizPart) => {
      return res.status(200).json({
        success: true,
        message: "Câu hỏi: ",
        data: QuizPart,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};
async function getQuizPartById(req, res) {
  const reqId = req.params.id;

  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await QuizPart.findById(reqId)
      .then((quizPart) => {
        return res.status(200).json({
          success: true,
          message: "Get quizPart successfully",
          data: quizPart,
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

async function deleteQuizPartById(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await QuizPart.findByIdAndDelete(reqId)
      .then((quizPart) => {
        return res.status(200).json({
          success: true,
          message: "Xóa câu hỏi thành công",
          data: quizPart,
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

async function updateQuizPartById(req, res) {
  const reqId = req.body._id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await QuizPart.findByIdAndUpdate(
      reqId,
      {
        title: req.body.title,
        desc: req.body.desc,
      },
      {
        returnDocument: "after",
      }
    )
      .then((quizPart) => {
        return res.status(200).json({
          success: true,
          message: "Chỉnh sửa phần thi thành công!",
          data: quizPart,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  }
}

module.exports = {
  createNewQuizPart,
  updateQuizPartById,
  getQuizPartById,
  deleteQuizPartById,
  getAllQuizPartOfQuiz,
};
