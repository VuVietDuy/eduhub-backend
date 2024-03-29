const express = require('express')
const db = require('./config/mongodb/index')
const bodyParser = require('body-parser')
require('dotenv').config();

// Init application
const app = express();

// Connect db
db.connect();

// Config
app.set("view engine", "ejs");

// Define router
const authRouter = require("./routes/auth");
const quizRouter = require("./routes/quiz");
const questionRouter = require("./routes/question");
const subjectRouter = require("./routes/subject");
const postRouter = require("./routes/post");
const commentRouter = require("./routes/comment");
const userRouter = require("./routes/user");
const viewRouter = require("./routes/view");

// Set up
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set up
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  // res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
  // Request methods you wish to allow
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Authorization, content-type");
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});


app.use("/api/auth", authRouter);
app.use("/api/quizzes", quizRouter);
app.use("/api/questions", questionRouter);
app.use("/api/subjects", subjectRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/users", userRouter);
app.use("/views", viewRouter);


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Eduhub listening on port http://localhost:${port}`);
});
