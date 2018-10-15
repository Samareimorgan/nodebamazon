# Node-Bamazon
### A node cli application 

Bamazon is run through Node.js and utilizes the Mysql and Inquirer modules.  
The goal of Bamazon is to provide insight to the mysql database when the user answers the inquirer questions.  

## bamazoncustomer.js
The bamazoncustomer.js file is used by a potential customer who is interested in purchasing a product at the store.  When run, the application requests the Id of the product and lists the products in the store catalog.   

![alt text](https://raw.githubusercontent.com/Samareimorgan/nodebamazon/master/images/customerjs%201.JPG "bamazoncustomer.js product list")

Once prompted, the customer can request the item to purchase and the number the client would like to buy.   The application then looks to see if there is enough stock.  If there is not enough stock a message indicating that appears. 

![alt text](https://raw.githubusercontent.com/Samareimorgan/nodebamazon/master/images/customerjs%202%20-%20insufficient.JPG "bamazoncustomer.js insufficent product")

However, if there is enough stock, then the application will verify the number and item requested, indicate it is in stock and calculate the amount of money owed by the customer. 

![alt text](https://raw.githubusercontent.com/Samareimorgan/nodebamazon/master/images/customerjs%20-%20in%20stock%20-%20commented%20out.JPG "bamazoncustomer.js sufficient product")

The code file has several commented out sections that acted as aids to confirm the database updates and the calculations were acting correctly.  Below is a photo of the cli when those pieces of code are no longer commented out. 

![alt text](https://raw.githubusercontent.com/Samareimorgan/nodebamazon/master/images/customerjs%20-%20in%20stock%20-%20commented%20out.JPG "bamazoncustomer.js uncommented code in stock")


## Install

#### Dependencies: mysql & inquirer modules

1. Please ensure node.js is installed 
2. Then install the following in order into the application folder: 
    npm install
    npm install mysql
    npm install inquirer
3. You are ready to open the application in the cli and run the application


## Credits
Thanks to University of Denver: Trilogy Coding Bootcamp Instructor Terra Taylor and Teaching Assistants Jacq and Evan for their assitance in this project.

## License 
MIT (c) SamareiMorgan