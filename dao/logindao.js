const logs = require('../models/users');
const express = require('express');
const router = express.Router();

   /*
    * Login Data Access Object, where all API calls for user login are found 
    */

//POST REQUEST
//Verifying user input from Database
router.post('/checkloguser', async (req, res) => {
    //retrieving values of user input
    const username = req.body.logUser;
    const password = req.body.logPass;
    //checking if user did not leave any field empty beforehand
    if (username == "" || password == ""){
        res.send( JSON.stringify({ url: "/login", additional: "Please fill all info!" }));
        return;
    }
    //checking if user eist in db
    const checklogsfirst = await logs.findOne({username: username, password: password});
        if(!checklogsfirst){
            res.send( JSON.stringify({ url: "/login", additional: "Incorrect credentials !" }));
            return;
        }
        else{
            //saving values of retrieved user into cookies for later usage
            let tempUserType = checklogsfirst["usertype"]
            let tempUserName = checklogsfirst["username"]
            //setting name and time alive for each cookie
            res.cookie("usertype",tempUserType,{maxAge:86400000});
            res.cookie("username",tempUserName,{maxAge:86400000});
            //redirection
            res.send(JSON.stringify({url: "/home", additional: ""}));
            return;
        }
});
module.exports = router;