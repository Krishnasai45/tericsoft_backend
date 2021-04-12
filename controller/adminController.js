const bcrypt = require("bcryptjs")
const MovieAdmin = require("../model/movieAdmin")
const jwt = require("jsonwebtoken")

const registerUser = (req,res)=>{
    const {phone,password} = req.body
    if(!phone || !password){
        return res.status(402).json({error:"please add all the fields"})
    }
    MovieAdmin.findOne({phone:phone})
    .then((savedAdmin)=>{
        if(savedAdmin){
            return res.status(400).json({error:"Admin already exist"})
        }
        bcrypt.hash(password,12)
        .then(hasedPassword=>{
            const admin = new MovieAdmin({
                phone,
                password : hasedPassword
            })
            admin.save()
            .then((admins)=>{
                res.json({message : "saved Successfully"})
            })
            .catch((err)=>{
                console.log(err)
            })
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

const loginUser = (req,res)=>{
    const {phone,password} = req.body
    if(!phone || !password){
        return res.status(422).json({error:"please add all the fiels"})
    }
    MovieAdmin.findOne({phone:phone})
    .then((savedUser)=>{
        if(!savedUser){
            return res.status(422).json({error : "Invalid phone or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then((match)=>{
            if(match){
                const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)
                const {_id,phone} = savedUser
                res.json({token,admin:{_id,phone}})
            }else {
                return res.status(422).json({error:"Invalid phone or password"})
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    })
}

module.exports = {registerUser,loginUser}