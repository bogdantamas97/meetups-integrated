const express = require('express');
const Router = express.Router();
const sqlConnection = require('../sqlConnection');

Router.get("/", (req, res) => {
    sqlConnection.query("SELECT * from login", (err, rows) => {
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
                        id: req.query.id,
                        email: req.query.email,
                        firstname: req.query.firstname,  
                        lastname: req.query.lastname,
                        password: req.query.password,
                    };
      const sql = "INSERT INTO login SET ?";
      sqlConnection.query(sql, data,(err) => {
        if(err) throw err;
        res.redirect('/');
      });
  });
  
Router.post('/update',(req, res) => {
    const sql = "UPDATE login SET username='"+req.query.email+"', firstname='"+req.query.firstname+"', lastname='"+req.query.lastname+"', password='"+req.query.password+"' WHERE id='"+req.query.id+"'";
      sqlConnection.query(sql, (err) => {
        if(err) throw err;
        res.redirect('/');
      });
    }); 
  
Router.post('/delete',(req, res) => {
      const sql = "DELETE FROM login WHERE id='"+req.query.id+"'";
      sqlConnection.query(sql, (err) => {
        if(err) throw err;
          res.redirect('/');
      });
    });

module.exports = Router;