const jwt = require('jsonwebtoken');
const env = require('dotenv').config()

const secretKey = process.env.ACCESS_TOKEN;

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token and decode its payload
        const decodedToken = jwt.verify(token, secretKey);

        
        req.user = decodedToken.user; 
        // .user isliye toh jwt.sign deko
        // else use decodedToken only

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}

module.exports = authenticateToken;
