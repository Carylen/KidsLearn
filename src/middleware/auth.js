const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'hegi_gila_banget');
        req.user = verified;
        console.log(verified)
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
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
    authToken,
    authorizeRole
}