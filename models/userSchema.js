const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required: [true,"Add valid name"]
    },
    email:{
        type:String,
        required: [true,"Add valid email id"],
        unique:[true,"Already taken"]
    },
    password:{
        type:String,
        required:true,
    },
    token:{
        type:String
    }
},{
    timestamps:true,
})

module.exports = mongoose.model("User",userSchema);