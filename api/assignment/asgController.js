const router = require('express').Router()
const asgServices = require('./asgServices')

router.get("/listAssignment", async(req, res) => {
    try {
        const allAsg = await asgServices.findAsg()

        res.status(200).send(allAsg)
    } catch (error) {
        
    }
})

router.get("/:id", async(req, res) => {
    try {
        const asgId = req.params.id

        const asgById = await asgServices.findAsgById(parseInt(asgId))

        res.status(200).send(asgById)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
})

module.exports = router