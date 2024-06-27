// const prisma = require('../../db/index')
const express = require('express')
const scoreServices = require('./scoreServices')

const router = express.Router()

router.get("/listScores", async(req, res) => {
    try {
        const scores = await scoreServices.findScores()
        if(scores.message){
            res.send("Data Not Found!")
        }

        res.status(200).send(scores)
    } catch (error) {
        res.status(400).send("Client Error")
    }
})

router.get("/:id", async(req, res) => {
    try {
        const scoreId = parseInt(req.params.id)
        const score = await scoreServices.findScoresById(scoreId)
        // if(typeof scoreId === 'number'){
        //     return res.status(404).json({message : '404 Not Found'})
        // }

        res.status(200).send(score)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
})


module.exports = router