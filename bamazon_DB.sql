CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
item_id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price DECIMAL(10,2) NULL,
stock_quantity INT(6),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Boxing Gloves", "Sports Equipment", "55.00", "6");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Shredder", "Office Equipment", "78.99", "3");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kitchen Aid Mixer", "Kitchen", "115.00", "9");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamazon T-shirt", "Clothing", "29.50", "11");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Peanut Butter M&Ms", "Candy", "3.99", "32");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pillow", "Bedding", "15.00", "16");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fly fishing rod", "Sports Equipment", "103.49", "4");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dell Laptop", "Computers", "789.00", "5");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Acoustic Guitar", "Music", "258.00", "8");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Into Thin Air", "Books", "24.99", "7");

SELECT * FROM products;


