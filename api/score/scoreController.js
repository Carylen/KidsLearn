const prisma = require('../../db/index')
const express = require('express')
const scoreServices = require('./scoreServices')

const router = express.Router()

router.get("/listScores", async(req, res) => {
    try {
        const scores = await scoreServices.findScores()
        if(!scores){
            res.send("Data Not Found!")
        }

        res.status(200).send(scores)
    } catch (error) {
        res.status(400).send("Client Error")
    }
})

router.get("/:id", async(req, res) => {
    try {
        const scoreId = req.params.id
        const score = await scoreServices.findScoresById(parseInt(scoreId))

        res.status(200).send(score)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
})


module.exports = router