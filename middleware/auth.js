const jwt = require('jsonwebtoken');
const config = require('config');
var auth = (req, res, next) => {
    var token = req.header('Authorization');
    if (!token)
        res.status(401).send('Access Denied. No Token Provider.');
    try {
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
   
}

module.exports = auth;