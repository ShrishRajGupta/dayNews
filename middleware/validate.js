const jwt = require('jsonwebtoken');
const env = require('dotenv').config()

const secretKey = process.env.ACCESS_TOKEN;

const authenticateToken = (req, res, next) => {
    const token = req.cookies.authorization;

    if (!token) {
        console.log(`Token not found`);
        res.redirect('/user/register')
            .status(401);
    }

    try {
        // Verify the token and decode its payload
        const decodedToken = jwt.verify(token, secretKey);
        req.user = decodedToken.user; 
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        return res.status(403)
        .json({ message: 'Invalid token' });
    }
}

module.exports = authenticateToken;
