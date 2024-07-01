
const repos = require('./studentRepository');

const register = async(studentName, email, password, role) => {
    return await repos.registerStudent(studentName, email, password, role)
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

