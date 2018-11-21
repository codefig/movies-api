const express = require('express')
const bodyparser = require('body-parser');
const app = express()
const db = require('./config/connection');


let port = process.env.PORT || 5000;
app.listen(port, function(){
    console.log(`Application started on port ${port}`);
})