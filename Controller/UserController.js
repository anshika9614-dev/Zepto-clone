const User = require('../Models/UserModel');

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await User.create({ name, email, password });
    res.status(201).json({ message: 'data inserted', data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getByID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByPk(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByPk(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    await result.update(req.body);

    return res.status(200).json({
      message: 'User updated successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.findByPk(id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    await result.destroy();

    return res.status(200).json({
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { create, getAll, getByID, updateById, deleteById };
