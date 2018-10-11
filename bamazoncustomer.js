//Create dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
//Create connection to the database
var connection = mysql.createConnection({
    host: "localhost",
    //Add port information
    port:3306,
    //Username
    user:"root",
    //Password and Database
    password: "password",
    database: "bamazon_DB"
});
//connect to mysql database and server
connection.connect(function(err){
    if(err) {
        throw err
    }

    productPrompt();
    
    //start();
});

//Functions for customer prompts. 
function displayProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
            else 
                for(var i= 0; i<results.length; i++) { 
                console.log("Item: " + results[i].product_name + "\n" +
                "Product ID: " + results[i].item_id +"\n" +
                "Price: " + results[i].price + "\n" +
                "----------------------------------------------"
                );
            }
    
    })
    
}

function productPrompt() {
    displayProducts();
    inquirer
        .prompt([
            {
            name: "productID",
            type: "input",
            message: "Please input the product ID of the item you would like to purchase.",
            // validate: function(value) {
            //     if (isNaN(value) === false) {
            //       return true;
            //     }
            //     return false;
            //   }
            },
            {
            name: "itemQuantity",
            type: "input",
            message: "How many would you like to purchase?",
            // validate: function(value) {
            //     if (isNaN(value) === false) {
            //       return true;
            //     }
            //     return false;
            //   }
            }
        ])
          .then(function(answers) {
              //console.log(answers);
              var quantity = parseInt(answers.itemQuantity);
              //console.log(quantity);
              var id = parseInt(answers.productID);
              //console.log(id);
            // based on their answers, find item_id against database
            connection.query("SELECT * FROM products", function(err, results) {
                if (err) throw err;
                 else 
                for(var i= 0; i<results.length; i++) {
                    if(id === results[i].item_id) {
                        console.log ("I see that you would like to purchase " + quantity + " of: " + results[i].product_name);
                    }
                }
          })
        })
}