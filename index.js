import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('<h1>Store Manager API</h1>');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


