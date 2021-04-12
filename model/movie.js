const mongoose = require("mongoose")
const Schema = mongoose.Schema

const movieSchema = new Schema(
    {
        name : {
            type : String,
            required : true
        },
        year :{
            type : String,
            required : true
        },
        genre : {
            type : String,
            required : true
        }
    },
    {versionKey : false}
)

module.exports = mongoose.model("Movie",movieSchema)