const express = require('express')
const db = require('./config/mongodb/index')
const bodyParser = require('body-parser')
require('dotenv').config();
var cors = require('cors')
const cookieParser = require('cookie-parser');

// Init application
const app = express();
app.use(cookieParser()) //cookie-parser dùng để đọc cookies của request:
app.use(cors({
  origin: 'http://localhost:3000', //Chan tat ca cac domain khac ngoai domain nay
  credentials: true //Để bật cookie HTTP qua CORS
}))

// Connect db
db.connect();

// Config view engine
app.set("view engine", "ejs");

// Define router
const authRouter = require("./apps/auth/auth.routes");
const quizRouter = require("./apps/quizzes/quiz.routes");
const questionRouter = require("./apps/questions/question.routes");
const subjectRouter = require("./apps/subjects/subject.routes");
const postRouter = require("./apps/posts/post.routes");
const commentRouter = require("./apps/comments/comment.routes");
const userRouter = require("./apps/users/user.routes");
const classRouter = require("./apps/classes/class.routes")
const teacherRouter = require("./apps/teachers/teacher.routes")
const studentRouter = require("./apps/students/student.routes")
const classSubjectRouter = require("./apps/class_subject/class_subject.routes")
const viewRouter = require("./apps/view/view");

// Set up
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
//   // res.setHeader('Access-Control-Allow-Origin', "https://eduhub-ptit.vercel.app/");
//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   // Request headers you wish to allow
//   res.setHeader("Access-Control-Allow-Headers", "Authorization, content-type");
//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   // Pass to next layer of middleware
//   next();
// });


app.use("/api/auth", authRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/questions", questionRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);
app.use("/api/classes", classRouter);
app.use("/api/teachers", teacherRouter);
app.use("/api/students", studentRouter);
app.use("/api/class-subject", classSubjectRouter);
app.use("/views", viewRouter);


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Eduhub listening on port http://localhost:${port}`);
});
