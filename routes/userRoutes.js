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

router.get('/logout',async(req,res)=>{
    return res
    .clearCookie("authorization")
    .status(200)
    .redirect('/');
})

module.exports = router;