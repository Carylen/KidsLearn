const prisma = require('../../db/index')

const getAll = async() => {
    const scores = await prisma.scores.findMany()

    return scores
}

const editScores = async(id, newScore) => {
    const updatedScores = await prisma.scores.update({
        where: {
            id: id
        },
        data: {
            score: newScore
        }
    })

    return updatedScores
}

module.exports = {
    getAll,
    editScores
}