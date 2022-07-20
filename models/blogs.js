const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
    posttitle: {
        type:String,
        required:true
    },
    postmessage: {
        type:String,
        required:true
    },
    postauthor: {
        type:String,
        required:true
    }
});

const blogsModel = mongoose.model("BlogsCL",blogsSchema, "BlogsCL");
module.exports = blogsModel