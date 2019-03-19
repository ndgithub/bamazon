DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price FLOAT(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products 
	(product_name,department_name,price,stock_quantity)
VALUES
	("Laundry Detergent","Cleaning",3.99,10),
    ("Dish Soap","Cleaning",2.99,10),
    ("Broom","Cleaning",7.99,10),
    ("Bread","Food",0.99,10),
    ("Cereal","Food",3.99,10),
    ("Hot Pockets","Food",3.75,10),
    ("Headphones","Electronics",74.99,10),
    ("Computer","Electronics",829.00,10),
    ("TV","Electronics",3.99,10),
	("Speakers","Electronics",3.99,10);
