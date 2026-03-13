const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const User = require('./models/User');

require("dotenv").config();

// Load env vars
dotenv.config();
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@nexus.com' });

    if (!adminExists) {
      await User.create({
        name: 'System Administrator',
        email: 'admin@nexus.com',
        password: 'adminpassword123',
        role: 'admin'
      });

      console.log('Default admin created: admin@nexus.com');
    }
    console.log(await User.find());
  } catch (error) {
    console.log('Admin creation error:', error.message);
  }
};
// Connect to database
connectDB();

createDefaultAdmin();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/questions', questionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Smart Interview Preparation API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
