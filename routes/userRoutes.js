const express = require('express');
const router = express.Router();
const
    {
        registerUser,
        loginUser
    } = require('../controllers/userController');
const authenticateToken = require('../middleware/validate.js');


router.route('/register')
    .post(registerUser);

router.route('/login')
    .post(loginUser);

module.exports = router;