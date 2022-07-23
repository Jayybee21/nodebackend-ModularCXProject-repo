const mongoose = require("mongoose");

   /*
    * Blogs Model, information we will be getting and setting from database to user and vice versa 
    */

   //Schema, all needed info
const blogsSchema = new mongoose.Schema({
    posttitle: {
        type:String,
        required:true
    },
     postimage: {
        type:String,
        required:true
    },
    postmessage: {
        type:String,
        required:true
    },
    postshortmessage: {
        type:String,
        required:true
    },
    postauthor: {
        type:String,
        required:true
    }
});

//Specifying which cluster of mongodb database
const blogsModel = mongoose.model("BlogsCL",blogsSchema, "BlogsCL");
module.exports = blogsModel