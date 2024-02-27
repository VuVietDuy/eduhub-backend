const express = require('express')
const app = express()
const port = 3000

const authRouter = require('./routes/auth')
const examRouter = require('./routes/exam')


app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/exams', examRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})