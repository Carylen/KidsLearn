
const repos = require('./studentRepository');

const register = async(studentName, email, password, role) => {
    return await repos.registerStudent(studentName, email, password, role)
}

const login = async(email, password) => {
    return await repos.loginStudent(email, password)
}

const findStudentById = async(id) => {
    return await repos.getStudentById(id)
}

const updateStudentProfile = async(id, name) => {
    return await repos.editStudentProfile(id, name)
}
module.exports = {
    register,
    login,
    findStudentById,
    updateStudentProfile
}

