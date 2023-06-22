const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const env = require('dotenv').config()
const User = require('../models/userSchema.js');

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            res.status(400).json({ msg: "All fields are required" });

        //Checking DB for unique User
        const existingUser = await User.findOne({ email });
        if (existingUser) 
            res.status(409).json({msg:"User already exist"});

        // hashing and salting password
        let salt = bcrypt.genSaltSync(10);
        let hashPasscode = bcrypt.hashSync(password, salt);

        // Storing data of user
        const member = await User.create({
            username,email,password: hashPasscode,
        });
        /////////////////
        res.status(201).json({
                email: member.email,username: member.username,_id: member.id
            });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) 
            res.status(400).json({ msg: "All fields are required" });
        

        //Checking DB for unique User and passwd
        const user = await User.findOne({ email });
        if (!user) 
            return res.status(401).json({ message: 'Invalid username or password' });

        const check = await bcrypt.compare(password, user.password);
        if (!check) 
            return res.status(401).json({ message: 'Invalid username or password' });

        // Generation of JWT
        if (user && check) {
            const token = jwt.sign({
                user: {username: user.username,email: user.email,id: user._id}
            },
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: "2h"
                }
            );
            user.token = token;
            res.status(200).json({ token });
        }else {
            res.status(401);
            throw new Error('Validation Error');
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser
}