const prisma = require('../../db/index')

const getAsg = async() => {
    try {
        const allAsg = await prisma.assignment.findMany()
    
        return allAsg
    } catch (error) {
        return {message : error.message}
    }
}

module.exports = {
    getAsg
}