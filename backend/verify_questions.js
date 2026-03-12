const mongoose = require('mongoose');
const Question = require('./models/Question');

const mongoURI = 'mongodb://127.0.0.1:27017/smart_interview';

mongoose.connect(mongoURI).then(async () => {
  console.log('Connected to MongoDB');
  const counts = await Question.aggregate([
    {
      $group: {
        _id: { category: '$category', difficulty: '$difficulty' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.category': 1, '_id.difficulty': 1 }
    }
  ]);
  
  console.log('Question Distribution:');
  console.log(JSON.stringify(counts, null, 2));
  
  const totalQuestions = await Question.countDocuments();
  console.log('Total Questions:', totalQuestions);
  
  process.exit(0);
}).catch(err => {
  console.error('Connection error:', err);
  process.exit(1);
});
