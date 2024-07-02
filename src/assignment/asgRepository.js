const prisma = require('../../db/index')

const getAll = async() => {
    try {
        const allAsg = await prisma.assignment.findMany()

        if(!allAsg){
            throw new Error(`Assignment Doesn't Exist..`)
        }

        return allAsg
    } catch (error) {
        return {message : error.message}
    }
}

const getById = async(id) => {
    try {
        const asgById = await prisma.assignment.findUnique({
            where: {
                id: id
            }
        })
    
        if(!asgById){
            throw new Error(`Assignment doesn't exists!`)
        }
        
        return asgById
    } catch (error) {
        return { message : error.message }
    }
}

const createAsg = async(title) => {
    const newAsg = await prisma.assignment.create({
        data: {
            title: title
        }
    })

    return newAsg
}
module.exports = {
    getAll,
    getById,
    createAsg
}