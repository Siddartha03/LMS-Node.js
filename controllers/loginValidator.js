const validator = require("email-validator")
exports.createLoginValidator = (req, res, next) => {
    const {email, password} = req.body
    let loginErrors = {}

    ;
    if(!validator.validate(email)) loginErrors.email = "Please provide correct Email ID"
    if(password === '') loginErrors.password = "Password cannot be blank"
    
    if(Object.keys(loginErrors).length === 0) {
        next()
    } else {
        req.session.loginErrors = loginErrors
        res.redirect('/login')
    }
}