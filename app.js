const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')

const courseRouter = require('./routes/users')
const usersRouter = require('./routes/courses')
const app = express()

mongoose.connect(
    'mongodb+srv://dbfirst:P$siddu123@nodejs-tutorial-1q7og.mongodb.net/lms?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    () => console.log('DB Connected!')
)

const sess = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {}
  }
  
  app.use(session(sess))

app.set('view engine', 'ejs')

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 

app.use('/', courseRouter)
app.use('/', usersRouter)

module.exports = app