const prisma = require('../../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const getStudents = async() => {
    try {
        const students = await prisma.student.findMany()
        
        return students
    } catch (error) {
        return json({message : error.message})
    }
}

const getStudent = async(id) => {
    const student = await prisma.student.findFirst({
        where: {
            id: id
        },
    })

    if(!student){
        return {message : "Not Found"}
    }
    
    return student
}

const getStudentEmail = async(email) => {
    const studentEmail = await prisma.student.findFirst({
        where: {
            email: email
        }
    })

    return studentEmail
}

const registerStudent = async(studentName, email, password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 8)
        const storedStudent = await prisma.student.create({
            data: {
                email: email,
                password: hashedPassword,
                name: studentName
            }
        })

        return storedStudent
    } catch (error) {
        return json({message : error.message}) 
    }
}

const loginStudent = async(email, password) => {
    try {
        const user = await prisma.student.findUnique({
            where: {
                email: email
            },
            include: {
                scores:true
            }
        })
        if(!user){
            return {message : "Credentials are Incorrect, please input a valid credentials!"}
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return { error: 'Invalid credentials' }
        }

        // Return the token(header), payload, and secret_key
        const token = jwt.sign({ 
            userId: user.id, 
            userEmail: user.email, 
            userName: user.name,
            userScores: user.scores
            }, 'hegi_gila_banget', { expiresIn: '1h' });

        return token;
    } catch (error) {
        return {message: error.message}
    }
}

module.exports = {
    getStudents,
    getStudent,
    getStudentEmail,
    registerStudent,
    loginStudent
}