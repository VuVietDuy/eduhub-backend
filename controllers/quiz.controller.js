const Quiz = require("../models/Quiz");
const Subject = require("../models/Subject");
const Question = require("../models/Question");

async function createNewQuiz(req, res) {
  const newQuiz = new Quiz(req.body);
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
  const reqOffset = req.query.offset;
  const reqLimit = req.query.limit;
  const reqSortBy = req.query.sort_by;
  const filterByLevel = req.query.level;
  const filterBySubject = req.query.subject;

  let sortConditions = {};
  let filterConditions = {};
  if (reqSortBy) {
    if (reqSortBy === "+level") {
      sortConditions.level = 1;
    }
    if (reqSortBy === "-level") {
      sortConditions.level = -1;
    }
    if (reqSortBy === "newest") {
      sortConditions.createdAt = -1;
    }
  }

  if (filterByLevel) {
    filterConditions.level = filterByLevel;
  }

  if (filterBySubject) {
    //req.query.subject là id
    // filterConditions.subjectId = filterBySubject;
    // console.log("subject id req:", filterBySubject);

    //req.query.subject là name
    let subjectIdByQuery = "";
    await Subject.findOne({
      name: filterBySubject,
    }).then((subject) => {
      subjectIdByQuery = subject._id;
    });

    await Quiz.findOne({ subjectId: subjectIdByQuery }).then((quiz) => {
      filterConditions.subjectId = quiz.subjectId;
    });
  }

  //Query get all
  await Quiz.find(filterConditions)
    .skip(reqOffset)
    .limit(reqLimit)
    .sort(sortConditions)
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

async function getAllQuestionFromQuiz(req, res) {
  let sortBy = req.query.sort_by;
  let reqQuizId = req.params.id;
  let sortCondition = {};
  if (sortBy) {
    if (sortBy === "+level") {
      //Level tăng dần
      sortCondition.level = 1;
    }
    if (sortBy === "-level") {
      //Level giảm dần
      sortCondition.level = -1;
    }
    if (sortBy === "+stt") {
      //Số thứ tự tăng dần
      sortCondition.orderNum = 1;
    }
  }
  await Question.find({
    quizId: reqQuizId,
  })
    .sort(sortCondition)
    .then((allQuestion) => {
      return res.status(200).json({
        success: true,
        message: "Danh sách câu hỏi: ",
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

async function getQuizById(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Quiz.findById(reqId)
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Đề thi: ",
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

async function deleteQuizById(req, res) {
  const reqId = req.params.id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Quiz.findByIdAndDelete(reqId)
      .then((quiz) => {
        return res.status(200).json({
          success: true,
          message: "Xóa câu hỏi thành công",
          data: quiz,
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

async function updateQuiz(req, res) {
  const reqId = req.body._id;
  if (!reqId) {
    return res.status(200).json({
      success: false,
      message: "Missing required parameter!",
    });
  } else {
    await Quiz.findByIdAndUpdate(
      reqId,
      {
        title: req.body.title,
        description: req.body.description,
        timeLimit: req.body.timeLimit,
        deadline: req.body.deadline,
        imgURL: req.body.imgURL,
        level: req.body.level,
        active: req.body.active,
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

module.exports = {
  createNewQuiz,
  getAllQuiz,
  updateQuiz,
  getQuizById,
  deleteQuizById,
  updateQuiz,
  getAllQuestionFromQuiz,
};