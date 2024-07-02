const express = require('express')
const scoreServices = require('./scoreServices')
const { scores } = require('../../db')

const router = express.Router()

router.get("/:id", async(req, res) => {
    const scoreId = parseInt(req.params.id)

    const score = await scoreServices.findScoresById(scoreId)
    // Validate if there exists error or no
    if(score.message){
        console.error(score.message)
        return res.status(404).json({ message : score.message })
    }
    // IF there's no error
    return res.status(200).json( score )
})


module.exports = router