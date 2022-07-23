const blogs = require('../models/blogs');
const express = require('express');
const router = express.Router();

   /*
    * Blogs Data Access Object, where all API calls for blog manipulation are found 
    */

//GET REQUESTS
//Sending to user list of all blogs from database
router.get('/getblogs', (req, res) => {
     blogs.find({},(err,result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//Sending to user selected blog'information for editing
router.get('/editblog', async (req, res) => {
    //variable that retrieves id from URL
    const userid = req.query.id;
    //finding based on ID
     const retrievedBlog = await blogs.findById({_id: userid}, req.body);
            if(!retrievedBlog){
                res.json(err);
            }
            else{
                res.send(JSON.stringify({posttitle: retrievedBlog.posttitle,postimage: retrievedBlog.postimage,postmessage: retrievedBlog.postmessage}));
            }
});

//POST REQUEST
//Saving user's blog information to database
router.post('/addblog', async(req, res) => {
    //variables for retrieving info inputed by user
    const title = req.body.addBlogTitle;
    //in case no image url written we set a default image
    const url = req.body.addBlogImage || "https://i.pinimg.com/originals/ac/b9/07/acb907ceb1d75d6297681e6b0962777f.png";
    const message = req.body.addBlogMessage;
    const trimmedMessage = message.substring(0, 150);
    const author = req.body.addBlogAuthor;
    //using models class to add a new blog
    if (title == "" || message == ""){
        res.send( JSON.stringify({ url: "/addblog", additional: "Please fill all info!" }));
        return;
    }
    else {
    let newBlog = new blogs({ posttitle:title , postimage:url , postmessage: message , postshortmessage:trimmedMessage, postauthor:author });
    //saving to database
    newBlog = await newBlog.save();
    //redirecting back to home page
    res.send( JSON.stringify({  url:"/home", additional:""}));
    return;
    }
});

//PATCH REQUEST
//Updating blog based on user's edited post 
router.patch('/editblog', (req, res) => {
    //variables for retrieving info inputed by user
    const userid = req.query.id;
    const title = req.body.editBlogTitle;
    //in case no image url written we set a default image
    const url = req.body.editBlogImage || "https://i.pinimg.com/originals/ac/b9/07/acb907ceb1d75d6297681e6b0962777f.png";
    const message = req.body.editBlogMessage;
    const author = req.body.addBlogAuthor;
    const trimmedMessage = message.substring(0, 150);
    if (title == "" || message == ""){
        res.send( JSON.stringify({ url: `/editblog/?id=${userid}`, additional: "Please fill all info!" }));
        return;
    }
    else {
    blogs.findOneAndUpdate({ _id:userid},{posttitle:title , postimage:url , postmessage: message , postshortmessage:trimmedMessage, postauthor:author },req.body, function(err,data) {
        if (err){
            console.log(err)
        }
        else{
            res.send(JSON.stringify({url:"/home"}));
        }
    });
}
});

//DELETE REQUEST
//Deleting user's specified blog
router.delete('/deleteblog', (req, res) => {
    const userid = req.query.id;
    blogs.findOneAndRemove({_id: userid}, req.body, function(error,data){
    if(!error){
        blogs.find({},(err,result) => {
            if(err){
                res.json(err);
            }
            else{
                res.json(result);
            }
        });
    }
});
});


module.exports = router;