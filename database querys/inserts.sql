
/*
INSERT INTO user_types VALUES(1, "cliente", "cliente");
INSERT INTO user_types VALUES(2, "vendedor", "vendedor");
INSERT INTO user_types VALUES(3, "admin", "admin");

INSERT INTO user_status VALUES(1, "active");
INSERT INTO user_status VALUES(2, "unactive");

INSERT INTO users(name_user, identification, email, date_creation, number_phone, id_user_type, id_user_status, password)
	VALUES ("diegomated", 1001369364, "diegodaco08@gmail.com", "2022-08-08 03:21:51" ,6363636, 1, 1, "$2b$10$zL7xT9zCG9Nv/P/yqTt1KuCebGlvSxETZIrp5I3pGK2yuE4CaemAq");

INSERT INTO address(address_1, city, country, postal_code, id_user)
	VALUES ("carrera 5 occ #29-40", "bucaramanga", "colombia", 680001, 1);
	
INSERT INTO shopping_carts(total_price, quantity, date_creation, id_user)
	VALUES (0, 0, "2022-08-08 03:21:51", 1);

INSERT INTO business(name_business, id_address, number_phone, email) VALUES 
	 ("toyota", 1, 6363636, "toyota@toyota.com"),
	 ("chevrolet", 1, 6363637, "chevrolet@chevrolet.com"),
	 ("reanult", 1, 6363638, "reanult@reanult.com"),
	 ("wolsvaguen", 1, 6363639, "wolsvaguen@wolsvaguen.com"),
	 ("ferrari", 1, 6363640, "ferrari@ferrari.com");

INSERT INTO car_models(name_car_model, description) VALUES
	("modelo 1", "modelo 1");

INSERT INTO accessories(name_accessory, description, price, stock, available, image_accesory_path, id_car_model, id_business) values
	("toyota acc 1", "toyota acc 1", 12500, 10, 1, "here", 1, 1),
	("toyota acc 2", "toyota acc 2", 25700, 15, 1, "here", 1, 1),
	("toyota acc 3", "toyota acc 3", 64000, 13, 1, "here", 1, 1),
	("chevrolet acc 1", "chevrolet acc 1", 12500, 10, 1, "here", 1, 2),
	("chevrolet acc 2", "chevrolet acc 2", 13000, 43, 1, "here", 1, 2),
	("chevrolet acc 3", "chevrolet acc 3", 7500, 74, 1, "here", 1, 2),
	("reanult acc 1", "reanult acc 1", 125700, 10, 1, "here", 1, 3),
	("reanult acc 2", "reanult acc 2", 27500, 45, 1, "here", 1, 3),
	("reanult acc 3", "reanult acc 3", 5700, 17, 1, "here", 1, 3),
	("wolsvaguen acc 1", "wolsvaguen acc 1", 64000, 32, 1, "here", 1, 4),
	("wolsvaguen acc 2", "wolsvaguen acc 2", 32000, 16, 1, "here", 1, 4),
	("wolsvaguen acc 3", "wolsvaguen acc 3", 16000, 9, 1, "here", 1, 4),
	("ferrari acc 1", "ferrari acc 1", 145000, 5, 1, "here", 1, 5),
	("ferrari acc 2", "ferrari acc 2", 345000, 5, 1, "here", 1, 5),
	("ferrari acc 3", "ferrari acc 3", 75000, 5, 1, "here", 1, 5);
		

INSERT INTO accesorios.payment_methods(name_payment, description) VALUES ("paypal", "paypal");
INSERT INTO accesorios.payment_methods(name_payment, description) VALUES ("nequi", "nequi");
INSERT INTO accesorios.payment_methods(name_payment, description) VALUES ("efecty", "efecty");
INSERT INTO accesorios.payment_methods(name_payment, description) VALUES ("visa", "visa");
INSERT INTO accesorios.payment_methods(name_payment, description) VALUES ("mastercard", "mastercard");

*/


	