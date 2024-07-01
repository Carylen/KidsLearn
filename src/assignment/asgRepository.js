const prisma = require('../../db/index')

const getAll = async() => {
    try {
        const allAsg = await prisma.assignment.findMany()
    
        return allAsg
    } catch (error) {
        return {message : error.message}
    }
}

const getById = async(id) => {
    const asgById = await prisma.assignment.findUnique({
        where: {
            id: id
        }
    })

    if(!asgById){
        throw new Error(`Assignment doesn't exists!`)
    }

    return asgById
}

module.exports = {
    getAll,
    getById
}