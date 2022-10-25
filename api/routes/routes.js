const router = require('express').Router();
const c = require('../controllers/controllers.js');

router.route('/login').post(c.users.login);
router.route('/register').post(c.users.register);
router.route('/auth').post(c.users.auth);
router.route('/restore').post(c.users.restorePassword);

router.route('/users').get(c.users.getUser);
router.route('/users/:id_user').get(c.users.getUser);
router.route('/users/:id_user').post(c.users.editUser);
router.route('/users/:id_user/address').post(c.address.addAddressUser);
router.route('/users/:id_user/address').get(c.address.getAddress);
router.route('/users/:id_user/address').put(c.address.editAddress);
router.route('/users/:id_user/address').delete(c.address.deleteAddress);
router.route('/users/:id_user/shopping_cart').post(c.shoppingCart.addShoppingCart);
router.route('/users/:id_user/shopping_cart/order').post(c.orders.addOrder);
router.route('/users/:id_user/shopping_cart').get(c.shoppingCart.getShoppingCart);
router.route('/users/:id_user/shopping_cart').delete(c.shoppingCart.deleteShoppingCart);
router.route('/users/:id_user/shopping_cart/accessories').get(c.shoppingCart.getShoppingCartAccesories);
router.route('/users/:id_user/shopping_cart/accessories/:id_accessory').get(c.shoppingCart.getOneShoppingCartAccesory);
router.route('/users/:id_user/shopping_cart/accessories/:id_accessory').post(c.shoppingCart.addAccessory);
router.route('/users/:id_user/shopping_cart/accessories/:id_accessory').delete(c.shoppingCart.deleteAccesory);
router.route('/users/:id_user/orders').get(c.orders.getOrder);
router.route('/users/:id_user/orders/:id_order').get(c.orders.getOneOrder);
router.route('/users/:id_user/orders/:id_order').delete(c.orders.deleteOrderFromUser);
router.route('/users/:id_user/favorites').get(c.favorites.getFavorites);
router.route('/users/:id_user/favorites/:id_accessory').post(c.favorites.addFavorites);
router.route('/users/:id_user/favorites/:id_accessory').delete(c.favorites.deleteFavorites);

router.route('/accessories').get(c.accessories.getAccessories);
router.route('/accessories').post(c.accessories.addAccessories);
router.route('/accessories/price_history').get(c.accessories.getAccessoriesPriceHistory);
router.route('/accessories/movement_history').get(c.accessories.getAccessoriesMovementHistory);
router.route('/accessories/:id_accessory').get(c.accessories.getOneAccessory);
router.route('/accessories/:id_accessory').put(c.accessories.editAccessory);
router.route('/accessories/:id_accessory').delete(c.accessories.deleteAccessory);

router.route('/orders').get(c.orders.getOrder);
router.route('/orders/:id_order').get(c.orders.getOneOrder);
router.route('/orders/:id_order').delete(c.orders.deleteOrder);

router.route('/saved').get(c.accessories.savexd);

module.exports = router;


