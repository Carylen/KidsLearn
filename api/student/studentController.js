const express = require('express')
const studentsServices = require('./studentService')
const { getStudent, getStudentEmail } = require('./studentRepository')
const { body, validationResult } = require('express-validator')
const { authToken, authorizeRole } = require('../middleware/auth')


const router = express.Router()

router.get("/", authToken, async(req, res) => {
    // const allStudents = await studentsServices.findAll();
    // res.send(`userId : ${req.user.userId}`)
    res.json({
            userId: req.user.userId,
            userName: req.user.userName,
            userEmail: req.user.userEmail,
            userScores: req.user.userScores
        })
});

router.get("/:id", async(req, res) => {
    const studentId = req.params.id;
    if (!studentId) {
        return res.status(400).send('Student ID is required');
    }
    
    const studentById = await getStudent(parseInt(studentId))
   
    res.send(studentById)
    // const student = await studentsServices.findById(parseInt(studentId))
});

router.get("/blabli", body('email').isEmail(), async(req, res, next) => {
    const { email } = req.body
    const error = validationResult(req)
    const studentByEmail = await getStudentEmail(email)
    if(!error.isEmpty()){
        return res.json(error)
    }
    res.send(studentByEmail)
})

router.post("/register", async(req, res) => {
    try {
        const { name, email, password } = req.body
        
        const regist = await studentsServices.register(name, email, password)

        res.json(regist).status(201)
    } catch (error) {
        res.json({message: error.message})
    }
})

router.post("/login", async(req, res) => {
    try {
        const { email, password } = req.body

        const login = await studentsServices.login(email, password)

        res.send(login)
        res.redirect("/")
    } catch (error) {
        return {message: error.message}
    }
})

module.exports = router;