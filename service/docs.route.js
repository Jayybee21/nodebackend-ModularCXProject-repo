import express from "express"

const router = express.Router()

router.route("/").get((req,res) => res.send("In main route"))

export default router