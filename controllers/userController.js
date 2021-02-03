const bcrypt = require('bcryptjs')
const User = require('../models/User')

exports.loginForm = (req, res) => {
    const data = {
        title: 'LMS | Login',
        err: ''
    }
    res.render('login', data)
}

exports.loginProcess = (req, res) => {
    const { email, password } = req.body
    
    User.findOne({ email })
        .then(user => { //user = new User()
            if(user) {
                const valid = bcrypt.compareSync(password, user.password)
                
                if(valid) {
                    res.redirect('listCourses')
                } else {
                    console.log('Not Valid Password')
                    res.redirect('/login')
                }
            } else {
                console.log('No User')
                res.redirect('/login')
            }
        })
        .catch(err => {
            console.log('Something went wrong')
            res.redirect('/login')
        })
}

exports.registerProcess = (req, res) => {
    const { name, email, password } = req.body
    
    const newUser = new User()
    
    newUser.name = name
    newUser.email = email
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    
    newUser.password = hash

    User.findOne({ email })
        .then(user => {
            if(!user) {
                newUser.save()
                    .then(() => {
                        const data = {
                            title: 'LMS | Login',
                            err: 'Successfully Registered! please login'
                        }
                        res.render('login', data)
                    })
                    .catch(err => res.send("Error occured"))
            }else {
                const data = {
                    title: 'LMS | Login',
                    err: 'This emial id is already exists! please login'
                }
                res.render('login', data)
            }
        })
        .catch((err)=> {
            console.log("Register error occured!")
            res.redirect('/login')
        })
}