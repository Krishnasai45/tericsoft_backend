const express = require("express")
const Movie = require("../model/movie")


const getMovies = (req,res)=>{
    Movie.find()
    .then((movies)=>{
        res.json(movies)
    })
    .catch((err)=>{
        res.status(402).json({error:err})
    })
}
const postMovie = (req,res)=>{
    const {name,year,genre} = req.body
    const newMovie = new Movie({
        name,
        year,
        genre
    })

    newMovie
    .save()
    .then(()=>res.json({responce:"Movie add"}))
    .catch((err)=>res.status(400).json("error"+err))
}

const updateMovie = (req,res)=>{
    Movie.findById(req.params.id)
    .then((item)=>{
        item.name = req.body.name,
        item.year = req.body.year,
        item.genre = req.body.genre

        item
        .save()
        .then(()=>res.json({update:"data updated"}))
        .catch((err)=>res.status(400).json({error:err}))
    })
    .catch((err)=>res.status(400).json("error"+err))
}

const deleteMovie = (req,res)=>{
    Movie.findByIdAndDelete(req.params.id)
    .then(()=>res.json({message:"Movie deleted succesfully"}))
    .catch((err)=>res.status(402).json("error"+err))
}

module.exports = {getMovies,postMovie,updateMovie,deleteMovie}