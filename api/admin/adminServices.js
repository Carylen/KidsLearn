const adminRepos = require('./adminRepository')

const findScores = async() => {
    return await adminRepos.getAll()
}

const updateScores = async(id, score) => {
    return await adminRepos.editScores(id, score)
}

module.exports = {
    findScores,
    updateScores
}