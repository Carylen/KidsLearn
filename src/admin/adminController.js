const router = require('express').Router()
const scoreRepos = require('../score/scoreRepository')
const asgRepos = require('../assignment/asgRepository')


router.get("/listScores", async(req, res) => {
    try {
        const scores = await scoreRepos.getAllScores()
        if(scores.message){
            res.send("Data Not Found!")
        }

        res.status(200).send(scores)
    } catch (error) {
        console.error(error)
        res.status(400).send("Client Error")
    }
})

router.put("/updateScores/:id", async(req, res) => {
    try {
        // Get ID 
        const scoreId = parseInt(req.params.id)
        // Get req body with filled newScore
        const { newScore } = req.body
        // console.log(scoreId)
        const updatedScore = await scoreRepos.editScore(scoreId, newScore)
        if(updatedScore.message){
            // res.status(404).send(`Cannot Find Score with ID : ${scoreId}`)
            // throw new Error(`Canot find Score with ID : ${scoreId}`)
            res.status(404).json({ message: updatedScore.message })
        }
        res.status(200).json(updatedScore)
    } catch (error) {
        console.error(error.message)
        res.status(404).json({ message: error.message })
    }
})

router.post("/uploadAssignment", async(req, res) => {
    try {
        // Get req body
        const { title } = req.body
    
        const newAsg = await asgRepos.createAsg(title)
        
        res.status(200).json({ data : newAsg })
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
})

router.post("/deleteScore/:id", async(req, res) => {
    try {
        const { scoreId } = req.body
        const deleteScore = await scoreRepos.destroyScore(scoreId)

        res.status(200).json({ message: deleteScore.message })
    } catch (error) {
       res.status(400).json({ message: error.message }) 
    }
})

module.exports = router