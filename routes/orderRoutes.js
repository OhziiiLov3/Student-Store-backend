const express = require("express");
const router = express.Router();
const orderController = require('../controllers/orderController');


router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getAllOrders);
router.get('/orders/:id', orderController.getOrderById);
router.put('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
// custom end points 

router.post("/orders/:order_id/items", orderController.addItemsToOrder);
router.get("/orders/:order_id/total", orderController.calculateOrderTotal);


module.exports = router;