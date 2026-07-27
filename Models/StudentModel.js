const { DataTypes } = require('sequelize'); // Import the DataTypes object from Sequelize to define model attributes
const sequelize = require('../config/db'); // Import the Sequelize instance from the db.js file
const Student = sequelize.define('Student', { // Define the Student model with its attributes
  id: {
    type: DataTypes.INTEGER, // Define the id attribute as an integer
    primaryKey: true, // Set the id attribute as the primary key
    autoIncrement: true, // Set the id attribute to auto-increment
  },
  name: {
    type: DataTypes.STRING, // Define the name attribute as a string
    allowNull: false, // Set the name attribute to not allow null values
  },
  email: {
    type: DataTypes.STRING, // Define the email attribute as a string
    allowNull: false, // Set the email attribute to not allow null values
    unique: true, // Set the email attribute to be unique
  },
  rollNumber: {
    type: DataTypes.INTEGER, // Define the rollNumber attribute as an integer
    allowNull: false, // Set the rollNumber attribute to not allow null values
    unique: true, // Set the rollNumber attribute to be unique
  },
});
module.exports = Student; // Export the Student model for use in other parts of the application