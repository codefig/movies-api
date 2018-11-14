const express = require('express')
const bodyparser = require('body-parser');
const app = express()
const db = require('./config/connection');


app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/', function(req, res, next){
    var movies = "";
    db.query("SELECT * FROM movies ", function(err, result, fields){
        if(err){throw new Error("Error getting all movies" +  err);}
        movies = res;
        res.send(JSON.stringify(result));
    })
})

app.post('/movies/add', function(req, res, next){
    //check if a movie with that name already exist 
    // throw error or not 
    let title = req.body.title;
    let genre = req.body.genre;
    let year = req.body.year;
    console.log(title);
    db.query('SELECT * FROM movies WHERE title = ?', title, (err, results) => {
       if(results.length == 1){
            res.status(404).send({'error': true, "message": "record already exist"})
       }
       else{
           db.query("INSERT into movies SET ?", req.body, (err, results) => {
               if(err) { throw new Error("Error: " + err)}
               if(results.affectedRows  > 0){
                   res.send({"error": false, message: req.body})
               }
           })
       }
    })

})

app.put('/movies/update/:id', function(req, res){
    let id = req.params.id;
    let mtitle = req.body.title;
    let mgenre = req.body.genre;
    let myear = req.body.year ; 

    db.query("UPDATE movies SET title= ?, genre=?, year= ? WHERE id=?",[mtitle, mgenre, myear, id], (err, results) => {
        if(err) { res.send({"error": true, "message": err})}
        else{
            if(results.affectedRows > 0){
                res.send({"error" : false, "message" : req.body})
            }
        }
    })
    // res.send("Update Movie details" + id);
})

app.get('/movies/delete', function(req, res){
    res.send('Delete Movies url')
})

app.listen(5000, function(){
    console.log("Application started");
})