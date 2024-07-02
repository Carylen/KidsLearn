const prisma = require('../../db/index')

const getAllScores = async() => {
    const scores = await prisma.scores.findMany()
    
    return scores
}

const getScoresById = async(userId) => {
    try {
        const score = await prisma.scores.findMany({
            where: {
                studentId: userId
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

        console.log(`score : `, score)

        if(score.length === 0){
            throw new Error("Data Doesn't Exist..")
        }
        
        return score

    } catch (error) {
        return { message : error.message }
    }

}

// Register for every assignment when User Register
const createScores = async(userId, asg) => {
    try {
        const insertScores = await prisma.scores.createMany({
            data: asg.map(x => ({ // this will execute n times based on asg
                studentId: userId,
                asgId: x.id,
                score: 0, // initial state like the below
                experiment: 0 //initial state = 0, if no there must be 1
            }))
        })
    
        return insertScores    
    } catch (error) {
        return { message : error.message }
    }
}

const editScore = async(id, newScore) => {
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

const destroyScore = async(scoreId) => {
    try {
        const deletedScore = await prisma.scores.delete({
            where: {
                id: scoreId
            }
        })

        return deletedScore
    } catch (error) {
        return { message: error.message };
    }
}


module.exports = {
    getAllScores,
    getScoresById,
    createScores,
    editScore,
    destroyScore
}