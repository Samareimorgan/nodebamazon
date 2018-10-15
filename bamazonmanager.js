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
                    
                    connection.query("SELECT * FROM products", function(err, results) {
                        if (err) throw err;
                         else 
                        for(var i= 0; i<results.length; i++) {
                        var stock = parseInt(results[i].stock_quantity);
                        
                    }
                    console.log("Okay, so you want to Add to Inventory");
                    addInventory(stock);
                    })

                }
                if(answers.managerChoice === "Add New Product") {
                    console.log("Okay, so you want to Add New Product");
                    addNewProduct();
                }
        
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
function addInventory(oldStock) {
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
    .then (function(answers) {
        var addStock = parseInt(answers.stock);
        newStock = (addStock +  oldStock);
        console.log(newStock);

        connection.query(
            
            "UPDATE products SET ? WHERE ?",
                [
                    {
                    stock_quantity: newStock,
                    },
                    {
                    item_id: answers.id
                    }
                ],
                function(err) {
                    if (err) throw err;
                    console.log("Quantity has been updated");
                    console.log("New Quantity: " +newStock);
                }
        ) 
    })
}

function addNewProduct(){
    inquirer.prompt([
        { 
            name: "itemName",
            type: "input",
            message: "Provide the product Name of the item you would like to add to the catalog."
        },
        {
            name: "deptName",
            type: "input",
            message: "What department does that item belong in?"
        },
        {
            name: "startingStock",
            type:"input",
            message: "How many of that item would you like to add to the inventory?"
        },
        {
            name: "startPrice",
            type: "input",
            message: "What price will each item sell for?"
        }

    ])
    .then (function(answers) {
    var startingStock = parseInt(answers.startingStock);
    var startPrice = parseInt(answers.startPrice);
    connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answers.itemName,
          department_name: answers.deptName,
          stock_quantity: startingStock,
          price: answers.startPrice
        },
        function(err) {
          if (err) throw err;
          console.log("The below information has been added to the database catalog: \n" + "*************NEW PRODUCT*********** \n" + "New Product Name: " + answers.itemName +"\n" + "Department: " + answers.deptName + "\n" + "Beginning Inventory: " + startingStock + "\n"+"Price per item: $" + answers.startPrice +"\n"+"==================================");
          
        }
      );
    });
}