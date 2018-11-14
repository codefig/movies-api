const express = require('express')
const app = express()
const db = require('./config/connection');



app.get('/', function(req, res, next){
    var movies = "";
    db.query("SELECT * FROM movies ", function(err, result, fields){
        if(err){throw new Error("Error getting all movies" +  err);}
        movies = res;
        res.send(JSON.stringify(result));
    })
})

app.get('/movies/add', function(req, res){
    res.send("Add movies to the database");
})

app.get('/movies/update', function(req, res){
    res.send("Update Movie details");
})

app.get('/movies/delete', function(req, res){
    res.send('Delete Movies url')
})

app.listen(5000, function(){
    console.log("Application started");
})