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


module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
