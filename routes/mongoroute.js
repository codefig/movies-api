const express = require('express')
const mongoose = require('mongoose')
const moviesRouter = express.Router();

//connect to the document database
mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to the MongoDB"))
    .catch(err => console.log("Error : " + err));



//create a schema for our document model
const schema = new mongoose.Schema({
    title : String, 
    genre : String, 
    year : String,
});


//create the model
const Movie = mongoose.model("Movie", schema);


//function to createMovie
async function createMovie(mtitle, mgenre, myear){
    const movie = new Movie({
        title: mtitle,
        genre: mgenre, 
        year : myear, 
    }); 
    const result = await movie.save();
    return result;
}



async function updateMovie(id, title, genre, year){
    const movie = await Movie.findById(id);
   
    if(!movie) return;

    movie.title = title 
    movie.genre = genre
    movie.year = year;
    const result = await movie.save();
    return result;
}


async function deleteMovie(id){
    const movie = await Movie.findByIdAndDelete(id);
    return movie;
}


//router functions
moviesRouter.post('/add', function(req, res, next){
    
    let title = req.body.title;
    let genre = req.body.genre;
    let year = req.body.year;
    
    const result = createMovie(title, genre, year);
    result.then(output => {
        res.status(200).send({"error": false, message: output})
    }).catch(err => {
        res.status(400).send({"error": true, message: err})
    })
})



moviesRouter.put('/update/:id', function(req, res){
    let id = req.params.id;
    let mtitle = req.body.title;
    let mgenre = req.body.genre;
    let myear = req.body.year ; 

    const result = updateMovie(id, mtitle, mgenre, myear);
    result.then(output => {
        res.status(200).send({"error": false, "message": "Movie information updated Successfully"})
    })
    .catch(err => {
        res.status(400).send({"error": true, "message": "Movie update not successful" + err})
    })

})

moviesRouter.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    const movie = deleteMovie(id);

    movie.then(result => {
        res.status(200).send({"error": false, "message": "Movie record deleted Successfully"});
    }).catch(err => {
        res.status(400).send({"error": true, "message": "Movie record not found"});
    })
})

module.exports = moviesRouter;