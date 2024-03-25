import express from 'express';
import mongoose from 'mongoose';
import connectDB from './db/connect.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error-handler.js';
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