const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();

const categories = [
  'java', 'python', 'c', 'cpp', 'javascript', 'sql', 
  'aptitude', 'mock interview', 'questions', 'soft skills'
];

const difficulties = ['easy', 'medium', 'hard'];

const generateQuestions = () => {
  const allQuestions = [];

  categories.forEach(category => {
    difficulties.forEach(difficulty => {
      for (let i = 1; i <= 100; i++) {
        const qNum = i;
        const options = [
          `Option A for ${category} ${difficulty} Q${qNum}`,
          `Option B for ${category} ${difficulty} Q${qNum}`,
          `Option C for ${category} ${difficulty} Q${qNum}`,
          `Option D for ${category} ${difficulty} Q${qNum}`
        ];
        const correctAnswer = options[0]; // For seeding, let's make A the correct one mostly, or randomize

        allQuestions.push({
          questionText: `What is the key concept of ${category} in the ${difficulty} level (Question #${qNum})?`,
          options: options,
          correctAnswer: correctAnswer,
          difficulty: difficulty,
          category: category,
          explanation: `This is a detailed explanation for ${category} ${difficulty} question number ${qNum}. It explains why ${correctAnswer} is correct.`
        });
      }
    });
  });

  return allQuestions;
};

const importData = async () => {
  try {
    await connectDB();
    
    console.log('Cleaning existing questions...');
    await Question.deleteMany();
    
    console.log('Generating 3000 questions...');
    const questions = generateQuestions();
    
    console.log('Inserting questions into database (this may take a moment)...');
    // Insert in batches to avoid memory issues
    const batchSize = 500;
    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      await Question.insertMany(batch);
      console.log(`Inserted ${i + batch.length} / ${questions.length} questions`);
    }

    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error('Error with data import:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  // Add delete functionality if needed
} else {
  importData();
}
