const scoreRepos = require('./scoreRepository')

const findScoresById = async(id) => {
    return await scoreRepos.getScoresById(id)
}

const registAsg = async(userId, asg) => {
    return await scoreRepos.createScores(userId, asg)
}

module.exports = {
    findScoresById,
    registAsg
}