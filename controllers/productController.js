const asyncWrapper = require('../middleware/async.js');
const Product = require('../models/productModel.js');

const getAllProductsStatic = asyncWrapper( async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: { $regex: search, $options: 'i'}
  });
  res.status(200).json({ products , nbHits: products.length });
})


const getAllProducts = asyncWrapper( async (req, res) => {
  const { featured, company, name } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i'};
  }
  console.log(queryObject);
  const products = await Product.find(queryObject);
  res.status(200).json({ products , nbHits: products.length });
})


module.exports = {
  getAllProducts,
  getAllProductsStatic
};