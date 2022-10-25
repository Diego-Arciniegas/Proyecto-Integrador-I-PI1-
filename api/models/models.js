const Accessories = require('./models/Accessories.js');
const Order_accessories = require('./models/Order_accessories.js');
const Orders = require('./models/Orders.js');
const Payment_methods = require('./models/Payment_methods.js');
const Shopping_cart_accessories = require('./models/Shopping_cart_accessories.js');
const Shopping_carts = require('./models/Shopping_carts.js');
const User_types = require('./models/User_types.js');
const Users = require('./models/Users.js');
const Accessories_movement_history = require('./models/Accessories_movement_history.js');
const Accessories_price_history = require('./models/Accessories_price_history.js');
const Favorite_accessories = require('./models/Favorite_accessories.js');


Accessories.belongsToMany(Orders, {
    through: Order_accessories,
    foreignKey: 'id_accessory'
});
Orders.belongsToMany(Accessories, {
    through: Order_accessories,
    foreignKey: 'id_order'
});

Orders.belongsTo(Payment_methods, {foreignKey: 'id_payment_method'});
Orders.belongsTo(Users, {foreignKey: 'id_user'});

Accessories.belongsToMany(Shopping_carts, {
    through: Shopping_cart_accessories,
    foreignKey: 'id_accessory'
});
Shopping_carts.belongsToMany(Accessories, {
    through: Shopping_cart_accessories,
    foreignKey: 'id_shopping_cart'
});

Users.belongsTo(User_types, {foreignKey: 'id_user_type'});

Shopping_carts.belongsTo(Users, {foreignKey: 'id_shopping_cart'});
Users.hasMany(Shopping_carts, {foreignKey: 'id_shopping_cart'});

Accessories_movement_history.belongsTo(Accessories, {foreignKey: 'id_accessory'});
Accessories_movement_history.belongsTo(Users, {foreignKey: 'id_responsible_user'});

Accessories_price_history.belongsTo(Accessories, {foreignKey: 'id_accessory'});
Accessories_price_history.belongsTo(Users, {foreignKey: 'id_responsible_user'});

Accessories.hasMany(Favorite_accessories, {foreignKey: 'id_accessory'});

module.exports = {
    Accessories,
    Order_accessories,
    Orders,
    Payment_methods,
    Shopping_cart_accessories,
    Shopping_carts,
    User_types,
    Users,
    Accessories_price_history,
    Accessories_movement_history,
    Favorite_accessories
}

