const prisma = require('../../db/index')

const getAll = async() => {
    const scores = await prisma.scores.findMany()

    return scores
}

const editScores = async(id, newScore) => {
    try {
        const updatedScores = await prisma.scores.update({
            where: {
                id: id
            },
            data: {
                score: newScore
            }
        })
        if(!updatedScores){
            throw new Error('Data Not Found')
        }
        return updatedScores
        
    } catch (error) {
        return { message: error.message };
    }
}

module.exports = {
    getAll,
    editScores
}