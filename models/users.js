const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    usertype: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    }
});

const userModel = mongoose.model("UsersCL",userSchema, "UsersCL");
module.exports = userModel