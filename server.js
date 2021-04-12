const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const adminRoute = require("./routes/adminRoutes")

const server = express()
dotenv.config()
server.use(cors())
server.use(express.json())
server.use("/",adminRoute)

mongoose.connect(
    process.env.URI,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (error) => {
      if (error) console.log(`error connecting database : ${error}`);
      else console.log("Database is successfully connected");
    }
  )


server.listen(5000,()=>{
    console.log("server is up and ready")
})