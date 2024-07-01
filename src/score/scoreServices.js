const scoreRepos = require('./scoreRepository')

const findScoresById = async(id) => {
    return await scoreRepos.getById(id)
}

const registAsg = async(userId, asg) => {
    return await scoreRepos.createScores(userId, asg)
}

module.exports = {
    findScoresById,
    registAsg
}