const Quiz = require("./quiz.model");
const Subject = require("../subjects/subject.model");
const Question = require("../questions/question.model");

async function createNewQuiz(req, res) {
  const newQuiz = new Quiz(req.body);
  newQuiz.createdBy = req.userId;
  await newQuiz
    .save()
    .then((quiz) => {
      return res.status(200).json({
        success: true,
        message: "Tạo bài thi thành công",
        data: quiz,
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

async function getAllQuiz(req, res) {
  //Laấy quizz theo giáo viên
  const reqOffset = req.query.offset;
  const reqLimit = req.query.limit;
  let filterConditions = {
    createdBy: req.userId,
  };
  if (req.query.grade) {
    filterConditions.grade = req.params.grade;
  }
  await Quiz.find(filterConditions)
    .skip(reqOffset)
    .limit(reqLimit)
    .sort({ createdAt: "desc", updatedAt: "desc" })
    .then((allQuiz) => {
      return res.status(200).json({
        success: true,
        message: "Successful!",
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

async function getAllQuestionFromQuiz(req, res) {
  let quizId = req.params.quizId;
  if (req.roleName === Role.STUDENT) {
    const populateOptions = {
      path: "quizParts.questions",
      select: "-options.isCorrect", // Exclude trường isCorrect
    };
    await Quiz.findById(quizId)
      .populate(populateOptions)
      .then((quizz) => {
        return res.status(200).json({
          success: true,
          message: "Get quizz successfully!",
          data: quizz,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error. Please try again.",
          error: err.message,
        });
      });
  } else if (req.roleName === Role.TEACHER) {
    const populateOptions = {
      path: "quizParts.questions",
    };
    await Quiz.findById(quizId)
      .populate(populateOptions)
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Get quiz successfully! ",
          data: quiz,
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

async function getQuizById(req, res) {
  const quizId = req.params.id;
  await Quiz.findById(quizId)
    .then((quiz) => {
      return res.status(200).json({
        success: true,
        message: "Lấy bài thi thành công",
        data: quiz,
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

async function deleteQuizById(req, res) {
  const quizzId = req.params.id;
  if (!quizzId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Quiz.findByIdAndDelete(quizzId)
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Xóa câu hỏi thành công",
          data: quiz,
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
const getQuizByGrade = async (req, res) => {
  const reqOffset = req.query.offset;
  const reqLimit = req.query.limit;
  let filterConditions = {
    createdBy: req.userId,
  };
  if (req.params.grade) {
    filterConditions.grade = req.params.grade;
  }
  await Quiz.find(filterConditions)
    .skip(reqOffset)
    .limit(reqLimit)
    .sort({ createdAt: "desc", updatedAt: "desc" })
    .then((allQuiz) => {
      return res.status(200).json({
        success: true,
        message: "Successful!",
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

  // const grade = req.params.grade;
  // await Quiz.find({ grade: grade })
  //   .then((quiz) => {
  //     return res.status(200).json({
  //       success: true,
  //       message: "Lấy bài thi thành công",
  //       data: quiz,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       success: false,
  //       message: "Server error. Please try again.",
  //       error: err.message,
  //     });
  //   });
};

async function updateQuiz(req, res) {
  const quizzId = req.body._id;
  if (!quizzId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Quiz.findByIdAndUpdate(
      quizzId,
      {
        title: req.body.title,
        description: req.body.description,
        imgURL: req.body.imgURL,
        grade: req.body.grade,
        assignedStatus: req.body.assignedStatus,
        topic: req.body.topic,
        shuffleAnswer: req.body.shuffleAnswer,
        shuffleQuestion: req.body.shuffleQuestion,
        timeLimit: req.body.timeLimit,
        quizParts: req.body.quizParts,
        subjectId: req.body.subjectId,
      },
      {
        returnDocument: "after",
      }
    )
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Chỉnh sửa bài viết thành công!",
          data: quiz,
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

const Option = require("../options/option.model");
const { Role } = require("../../enum/Role");
function submitQuiz(req, res) {
  const quizId = req.params.quizId;
  const submission = req.body.submission;
  var score = 0;
  submission.map((item) => {
    item.answers.map((answer) => {});
  });
}

module.exports = {
  createNewQuiz,
  getAllQuiz,
  updateQuiz,
  getQuizById,
  deleteQuizById,
  updateQuiz,
  getAllQuestionFromQuiz,
  submitQuiz,
  getQuizByGrade,
};
