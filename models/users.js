const mongoose = require("mongoose");

   /*
    * User Model, information we will be getting and setting from database to user and vice versa 
    */

  //Schema, all needed information
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

//Specifying which cluster from Mongodb database
const userModel = mongoose.model("UsersCL",userSchema, "UsersCL");
module.exports = userModel