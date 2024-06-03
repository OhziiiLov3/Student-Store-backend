const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();



// Create Order
const createOrder = async (req, res) => {
  const { customerId, totalPrice, status, orderItems } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        customerId,
        totalPrice,
        status,
        },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Caluclate total price of an order 

const calculateOrderTotal = async (req, res) => {
  const { order_id } = req.params;

  try {
    // Find the order by its ID and include all associated order items
    const order = await prisma.order.findUnique({
      where: { order_id: parseInt(order_id) },
      include: { orderItems: true },
    });

    // Calculate total price by summing up the prices of all order items
    let totalPrice = 0;
    order.orderItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });

    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error("Error calculating order total:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order by Id

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { order_id: parseInt(id) },
      include: {
        orderItems: true, // Include associated order items
      },
    });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order
const updateOrder = async (req, res) => {
    const { id } = req.params;
    const { customerId, totalPrice, status } = req.body;
    try {
        const order = await prisma.order.update({
            where: { order_id: parseInt(id) },
            data: { customerId, totalPrice, status },
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await prisma.order.delete({
            where: { order_id: parseInt(id) },
        });
        res.json({ message: 'Order deleted', order });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addItemsToOrder = async (req, res) => {
  const { order_id } = req.params;
  const { product_id, quantity, price } = req.body;

  try {
    const order = await prisma.order.findUnique({
      where: { order_id: parseInt(order_id) },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const newOrderItem = await prisma.orderItem.create({
      data: {
        order_id: order.order_id,
        product_id,
        quantity,
        price,
      },
    });

    res.json(newOrderItem);
  } catch (error) {
    console.error("Error adding item to order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createOrder,
  calculateOrderTotal,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  addItemsToOrder
};
