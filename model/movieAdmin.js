const mongoose = require("mongoose")
const {Schema} = mongoose

const MovieAdmin = new Schema(
    {
        phone:{
            type : Number,
            require : true,
            min:10
        },
        password : {
            type : String,
            required:true,
            min : 6
        }
    },
    {versionKey : false}
)

module.exports = mongoose.model("MovieAdmin",MovieAdmin)