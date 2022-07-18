const docs = require('../models/docs');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/adduser', async (req, res) => {
    //const { error } = validate(req.body);
    //if (error) {
    //    return res.status(400).send(error.details[0].message);
    //}

    let platform = new docs({ name: "Jad" , age: 21, username: "JB"});
    platform = await platform.save();
    res.send(`new user saved !`);
});

router.get('/getusers', (req, res) => {
     docs.find({},(err,result) => {
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