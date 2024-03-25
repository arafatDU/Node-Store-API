const getAllProducts = async (req, res) => {
  try {
    res.json('All products');
  } catch (error) { 
    res.status(500).json({ message: error });
  }
};


export { getAllProducts };