

INSERT INTO user_types VALUES(1, "cliente", "cliente");
INSERT INTO user_types VALUES(2, "admin", "admin");

INSERT INTO user_status VALUES(1, "active");
INSERT INTO user_status VALUES(2, "unactive");

INSERT INTO accesorios.payment_methods(id_payment_method,name_payment, description) VALUES (1,"paypal", "paypal");
INSERT INTO accesorios.payment_methods(id_payment_method,name_payment, description) VALUES (2,"nequi", "nequi");
INSERT INTO accesorios.payment_methods(id_payment_method,name_payment, description) VALUES (3,"efecty", "efecty");
INSERT INTO accesorios.payment_methods(id_payment_method,name_payment, description) VALUES (4,"visa", "visa");
INSERT INTO accesorios.payment_methods(id_payment_method,name_payment, description) VALUES (5,"mastercard", "mastercard");


INSERT INTO accesorios.movement_types(id_movement_type, description) VALUES (1, "Abastecimiento");
INSERT INTO accesorios.movement_types(id_movement_type, description) VALUES (2, "Venta");
INSERT INTO accesorios.movement_types(id_movement_type, description) VALUES (3, "Devolucion usuario");
INSERT INTO accesorios.movement_types(id_movement_type, description) VALUES (4, "Devolucion fabricante");
