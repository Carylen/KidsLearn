const prisma = require('../../db/index')

const getAllScores = async() => {
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
    getAllScores,
    editScores
}