const express = require('express')
const userController = require('../controllers/userController')
//const loginValidator = require("../controllers/loginValidator")
const router = express.Router()

//UI routes
router.get('/', userController.loginForm)
router.get('/dashboard', (req, res) => res.send("Dashboard works"))
router.get('/editProfile', (req, res) => res.send("Edit profile works"))

//Process
router.post('/login', userController.loginProcess)
router.post('/register', userController.registerProcess)
router.get('/changePassword', (req, res) => res.send("change password works"))
router.get('/editProfile', (req, res) => res.send("Edit profile works"))


module.exports = router