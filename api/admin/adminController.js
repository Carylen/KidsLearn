const router = require('express').Router()
const { authUser, authorizeRole } = require('../middleware/auth')
const adminServices = require('./adminServices')

// router.use(authUser, (req, res) => {
    
//     res.json({

//     })
// })

router.get("/listScores", authorizeRole('ADMIN'), async(req, res) => {
    try {
        const scores = await adminServices.findScores()
        if(scores.message){
            res.send("Data Not Found!")
        }

        res.status(200).send(scores)
    } catch (error) {
        res.status(400).send("Client Error")
    }
})

router.put("/updateScores/:id", authorizeRole('ADMIN'), async(req, res) => {
    // const userId= req.user.userId
    // const userName= req.user.userName
    // const userEmail= req.user.userEmail
    // const userScores= req.user.userScores
    try {
        
        const scoreId = parseInt(req.params.id)
        const { newScore } = req.body
        console.log(scoreId)
        const updatedScore = await adminServices.updateScores(scoreId, newScore)
        if(!updatedScore){
            res.status(404).send(`Cannot Find Score with ID : ${scoreId}`)
        }
        res.status(200).json(updatedScore)
    } catch (error) {
        console.error(error.message)
        res.status(404).json({ message: error.message })
    }
})

module.exports = router