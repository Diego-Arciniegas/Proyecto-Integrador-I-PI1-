

DELIMITER  //
CREATE OR REPLACE PROCEDURE get_acessories(id_user INT, order_ VARCHAR(250), where_ VARCHAR(250))
BEGIN
	SET @sql_user = 'false';
	SET @sql_order = ' ';
	SET @sql_where = ' ';
	if id_user IS NOT NULL then
		SET @sql_user = CONCAT('fa.id_user=',id_user);
	END if;
	if order_ IS NOT NULL then
		SET @sql_order = CONCAT('ORDER BY ',order_);
	END if;
	if where_ IS NOT NULL then
		SET @sql_where = CONCAT('WHERE ',where_,' ');
	END if;
	
	SET @qery = CONCAT('SELECT a.id_accessory, a.name_accessory, a.description, a.price, a.stock, a.available, a.image_accesory_path, a.discount,	(SUM(case when ',@sql_user,' then 1 ELSE 0 END)) AS fav
	FROM favorite_accessories AS fa
	RIGHT JOIN accessories AS a ON a.id_accessory = fa.id_accessory ',
	@sql_where,
	'GROUP BY a.id_accessory ',
	@sql_order);
	PREPARE sql_acc FROM @qery;
	EXECUTE sql_acc;
	DEALLOCATE PREPARE sql_acc;
END;
//
DELIMITER ;



