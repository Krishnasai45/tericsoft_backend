const express = require("express")
const router = express.Router()
const {registerUser,loginUser} = require("../controller/adminController")
const {getMovies,postMovie,updateMovie,deleteMovie} = require("../controller/movieController")
const requirLogin = require("../middleware/requirLogin")


router.post("/account/register",registerUser)
router.post("/account/login",loginUser)
router.post("/movie",requirLogin,postMovie)
router.get("/movie",requirLogin,getMovies)
router.put("/movie/:id",requirLogin,updateMovie)
router.delete("/movie/:id",requirLogin,deleteMovie)

module.exports = router