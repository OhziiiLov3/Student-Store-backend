const express = require('express');
const app = express();
const cors = require("cors");
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderItemsRoutes = require('./routes/orderItemsRoutes');

const PORT = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());



// Test route
// app.get('/', (req, res)=>{
//     res.send("Hello World");
// })

// Routers to api
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderItemsRoutes);






app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
})