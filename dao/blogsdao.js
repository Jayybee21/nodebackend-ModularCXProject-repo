const blogs = require('../models/blogs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/addblog', async (req, res) => {
    let platform = new blogs({ posttitle: "Dummy Title" , postmessage: "Lorem Ipsum Dolor...", postauthor: "Dummy Author"});
    platform = await platform.save();
    res.send(`new blog added!`);
});

router.get('/getblogs', (req, res) => {
     blogs.find({},(err,result) => {
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
 
    });
    console.log("data sent");
});

module.exports = router;