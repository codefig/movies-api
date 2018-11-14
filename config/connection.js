const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost', 
    user : process.env.USERNAME, 
    password : process.env.PASSWORD, 
    database : 'movies_api'
});

connection.connect();

module.exports = connection;