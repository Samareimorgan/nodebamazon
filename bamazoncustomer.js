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
    
    
});

//Function to display products in the database 
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
//Function to go through the product prompts for the customer
function productPrompt() {
    displayProducts();
    inquirer
        .prompt([
            {
            name: "productID",
            type: "input",
            message: "Please input the product ID of the item you would like to purchase.",
           
            },
            {
            name: "itemQuantity",
            type: "input",
            message: "How many would you like to purchase?",
          
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
                        console.log ("I see that you would like to purchase " + quantity + " of: " + results[i].product_name + "\n" +
                        "I will check that we have enough in stock. One moment please.");  
                        //if the quantity in stock is greater than the requested quantity   
                        if(results[i].stock_quantity >= quantity){
                            console.log("We have " + results[i].stock_quantity + " at this time. We have enough stock to fulfill your order");
                            //update Quantity in the database
                            updateQuantity(results[i].stock_quantity, quantity, id);
                            //This verifies that the database has been updated ... can be commented out
                            verifyNewQuantity(id);
                            //This requests the amount owed from the customer.
                            verifyCost(quantity,id);
                        }
                         else 
                            // if we do not have enough stock, message is console logged out
                            console.log("We only have " + results[i].stock_quantity+ " at this time. We do not have sufficient stock to fulfill your order at this time. ")
                    }

            
                }
          })
        })
}
//function to update the mysql database 
function updateQuantity (stockQuantity, customerQuantity, id) {
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
//function to test that the update quantity worked
function verifyNewQuantity(id) {
    connection.query("SELECT *FROM products", function(err, results) {
        if (err) throw err;
            else 
                for(var i= 0; i<results.length; i++) {
                    if(id == results[i].item_id) {
                        console.log("The new quantity in stock is: " + results[i].stock_quantity);
                    }
                }


    })
}
//function to determine the price that the customer owes
function verifyCost(quantity, id) {
        connection.query("SELECT *FROM products", function(err, results) {
            if (err) throw err;
                else 
                    for(var i= 0; i<results.length; i++) {
                        if(id == results[i].item_id) {
                            var cost = (results[i].price * quantity);
                            console.log(cost);
                            console.log("You are purchasing " + quantity + " " + results[i].product_name + " at the price of " +results[i].price + "\n" + "Please pay $" + cost);
                        }
                    }

         })

}