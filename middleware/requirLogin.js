const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
const MovieAdmin = require("../model/movieAdmin")
const dotenv = require("dotenv")

dotenv.config()

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logedin"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        MovieAdmin.findById(_id).then((userData)=>{
            req.user = userData
            next()
        })
    })
}