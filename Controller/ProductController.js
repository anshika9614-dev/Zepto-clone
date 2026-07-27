const Product = require('../Models/ProductModel');

// Create a product in the database.
const create = async (req, res) => {
  try {
    const result = await Product.create(req.body);
    res.status(201).json({ message: 'Product inserted', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch all products from the database.
const getAll = async (req, res) => {
  try {
    const result = await Product.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { create, getAll };
