
const repos = require('./studentRepository');
// const { getAsg } = require('../assignment/asgServices');
// const { getById } = require('../assignment/asgRepository');

const register = async(studentName, email, password) => {
    return await repos.registerStudent(studentName, email, password)
}

const login = async(email, password) => {
    return await repos.loginStudent(email, password)
}

const findStudentById = async(id) => {
    return await repos.getById(id)
}

module.exports = {
    register,
    login,
    findStudentById
}

