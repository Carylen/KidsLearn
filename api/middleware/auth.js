const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

const authUser = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Access denied' });

    if(req.path.is)
    try {
        const verified = jwt.verify(token, 'hegi_gila_banget');
        req.user = verified;
        console.log(verified)
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

const authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    }
}

module.exports = {
    authUser,
    authorizeRole,
    validation,
}