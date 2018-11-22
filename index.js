const express = require('express')
const bodyparser = require('body-parser');
const app = express()
// const db = require('./config/connection');
const moviesRouter = require('./routes/mongoroute');

const Course = require('./config/database');

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/movies', moviesRouter);

app.get('/', function(req, res){
    res.status(200).send("Welcome to the Movies API V2.0");
})


// async function createCourse(){
//     const course = new Course({
//         name: "Angular Course", 
//         author : "Mosh Ali", 
//         tags : ['angular', 'frontend'], 
//         isPublished : true
//     }); 
//     const result = await course.save();
//     return result;
// }


// app.get('/create', function(req, res){
//     const response = createCourse();
//     response.then(result => {
//         console.log("result : " + result);
//     }).catch(err => {
//         console.log(new Error("Something happend"));
//     })
//     // console.log("This is the resp: " +response);
//     // console.log("course createdd");
//     // return res.send({'response': response});
// })

// app.get('/', function(req, res, next){
//     var movies = "";
//     db.query("SELECT * FROM movies ", function(err, result, fields){
//         if(err){throw new Error("Error getting all movies" +  err);}
//         movies = res;
//         res.send({"error": false, "message" : result});
//     })
// })

let port = process.env.PORT || 4000;
app.listen(port, function(){
    console.log(`Application started on port ${port}`);
})