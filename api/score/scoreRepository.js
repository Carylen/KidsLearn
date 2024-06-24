const prisma = require('../../db/index')

const getScores = async() => {
    const scores = await prisma.scores.findMany()

    return scores
}

const getScore = async(asgId) => {
    const score = await prisma.scores.findFirst({
        where: {
            id: asgId
        },
        include: {
            assignments:true,
            students:true
        }
    })

    return score
}

module.exports = {
    getScores,
    getScore
}