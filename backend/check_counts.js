const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const checkCounts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_interview');
    const total = await Question.countDocuments();
    console.log(`Total questions in database: ${total}`);
    
    const categories = await Question.distinct('category');
    for (const cat of categories) {
      const count = await Question.countDocuments({ category: cat });
      console.log(`- ${cat}: ${count}`);
    }
    
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkCounts();
