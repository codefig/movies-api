const express = require('express')
const mongoose = require('mongoose')
const moviesRouter = express.Router();
// const bodyparser = require('body-parser');


mongoose.connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to the MongoDB"))
    .catch(err => console.log("Error : " + err));


const schema = new mongoose.Schema({
    title : String, 
    genre : String, 
    year : String,
});



const Movie = mongoose.model("Movie", schema);


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

moviesRouter.post('/add', function(req, res, next){
    
    let title = req.body.title;
    let genre = req.body.genre;
    let year = req.body.year;
    
    const result = createCourse(title, genre, year);
    result.then(output => {
        res.status(200).send({"error": false, message: output})
    }).catch(err => {
        console.log(new Error(err));
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
        console.log("Update Successfull");
        res.status(200).send({"error": false, "message": "Movie information updated Successfully"})
    })
    .catch(err => {
        res.status(400).send({"error": true, "message": "Movie update not success" + err})
    })

})

moviesRouter.delete('/delete/:id', function(req, res){
    let id = req.params.id;
    db.query("DELETE FROM movies WHERE id= ? ", id, function(err, results){
        if(err) { res.send({"error" : true, "message": "Delete operation not successful"})}
        else{
            if(res.affectedRows > 0){
                res.send({"error": false, "message": "record deleted successfully"});
            }else{
                res.send({"error": true, "message": "No record found "});
            }
        }
    })
})

module.exports = moviesRouter;