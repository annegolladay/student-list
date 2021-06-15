const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'e93ea7c3060b41b882ac8ed5b10e7988',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()
let students = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()
    students.push(name)
    rollbar.log('student added successfully', {author: 'annie', type: 'manual'})
    res.status(200).send(students)
})

const port = process.env.PORT || 4444

app.use(rollbar.errorHandler())

app.listen(port, () => console.log(`running on port: ${port}`))