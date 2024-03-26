const asyncWrapper = require('../middleware/async.js');
const Product = require('../models/productModel.js');


// search
const getAllProductsStatic = asyncWrapper( async (req, res) => {
  const search = 'ab';
  const products = await Product.find({
    name: { $regex: search, $options: 'i'}
  });
  res.status(200).json({ products , nbHits: products.length });
})


// sort
const getAllProductsStatic2 = asyncWrapper( async (req, res) => {

  const products = await Product.find({}).sort('-name price').select('name price');
  res.status(200).json({ products , nbHits: products.length });
})


// limit, skip, page
const getAllProductsStatic3 = asyncWrapper( async (req, res) => {

  const products = await Product.find({})
    .sort('name price')
    .select('name price')
    .limit(5)
    .skip(1);
  res.status(200).json({ products , nbHits: products.length });
})



// numeric filters
const getAllProductsStatic4 = asyncWrapper( async (req, res) => {

  const products = await Product.find({price: { $gt: 30 }})
    .sort('price')
    .select('name price')
    .limit(30)
    .skip(0);
  res.status(200).json({ products , nbHits: products.length });
})



const getAllProducts = asyncWrapper( async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // query
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
  

  // numericFilters
  if(numericFilters){
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx, 
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log(queryObject);
  }

  let result = Product.find(queryObject);

  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  }else{
    result = result.sort('createdAt');
  }

  // fields
  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  // limit
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  //console.log('skip:', skip, 'limit:', limit);
  result = result.skip(skip).limit(limit);
  const products = await result;
  res.status(200).json({ products , nbHits: products.length });
})


module.exports = {
  getAllProducts,
  getAllProductsStatic,
  getAllProductsStatic2,
  getAllProductsStatic3,
  getAllProductsStatic4
};