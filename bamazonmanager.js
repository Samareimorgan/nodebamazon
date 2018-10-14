//Dependencies *************************************************
var mysql = require("mysql");
var inquirer = require("inquirer");


//Functionality of the program  *****************************

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

    managerPrompt();
})

//Functions for the program **********************************

//main function for prompt
function managerPrompt() {
    inquirer
        .prompt([
            {
            name: "managerChoice",
            type: "rawlist",
            message: "Please select what you would like to do",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory",
                "Add New Product"]
           
            }
            
        ])
          .then(function(answers) {
              if(answers.managerChoice === "View Products for Sale") {
                console.log("Okay, so you want to view Products for Sale.");

                viewProducts();
                //managerPrompt();
              }
              if(answers.managerChoice === "View Low Inventory") {
                console.log("Okay, so you want to View Low Inventory." + "\n" + "All items with stock inventory of 2 or less are listed below" + "\n" + "==================================================" );

                viewLowInventory();
                //managerPrompt();
              }
              if(answers.managerChoice === "Add to Inventory") {
                console.log("Okay, so you want to Add to Inventory");
              }
              if(answers.managerChoice === "Add New Product") {
                console.log("Okay, so you want to Add New Product");
                }
        
        //       connection.query("SELECT * FROM products", function(err, results) {
        //         if (err) throw err;
        //          else 
        //         for(var i= 0; i<results.length; i++) {
        //             console.log(results[i]);
        //         }
        // })
        
        })
    }

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
            else 
                for(var i= 0; i<results.length; i++) { 
                var stock = results[i].stock_quantity;
                if(stock >=1) {
                    console.log("Item: " + results[i].product_name + "\n" +
                    "Product ID: " + results[i].item_id +"\n" +
                    "Price: " + results[i].price + "\n" + "Quantity in Stock: " + results[i].stock_quantity + "\n" +
                    "----------------------------------------------"
                    );
                }
    
            }
    })
}

function viewLowInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
            else 
                for(var i= 0; i<results.length; i++) { 
                var stock = results[i].stock_quantity;
                if(stock <=2) {
                    console.log("Item: " + results[i].product_name + "\n" +
                    "Product ID: " + results[i].item_id +"\n" +
                    "Price: " + results[i].price + "\n" + "Quantity in Stock: " + results[i].stock_quantity + "\n" +
                    "----------------------------------------------"
                    );
                }
    
            }
    })
}
function addInventory() {
    inquirer.prompt([
        { 
            name: "id",
            type: "input",
            message: "Provide the product ID of the item you would like to Add inventory to."
        },
        {
            name: "stock",
            type: "input",
            message: "How many of that item would you like to add to the current stock quantity?"
        }
    ])
    .then(answers) {
        
    }
    newQuantity = (stockQuantity - customerQuantity);
    console.log(newQuantity);

        connection.query(
            
            "UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: newQuantity,
                    },
                    {
                    item_id: id
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Quantity has been updated");
                    console.log("New Quantity: " +newQuantity);
                }
        ) 
}