
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
	itemID INTEGER(5) AUTO_INCREMENT NOT NULL,
	productName VARCHAR(25) NOT NULL,
	dept VARCHAR(15) NOT NULL,
	price DECIMAL(10,4) NOT NULL,
	stockQuantity INTEGER(5) DEFAULT 0,
	PRIMARY KEY(itemID) 
	);
	
	SELECT * FROM products;


USE bamazon;
CREATE TABLE departments(
	deptID INTEGER AUTO_INCREMENT NOT NULL,
	dept VARCHAR(15) NOT NULL,
	overHeadCosts FLOAT(10,2) NOT NULL,
	totalSales FLOAT(10,2) ,
	PRIMARY KEY (deptID)
	);
SELECT * FROM departments;

INSERT INTO departments(dept,overHeadCosts)
VALUES('Toys','500');
INSERT INTO departments(dept,overHeadCosts)
VALUES('Electronics','200'),('HomeFurniture',1000),('Clothing',100);
