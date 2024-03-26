const jsonProducts = require('./products.json');
require('dotenv').config();
const connectDB = require('./db/connect');
const Product = require('./models/productModel');


const fs = require('fs');
const productsData = fs.readFileSync('products.json', 'utf-8');
const products = JSON.parse(productsData);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(products);
    console.log('Data import success');
    process.exit(0);
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
}

start();
