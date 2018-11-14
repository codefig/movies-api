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
   
    let title = req.body.title;
    let genre = req.body.genre;
    let year = req.body.year;
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
})

app.delete('/movies/delete/:id', function(req, res){
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
let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`Application started on port ${port}`);
})