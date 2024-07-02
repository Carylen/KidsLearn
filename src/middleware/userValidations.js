const { body } = require('express-validator')

const studentLogin = () => {
    return [
        body('email').isEmail().withMessage('Please input a valid E-mail'),
        body('password').isLength({ min: 5, max: 20 })
    ]
}

const studentRegister = () => {
    return[
        body('name')
            .notEmpty().withMessage('Name Must be filled!')
            .isAscii().withMessage('Name Must be right String!'),
        body('email')
            .isEmail().withMessage('Email not valid'),
        body('password')
            .isLength({min: 5}).withMessage('Password at least 5 characters')
    ]
}

module.exports = {
    studentLogin,
    studentRegister
}