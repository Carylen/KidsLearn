const prisma = require('../../db/index')
const express = require('express')
const { getScores, getScore } = require('./scoreRepository')
// const studentServices = require('../')

const router = express.Router()

router.get("/", async(req, res) => {
    try {
        const scores = await getScores()
        if(!scores){
            res.send("Data Not Found!")
        }

        res.send(scores)
    } catch (error) {
        res.status(400).send("Client Error")
    }
})

router.get("/:id", async(req, res) => {
    try {
        const asgId = req.params.id
        const score = await getScore(parseInt(asgId))

        res.send(score)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
})


module.exports = router