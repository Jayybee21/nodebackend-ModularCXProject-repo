const logs = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/checkloguser', async (req, res) => {
    const username = req.body.logUser;
    const password = req.body.logPass;
    const getall = await logs.find({});
    const checklogsfirst = await logs.exists({username: username, password: password});
        if(!checklogsfirst){
            console.log(checklogsfirst);
            console.log("Incorrect credentials !");
            res.send( JSON.stringify({ url: "/login", additional: "Incorrect credentials !" }));
        }
        else{
            console.log(checklogsfirst);
            console.log("Correct credentials !");
            res.send(JSON.stringify({url: "/home", additional: ""}));
        }
});

// router.get('/getusers', (req, res) => {
//      logs.find({},(err,result) => {
//         if(err){
//             res.json(err);
//         }
//         else{
//             res.json(result);
//         }
//     });
//     console.log("data sent");
// });

module.exports = router;