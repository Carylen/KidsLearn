// const { empty } = require('@prisma/client/runtime/library')
const prisma = require('../../db/index')

const getById = async(userId) => {
    try {
        console.log(userId)
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
        console.log(`score : ${score}`)
        if(score.length === 0){
            throw new Error("Data Doesn't Exist..")
            // return 
        }
        return score
    } catch (error) {
        return { message : error.message }
    }

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
    getById,
    createScores
}