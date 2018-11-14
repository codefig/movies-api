const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost', 
    user : 'root', 
    password : '', 
    database : 'movies_api'
});

connection.connect();

// connection.query('SELECT * FROM movies', function(err, results, fields){
//     if(err) { 
//         throw new Error("There was an error with the query");
//     }
//     console.log("The movies are ", results);
// });

module.exports = connection;