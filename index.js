/*
 *VARIABLE DECLARATION SECTION
 */
const express = require("express");
const env = require("dotenv").config({path: './.env'});
//to connect to mongodb
const mongoose = require("mongoose");
//to interract with react appplication
const cors = require('cors');
//for sessions and cookies
const cookieParser = require('cookie-parser');
//using express
const app = express();
//DAOs, aka our connections to the database
const blogs = require("./dao/blogsdao");
const login = require("./dao/logindao");
const register = require("./dao/registerdao");
const logout = require("./dao/logoutdao");
//reading port from .env file, or set default port
const currentport = process.env.PORT || 5000;
//for whitelisting
const whitelist = ["http://localhost:3000"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}


/*
 *CONNECTION TO MONGODB SECTION
 */
mongoose.connect(process.env.CLUSTER_DB_URI + "")
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Error connecting to MongoDB!', err));

/*
 *MIDDLEWARES SECTION
 */
//setting middlewares for session and cookie
app.use(cookieParser());
app.use(cors(corsOptions));
//used to parse json 
app.use(express.json());
//used to access data access object (DAO)
app.use("/api/blogs",blogs);
app.use("/api/login",login);
app.use("/api/register",register);
app.use("/api/logout",logout);


/*
 *setting port for our backend to run on
 */
app.listen(currentport, () => {
    console.log("Backend server is ON!");
    console.log(`Listening on port: ${currentport}`);
});