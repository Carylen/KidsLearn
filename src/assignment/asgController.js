const router = require('express').Router()
const asgServices = require('./asgServices')
const { authUser } = require('../middleware/auth')

router.use(authUser, (req, res, next) => {
    // console.log("[ Router ASG - Middleware ]")
    if(!authUser){
        res.status(403).json({ message : 'Not Authorized' })
    }else {
        next()
    }
})

router.get("/listAsg", async(req, res) => {
    // try {
    //     const allAsg = await asgServices.findAsg()

    //     res.status(200).send(allAsg)
    // } catch (error) {
        
    // }
    const listAssignment = await asgServices.findAsg()

    if(listAssignment.message){
        console.error(listAssignment.message)
        return res.status(404).json({ message : listAssignment.message })
    }
    return res.status(200).json( listAssignment )
})

router.get("/:id", async(req, res) => {
    // try {
    //     const asgId = req.params.id

    //     const asgById = await asgServices.findAsgById(parseInt(asgId))

    //     res.status(200).send(asgById)
    // } catch (error) {
    //     res.status(404).json({ msg: error.message })
    // }

    const asgId = parseInt(req.params.id)

    const asgById = await asgServices.findAsgById(asgId)

    if(asgById.message){
        console.error(asgById.message)
        return res.status(404).json({ message : asgById.message })
    }
    return res.status(200).json( asgById )
})

module.exports = router