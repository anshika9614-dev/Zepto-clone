const { DataTypes } = require('sequelize');              // Import the DataTypes object from Sequelize to define model attributes
const sequelize = require('../config/db');               // Import the Sequelize instance from the db.js file
const User = sequelize.define('User', {                  // Define the User model with its attributes
  id: {
    type: DataTypes.INTEGER,                              // Define the id attribute as an integer
    primaryKey: true,                                     // Set the id attribute as the primary key
    autoIncrement: true,                                  // Enable auto-increment for the id attribute
  },
  name: {
    type: DataTypes.STRING,                               // Define the name attribute as a string
    allowNull: false,                                     // Set the name attribute to not allow null values
  },
  email: {
    type: DataTypes.STRING,                               // Define the email attribute as a string
    allowNull: false,                                     // Set the email attribute to not allow null values
    unique: true,                                         // Set the email attribute to be unique
  },
  password: {
    type: DataTypes.STRING,                               // Define the password attribute as a string
    allowNull: false,                                     // Set the password attribute to not allow null values
  },
});

module.exports = User;                                    // Export the User model for use in other parts of the application