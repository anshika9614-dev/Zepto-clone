const cors = require('cors');
const express = require('express');
const sequelize = require('./config/db');
const User = require('./Models/UserModel');
const studentRoutes = require('./Routes/StudentRoutes');
const userRoutes = require('./Routes/UserRoutes');
const productRoutes = require('./Routes/ProductRoutes');

const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/products', productRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced..');
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log('Error in database connection:', err);
  });


