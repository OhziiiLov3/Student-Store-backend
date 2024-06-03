const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const createProduct = async  (req,res)=>{
 const {name, description, price, image_url, category} = req.body;
 console.log(req.body)
 try{
    const product = await prisma.product.create({
        data: { name, description, price, image_url, category},
    });
    res.json(product);
    console.log("Post")
 }catch(error){
    res.status(500).json({error: error.message});
 }
}


const getProducts = async (req,res)=>{
try{
 const products = await prisma.product.findMany();
 res.json(products);
 console.log(products);
}catch(error){
    res.status(500).json({error: error.message})
}
}




module.exports = {
    createProduct,
    getProducts,
}