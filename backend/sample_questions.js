const mongoose = require('mongoose');
const Question = require('./models/Question');

mongoose.connect('mongodb://127.0.0.1:27017/smart_interview').then(async () => {
  const samples = await Question.find().limit(20);
  console.log('Sample Questions:');
  samples.forEach((q, i) => {
    console.log(`\n--- Question ${i + 1} (${q.category} - ${q.difficulty}) ---`);
    console.log(`Text: ${q.questionText}`);
    console.log(`Options: ${q.options.join(', ')}`);
    console.log(`Correct: ${q.correctAnswer}`);
  });
  process.exit(0);
});
