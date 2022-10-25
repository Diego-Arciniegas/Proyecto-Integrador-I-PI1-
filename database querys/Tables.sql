drop database if exists accesorios;
create database accesorios;
use accesorios; 

CREATE TABLE accessories(
	id_accessory INT PRIMARY KEY AUTO_INCREMENT,
	name_accessory TEXT not NULL,
	description TEXT,
	price INT NOT NULL,
	stock INT NOT NULL,
	available BOOL NOT NULL,
	image_accesory_path VARCHAR(255) NOT NULL,
	discount INT NOT NULL
);

ALTER TABLE accessories CONVERT TO CHARACTER SET UTF8;

CREATE TABLE payment_methods(
	id_payment_method INT PRIMARY KEY AUTO_INCREMENT,
	name_payment varchar(120) NOT NULL,
	description text
);

CREATE TABLE user_types(
	id_user_type INT PRIMARY KEY NOT NULL,
	name_user_type VARCHAR(255) NOT NULL,
	description TEXT
);

CREATE TABLE user_status(
	id_user_status INT PRIMARY KEY NOT NULL,
	description VARCHAR(255) NOT NULL
);

CREATE TABLE users(
	id_user INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(255),
	second_name VARCHAR(255),
	name_user VARCHAR(255) NOT NULL,
	identification INT NOT NULL,
	email VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	date_creation DATETIME NOT NULL,
	number_phone INT NOT NULL,
	id_user_type INT NOT NULL,
    id_user_status INT NOT NULL,
    password VARCHAR (255) NOT NULL,
	FOREIGN KEY (id_user_type) REFERENCES user_types(id_user_type),
    FOREIGN KEY (id_user_status) REFERENCES user_status(id_user_status)
);

CREATE TABLE shopping_carts(
	id_shopping_cart INT PRIMARY KEY AUTO_INCREMENT,
	date_creation DATETIME NOT NULL,
	id_user INT NOT NULL,
	FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE shopping_cart_accessories(
	id_shopping_cart_accessories INT PRIMARY KEY AUTO_INCREMENT,
	id_shopping_cart INT NOT NULL,
	id_accessory INT NOT NULL,
	quantity INT NOT NULL,
	FOREIGN KEY (id_shopping_cart) REFERENCES shopping_carts(id_shopping_cart),
	FOREIGN KEY (id_accessory) REFERENCES accessories(id_accessory)
);

CREATE TABLE orders(
	id_order INT PRIMARY KEY AUTO_INCREMENT,
	price INT NOT NULL,
	discount INT NOT NULL,
	tax INT NOT NULL,
	total_price INT NOT NULL,
	quantity INT NOT NULL,
	date_creation DATETIME NOT NULL,
	date_deliver DATETIME NOT NULL,
	id_payment_method INT NOT NULL,
	id_user INT NOT NULL,
	returned BOOL NOT NULL DEFAULT FALSE,
	address VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_payment_method) REFERENCES payment_methods(id_payment_method),
	FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE order_accessories(
	id_order_accessories INT PRIMARY KEY AUTO_INCREMENT,
	id_order INT NOT NULL,
	id_accessory INT NOT NULL,
	quantity INT NOT NULL,
	FOREIGN KEY (id_order) REFERENCES orders(id_order),
	FOREIGN KEY (id_accessory) REFERENCES accessories(id_accessory)
);

create table movement_types(
	id_movement_type int primary key not null,
    description varchar(255)
);

CREATE TABLE accessories_movement_history(
	id_accessory_movement_history INT PRIMARY KEY AUTO_INCREMENT,
	id_accessory INT NOT NULL,
	quantity INT NOT NULL,
	value INT NOT NULL,
	date_movement DATETIME NOT NULL,
	id_responsible_user INT NOT NULL,
	id_movement_type INT NOT NULL,
	since VARCHAR(255) NOT NULL,
	towards VARCHAR(255) NOT NULL,
	FOREIGN KEY (id_accessory) REFERENCES accessories(id_accessory),
	FOREIGN KEY (id_responsible_user) REFERENCES users(id_user),
	FOREIGN KEY (id_movement_type) REFERENCES movement_types(id_movement_type)
);

CREATE TABLE accessories_price_history(
	id_accessories_price_history INT PRIMARY KEY AUTO_INCREMENT,
	id_accessory INT NOT NULL,
	old_price INT NOT NULL,
	new_price INT NOT NULL,
	id_responsible_user INT NOT NULL,
	modified_date DATETIME NOT NULL,
	FOREIGN KEY (id_accessory) REFERENCES accessories(id_accessory),
	FOREIGN KEY (id_responsible_user) REFERENCES users(id_user)
);

CREATE TABLE favorite_accessories(
	id_favorite_accessories INT PRIMARY KEY AUTO_INCREMENT,
	id_user INT NOT NULL,
	id_accessory INT NOT NULL,
	FOREIGN KEY (id_user) REFERENCES users(id_user),
	FOREIGN KEY (id_accessory) REFERENCES accessories(id_accessory) 
);







