const Student = require('../Models/StudentModel'); // Import the Student model from the StudentModel.js file

const createStudent = async (req, res) => {                    // Define an asynchronous function named create that takes in a request and response object
  const { name, email, rollNumber } = req.body;                              // Destructure name, email, and rollNumber from the request body

  try {
    const { name, email, rollNumber } = req.body;                             // Destructure name, email, and rollNumber from the request body
    const result = await Student.create({ name, email, rollNumber });            // Create a new user in the database using the User model
    res.status(201).json({ message: 'data inserted', data: result });       // Send a JSON response with the created user and a 201 status code
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });    // Send a JSON response with an error message and a 500 status code in case of an error
  }
}



module.exports = { createStudent };   