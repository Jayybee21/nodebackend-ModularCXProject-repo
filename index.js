import app from './server.js'
import mongodb, { MongoClient } from "mongodb"
import dotenv from "dotenv"
dotenv.config()
const mongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

mongoClient.connect(
    process.env.CLUSTER_DB_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
    }
).catch(err => {
    console.error(err.stack)
    process.exit(1)
}).then(async client => {
    app.listen(port,() => {
        console.log("API server is ON !")
        console.log(`port: ${port}`)
    })
})