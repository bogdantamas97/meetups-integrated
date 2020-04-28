const express = require('express');
const Router = express.Router();
const sqlConnection = require('../sqlConnection');

Router.get("/", (req, res) => {
    sqlConnection.query("SELECT * from topics", (err, rows) => {
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    })
})
Router.post('/insert',(req, res) => {
      const data = {   
                        id: req.query.userID,
                        email: req.query.email,
                        firstname: req.query.firstname,  
                        lastname: req.query.lastname,
                        password: req.query.password,
                    };
      const sql = "INSERT INTO topics SET ?";
      sqlConnection.query(sql, data,(err) => {
        if(err) throw err;
        res.redirect('/');
      });
  });
  
Router.post('/update',(req, res) => {
    const sql = "UPDATE topics SET username='"+req.query.email+"', firstname='"+req.query.firstname+"', lastname='"+req.query.lastname+"', password='"+req.query.password+"' WHERE id='"+req.query.id+"'";
      sqlConnection.query(sql, (err) => {
        if(err) throw err;
        res.redirect('/');
      });
    }); 
  
Router.post('/delete',(req, res) => {
      const sql = "DELETE FROM topics WHERE id='"+req.query.id+"'";
      sqlConnection.query(sql, (err) => {
        if(err) throw err;
          res.redirect('/');
      });
    });

module.exports = Router;