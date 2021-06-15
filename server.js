const express = require('express')
const path = require('path')
const Rollbar = require('rollbar')
let rollbar = new Rollbar({
    accessToken: 'e93ea7c3060b41b882ac8ed5b10e7988',
    captureUncaught: true,
    captureUnhandledRejections: true
})


const app = express()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})


const port = process.env.PORT || 4444

app.listen(port, () => console.log(`running on port: ${port}`))