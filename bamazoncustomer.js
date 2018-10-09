//Create dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
//Create connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    //Add port information
    port:8080,
    //Username
    user:"root",
    //Password and Database
    password: "password",
    database: "bamazon_DB"
});
//connect to mysql database and server
connection.connect(function(err){
    if(err) throw err;
})