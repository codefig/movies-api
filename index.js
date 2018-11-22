const express = require('express')
const bodyparser = require('body-parser');
const app = express()
const moviesRouter = require('./routes/mongoroute');

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyparser.urlencoded({extended: true}));

app.use('/movies', moviesRouter);

app.get('/', function(req, res){
    res.status(200).send("Welcome to the Movies API V2.0");
})

let port = process.env.PORT || 4000;
app.listen(port, function(){
    console.log(`Application started on port ${port}`);
})