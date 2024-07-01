const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')


const authUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'hegi_gila_banget');
        req.user = verified

        // logging in the server
        console.log(verified)
        console.log('\n ------------------------------')
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
}

const validation = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        // res.status(400).json({ errors : errors.array().map(err => `${err.msg} for [${err.path}]`) })
        res.status(400).json({ errors : errors.array() })
    }
    console.log(req.path, '\n',req.body)

    next()
}

const authorizeRole = (roles) => {
    return (req, res, next) => {
        // console.log(`ADMIN : ${JSON.stringify(req.user)} with role ${req.user.role}`)
        console.log('ADMIN :\n')
        console.log(req.user)
        if (!req.user || !roles === req.user.role) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    }   
}

const logging = (req, res, next) => {
    if(req){
        // const body = JSON.stringify(req)
        console.log(`\n[ REQUEST PATH  : ${ req.path }]\n`)
    }
    else{
        res.json({ message: '404 - Page Not Found' })
    }
    next()
}

module.exports = {
    authUser,
    authorizeRole,
    validation,
    logging
}