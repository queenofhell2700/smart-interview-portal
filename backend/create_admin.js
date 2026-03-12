/*const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_interview');
    
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      console.log('Admin already exists:', adminExists.email);
    } else {
      const admin = await User.create({
        name: 'System Administrator',
        email: 'admin@nexus.com',
        password: 'adminpassword123',
        role: 'admin'
      });
      console.log('Admin created successfully:', admin.email);
    }
    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin(); */


const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_interview');

    // check admin by email instead of role
    const adminExists = await User.findOne({ email: 'admin@nexus.com' });

    if (adminExists) {
      console.log('Admin already exists:', adminExists.email);
    } else {
      const admin = await User.create({
        name: 'System Administrator',
        email: 'admin@nexus.com',
        password: 'adminpassword123',
        role: 'admin'
      });

      console.log('Admin created successfully:', admin.email);
    }

    process.exit();
  } catch (error) {
    console.error('Error creating admin:', error.message);
    process.exit(1);
  }
};

createAdmin();