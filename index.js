const express = require('express')
require('dotenv').config();
const db = require('./config/mongodb/index')
const bodyParser = require('body-parser')
var multer = require('multer');

const app = express();

// Config
app.set('view engine', 'ejs');

const port = process.env.PORT || 8000
db.connect()

app.use(express.json());

const authRouter = require('./routes/auth')
const quizRouter = require('./routes/quiz')
const subjectRouter = require('./routes/subject')
const userRouter = require('./routes/user')
const viewRouter = require('./routes/view')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', "http://localhost:3000");
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/subject', subjectRouter)
app.use('/api/user', userRouter)
app.use('/view', viewRouter)

app.use(express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`Eduhub listening on port http://localhost:${port}`)
})