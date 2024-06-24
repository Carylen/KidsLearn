// const prisma = require('../../db/index')
// const { body, validationResult } = require('express-validator')
const repos = require('./studentRepository');
// const { json } = require('express');

// const registerValidation = [
//     body('email').isEmail().withMessage('Please use the valid E-Mail!'),
//     body('name').notEmpty().withMessage('Please filled the username, username cannot be empty'),
//     body('password').isLength(5).withMessage('Password at least 5 characters'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     },
// ];

// const searchStudent = [
//     body('id')
// ]

const findAll = async() => {
    const students = await repos.getStudents()

    if(!students){
        return {message : "students are empty"}
    }

    return students
}

const findById = async(id) => {
    const studentsById = await repos.getStudent(id)

    if(studentsById){
        return studentsById
    }

    return {message: `student with Id : ${id} not found!`}
}

const register = async(studentName, email, password) => {
    const registeredStudent = await repos.registerStudent(studentName, email, password)

    return registeredStudent
}

const login = async(email, password) => {
    const user = await repos.loginStudent(email, password)

    return user
}

module.exports = {
    // registerValidation,
    findAll,
    findById,
    register,
    login
}

