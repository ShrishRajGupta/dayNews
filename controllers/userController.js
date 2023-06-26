const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const User = require('../models/userSchema.js');

//@desc = a post request to register new user
//response = it is sent to news.ejs
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            res.status(400).redirect('/user/register');// redirect to register

        //Checking DB for unique User
        const existingUser = await User.findOne({ email });
        if (existingUser)
            res.redirect('/user/login'); // redirect to login

        // hashing and salting password
        let salt = bcrypt.genSaltSync(10);
        let hashPasscode = bcrypt.hashSync(password, salt);

        // Storing data of user
        const member = await User.create({
            username, email, password: hashPasscode,
        });

        // Token generation and storage
        member.token = checkF(member);
        return res
            .cookie("authorization", member.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .redirect('/');
    }
    catch (err) {
        console.log(err);
        res.status(500).render(500) // render 500
    }
};

//@desc = a get request to verify logged in user 
//response = it is sent to news.ejs
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password)
            res.status(400).redirect('/user/login'); // redirect to login


        //Checking DB for unique User and passwd
        const user = await User.findOne({ email });
        if (!user)
            return res.status(401).redirect('/user/login'); // redirect to login

        const check = await bcrypt.compare(password, user.password);
        if (!check)
            return res.status(401).redirect('/user/login'); // redirect to login

        // Generation of JWT
        if (user && check) {
            user.token = checkF(user);
            return res
                .cookie("authorization", user.token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                })
                .status(200)
                .redirect('/');
        } else {
            res.status(401).redirect('/user/register'); // redirect to register
            throw new Error('Validation Error');
        }
        // token generated
    }
    catch (err) {
        console.log(err); // render to 500
        res.status(500).render('500');
    }
};

// Generates JWT
const checkF = function (user) {
    try {
        const token = jwt.sign({
            user: { username: user.username, email: user.email, id: user._id }
        },
            process.env.ACCESS_TOKEN,
            {
                expiresIn: "2h"
            }
        );
        return token;
    }
    catch {
        throw new Error('Validation Error');
    }
}

module.exports = {
    registerUser,
    loginUser
}