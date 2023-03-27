const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { auth } = require("./middleware/auth.middleware");
const { postRoute } = require("./route/post.route");
const { userRoute } = require("./route/user.route");
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(cors())
app.use("/users",userRoute)
app.use(auth)
app.use("/posts",postRoute)

app.listen(process.env.PORT,async()=>{
    try {
       await connection 
       console.log("connected to db")
    } catch (error) {
        
    }
    console.log("server is running")
})