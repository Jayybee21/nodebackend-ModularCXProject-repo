/*
 *variable declarations
 */
const express = require("express");
const env = require("dotenv").config({path: './.env'});
const blogs = require("./dao/blogsdao");
const login = require("./dao/logindao");
const register = require("./dao/registerdao");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const currentport = process.env.PORT || 5000;

/*
 *connecting to our Mongo Database
 */
mongoose.connect(process.env.CLUSTER_DB_URI + "")
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Error connecting to MongoDB!', err));

//used to allow data being shared between node and react + vice versa
app.use(cors());
//used to parse json 
app.use(express.json());
//used to access data access object (DAO)
app.use("/api/blogs",blogs);
app.use("/api/login",login);
app.use("/api/register",register);


/*
 *setting port for our backend to run on
 */
app.listen(currentport, () => {
    console.log("Backend server is ON!");
    console.log(`Listening on port: ${currentport}`);
});