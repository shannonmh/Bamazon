DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(30) NOT NULL,
    price INT NOT NULL,
    stock_quality INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Bob's Burgers Comic Books", "Books", 15, 100);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Puppies: the best thing in the world", "Perfection", 1000, 10);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Strawberry Kiwi ICE", "Drinks", 2, 12);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Fudge Cake Pops", "Food", 5, 25);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Westworld Season 1", "DVD", 22, 75);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Agate Geode Coasters", "Home Decor", 25, 100);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Self Watering Plant Water Bulbs", "Garden", 8, 10);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Cute Marshmallow Shaped Mugs", "Kitchen", 40, 50);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Basic Witches: How to Summon Success, Banish Drama, and Raise Hell with your Coven", "Books", 14, 50);

INSERT INTO products (product_name, department_name, price, stock_quality) VALUES ("Be the Person Your Dog Thinks You Are Pillow", "Home Decor", 18, 20);