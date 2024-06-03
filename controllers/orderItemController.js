const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrderItem = async (req, res) => {
  const { orderId, productId, quantity, price } = req.body;
console.log(req.body);
  // Validate request body
  if (!orderId || !productId || !quantity || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the order item and associate it with the order
    const orderItem = await prisma.orderItem.create({
        // Connect to the order by its ID
      data: {
        quantity,
        price,
       // Connect to the order by its ID
        order: { connect: { order_id: orderId } },
        // Connect to the product by its ID
        product: { connect: { id: productId } }
      },
    });

    // Log the created order item
    console.log("Created order item:", orderItem);

    res.json(orderItem);
  } catch (error) {
    console.error("Error creating order item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



// Get All Order Items
const getOrderItems = async (req, res) => {
  try {
    const orderItems = await prisma.orderItem.findMany();
    res.json(orderItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Order Item by ID
const getOrderItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: { order_item_id: parseInt(id) },
    });
    if (orderItem) {
      res.json(orderItem);
    } else {
      res.status(404).json({ error: "Order item not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Order Item
const updateOrderItem = async (req, res) => {
  const { id } = req.params;
  const { orderId, productId, quantity, price } = req.body;
  try {
    const orderItem = await prisma.orderItem.update({
      where: { order_item_id: parseInt(id) },
      data: { orderId, productId, quantity, price },
    });
    res.json(orderItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Order Item
const deleteOrderItem = async (req, res) => {
  const { id } = req.params;
  try {
    const orderItem = await prisma.orderItem.delete({
      where: { order_item_id: parseInt(id) },
    });
    res.json({ message: "Order item deleted", orderItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
