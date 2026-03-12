const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://127.0.0.1:27017/smart_interview').then(async () => {
  const categories = await Question.distinct('category');
  console.log('Categories:', categories);
  const counts = await Question.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  console.log('Counts:', JSON.stringify(counts, null, 2));
  process.exit(0);
});
