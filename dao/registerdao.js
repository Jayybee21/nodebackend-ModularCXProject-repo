const logs = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/checkreguser', async (req, res) => {
    const username = req.body.regUser;
    const password = req.body.regPass;
    const confirm = req.body.regConfirm;
    if (confirm !== password){
        res.send( JSON.stringify({ url: "/register", additional: "Password and Confirm Password do not match !" }));
    }
    else {
    let checklogsfirst = await logs.exists({username: username, password: password});
        if(checklogsfirst){
            console.log(checklogsfirst);
            res.send( JSON.stringify({ url: "/register", additional: "User already exists !" }));
        }
        else{
            console.log("success");
            let platform = new logs({ usertype: "user" , username: username, password: password});
            platform = await platform.save();
            res.send( JSON.stringify({ url: "/home", additional: "" }));
        }
    }
});

module.exports = router;