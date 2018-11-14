const express = require('express')
const app = express()


app.get('/', function(req, res, next){
    res.send("Welcome to the Movies Collection database");
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

app.listen(3000, function(){
    console.log("Application started");
})