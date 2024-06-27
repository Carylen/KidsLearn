const prisma = require('../../db/index')

const getAll = async() => {
    const scores = await prisma.scores.findMany()

    return scores
}

const getById = async(userId) => {
    const score = await prisma.scores.findMany({
        where: {
            id: userId
        },
        include: {
            assignments:{
                select: {
                    title: true
                }
            },
            // students:true
        },
    })

    return score
}

// Register for every assignment when User Register
const createScores = async(userId, asg) => {
    const insertScores = await prisma.scores.createMany({
        data: asg.map(x => ({
            studentId: userId,
            asgId: x.id,
            score: 0
        }))
    })

    return insertScores
}

// const updateScore = async(userId, asgId)

module.exports = {
    getAll,
    getById,
    createScores
}