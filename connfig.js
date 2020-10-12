var mysql= require('mysql');
connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"sportal"
});

module.exports=connection;

