const express = require('express');
const connectDB = require('./db/connect');
const productRoutes = require('./routes/productRoutes.js');
const dotenv = require('dotenv');
const notFoundMiddleware = require('./middleware/not-found.js');
const errorMiddleware = require('./middleware/error-handler.js');
require('express-async-errors');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongodb_connect = process.env.MONGO_URI;

// middleware
app.use(express.json());


// Routes
app.use('/api/products', productRoutes);


app.use(notFoundMiddleware);
app.use(errorMiddleware);


app.get('/', (req, res) => {
  res.send('<h1>Store Manager API</h1>');
});




const start = async () => {
  try {
    await connectDB(mongodb_connect);
    app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}

start();