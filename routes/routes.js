const express = require('express')
const moviesRouter = express.Router();

moviesRouter.post('/add', function(req, res, next){
   
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

moviesRouter.put('/update/:id', function(req, res){
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