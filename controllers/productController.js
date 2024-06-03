const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  const { name, description, price, image_url, category } = req.body;
  console.log(req.body);
  try {
    const product = await prisma.product.create({
      data: { name, description, price, image_url, category },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getProducts = async (req, res) => {
  // add filter and sort query paramters
  const { sort, category } = req.query;

  let filters = {};
  if (category) {
    filters.category = category;
  }

  let orderBy = {};
  if (sort === "price") {
    orderBy.price = "asc";
  } else if (sort === "name") {
    orderBy.name = "asc";
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: Object.keys(orderBy).length ? orderBy : undefined,
    });
    res.json(products);
    console.log(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      
    });
    res.json(product);
  } catch (error) {
    res.staus(500).json({ error: message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image_url, category } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: { name, description, price, image_url, category },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json(product);
  } catch (error) {
    res.staus(500).json({ error: message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
