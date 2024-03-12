const express = require('express')
const app = express()
const port = 3000
const db = require('./config/mongodb/index')

db.connect()

app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const authRouter = require('./routes/auth')
const quizRouter = require('./routes/quiz')
const subjectRouter = require('./routes/subject')


app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/quiz', quizRouter)
app.use('/api/subject', subjectRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})