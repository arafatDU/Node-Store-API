import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongodb_connect = process.env.MONGO_URI;

// middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Store Manager API</h1>');
});




mongoose.connect(mongodb_connect)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });