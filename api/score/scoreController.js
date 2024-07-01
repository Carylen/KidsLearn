const express = require('express')
const scoreServices = require('./scoreServices')

const router = express.Router()

router.get("/:id", async(req, res) => {
    try {
        const scoreId = parseInt(req.params.id)
        const score = await scoreServices.findScoresById(scoreId)

        res.status(200).send(score)
    } catch (error) {
        console.error(error)
        res.status(404).send(error)
    }
})


module.exports = router