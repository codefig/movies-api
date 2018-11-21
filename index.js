const express = require('express')
const bodyparser = require('body-parser');
const app = express()
const db = require('./config/connection');
const moviesRouter = require('./routes/routes');

app.use('/movies', moviesRouter);

app.get('/', function(req, res, next){
    var movies = "";
    db.query("SELECT * FROM movies ", function(err, result, fields){
        if(err){throw new Error("Error getting all movies" +  err);}
        movies = res;
        res.send({"error": false, "message" : result});
    })
})

let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`Application started on port ${port}`);
})