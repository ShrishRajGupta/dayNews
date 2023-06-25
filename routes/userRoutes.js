const express = require('express');
const router = express.Router();
const
    {
        registerUser,
        loginUser
    } = require('../controllers/userController');
const authenticateToken = require('../middleware/validate.js');

router.get('/register',async(req,res)=>{
    res.render('register');
})
router.route('/register')
    .post(registerUser);

router.get('/login',async(req,res)=>{
    res.render('login');
})

router.route('/login')
    .post(loginUser);

module.exports = router;