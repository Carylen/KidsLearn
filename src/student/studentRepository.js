const prisma = require('../../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const scoreServices  = require('../score/scoreServices')
const asgServices = require('../assignment/asgServices')


const getStudentById = async(studentId) => {
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        })
    
        if(!student){
            throw new Error(`Cannot Find Student with ID : ${studentId}`)
        }
        
        return student
        
    } catch (error) {
        return { message: error.message };
    }
}

const getStudentEmail = async(email) => {
    const studentEmail = await prisma.student.findFirst({
        where: {
            email: email
        }
    })

    return studentEmail
}

const editStudentProfile = async(studentId, newName) => {
    try {
        const editedProfile = await prisma.student.update({
            where: {
                id: studentId
            },
            data: {
                name: newName
            }
        })
        if(!editStudentProfile){
            throw new Error(`Student Not Found!`)
        }
        return editStudentProfile
    } catch (error) {
        return { message : error.message }
    }
}

const registerStudent = async(studentName, email, password, role) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 8)
        const checkedEmail = await getStudentEmail(email)
        if(checkedEmail){
            throw new Error('Email already in use')
        }
        const storedStudent = await prisma.student.create({
            data: {
                email: email,
                password: hashedPassword,
                name: studentName,
                role: role
            }
        })

        if(role === 'ADMIN'){
            return { data : storedStudent }
        }
        // GET All Assignment for index paramater when .createScores(createMany)
        const asg = await asgServices.findAsg()

        const storedScores = await scoreServices.registAsg(storedStudent.id, asg)

        return {
            data : storedStudent,
            asg : storedScores
        }
    } catch (error) {
        return {message : error.message}
    }
}

const loginStudent = async(email, password) => {
    const user = await prisma.student.findUnique({
        where: {
            email: email
        },
        include: {
            scores: {
                include: {
                    assignments:true
                }
            }
        }
    })

    if(!user){
        return {message : "Credentials are Incorrect, please input a valid credentials!"}
    }

    // if email === studentEmail, check the matching credential (password)
    const validPassword = await bcrypt.compare(password, user.password);
    // If doesn't match, then send errorMessage
    if (!validPassword) {
        return { error: 'Invalid credentials' }
    }
    
    // if email, password === credentials, build the payload and send it with JWT
    const payload = {
        userId: user.id, 
        userEmail: user.email, 
        userName: user.name,
        userRole: user.role,
        userScores: user.scores
        // userScores: user.scores.map(x => ({
        //     Assignment: x.assignments.title,
        //     Score: x.score
        // }))
    }

    // Return the token(header), payload, and secret_key
    const token = jwt.sign(payload, 'hegi_gila_banget', { expiresIn: '1h' });

    return token;
}

module.exports = {
    getStudentById,
    getStudentEmail,
    editStudentProfile,
    registerStudent,
    loginStudent
}