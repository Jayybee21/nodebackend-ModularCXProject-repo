import express from "express"
import cors from "cors"
import docInfo from "./service/docs.route.js"

const app = express()
//for sharing info with frontend and backend
app.use(cors())
//to be able to read json in posts and gets 
app.use(express.json())
//for the url of the application
app.use("/api/docinfo",docInfo)
//for error page
app.use("*",(req,res)=> res.status(404).json({error : "Page not found !"}))


export default app
