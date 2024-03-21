const express = require("express")

const Router = express.Router();

Router.get("/", (req, res)=>{
    res.send("This Router is working")
})



module.exports = Router