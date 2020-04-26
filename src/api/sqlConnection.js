const mysql = require('mysql');
const port = process.env.PORT || 3306;

const sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root2019",
    database: 'mydatabase',
    port: port
  });
  
sqlConnection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    sqlConnection.query("CREATE DATABASE IF NOT EXISTS mydb", function (err) {
      if(err) throw err;
      console.log("Database created");
    });
});

module.exports = sqlConnection;