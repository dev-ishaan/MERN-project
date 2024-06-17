const jwt = require('jsonwebtoken');

const JWTSecretKey = 'secretOrPrivateKey';

const fetchuser = (req, res, next) => {
    // Get user from JWT token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWTSecretKey)
        req.user = data.user
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}

module.exports = fetchuser;