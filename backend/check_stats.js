const mongoose = require('mongoose');
require('dotenv').config();

const questionSchema = new mongoose.Schema({
  title: String,
  category: String,
  difficulty: String,
  description: String,
  solution: String,
  questionType: String,
  starterCode: String
});

const Question = mongoose.model('Question', questionSchema);

async function checkStats() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smart_interview');
    const stats = await Question.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    console.log(JSON.stringify(stats, null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
}

checkStats();
