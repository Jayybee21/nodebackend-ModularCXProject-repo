const logs = require('../models/users');
const express = require('express');
const router = express.Router();

   /*
    * Register Data Access Object, where all API calls for registration are called 
    */

//POST REQUEST
//Verifying user input from Database
router.post('/checkreguser', async (req, res) => {
    //retrieving all user input
    const username = req.body.regUser;
    const password = req.body.regPass;
    const confirm = req.body.regConfirm;

    //checking if user did not leave any field empty
    if (username == "" || password == ""|| confirm == ""){
        res.send( JSON.stringify({ url: "/register", additional: "Please fill all info!" }));
        return;
    }
    //checking if password and confirm match
    else if (confirm !== password){
        res.send( JSON.stringify({ url: "/register", additional: "Password and Confirm Password do not match !" }));
        return;
    }
    else {
        //quick check if user exists in database
    let checklogsfirst = await logs.exists({username: username});
        if(checklogsfirst){
            res.send( JSON.stringify({ url: "/register", additional: "User already exists !" }));
            return;
        }
        else{
          //setting cookie for later use
            res.cookie("usertype","user",{maxAge:86400000});
            res.cookie("username",username,{maxAge:86400000});
              //saving new user to database
            let platform = new logs({ usertype: "user" , username: username, password: password});
            platform = await platform.save();
            //redirecting
            res.send( JSON.stringify({ url: "/home", additional: "" }));
            return;
        }
    }
});

module.exports = router;