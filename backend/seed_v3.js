const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/career_pro');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const categories = [
  { id: 'java', name: 'Java' },
  { id: 'python', name: 'Python' },
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'javascript', name: 'JavaScript' },
  { id: 'sql', name: 'SQL' },
  { id: 'aptitude', name: 'Aptitude' },
  { id: 'mock-interview', name: 'Mock Interview' },
  { id: 'questions', name: 'Questions' },
  { id: 'soft-skills', name: 'Soft Skills' }
];

const difficulties = ['easy', 'medium', 'hard'];

const generateQuestions = () => {
  const allQuestions = [];
  
  const seedCategories = [
    { id: 'java', name: 'Java' },
    { id: 'python', name: 'Python' },
    { id: 'c', name: 'C' },
    { id: 'cpp', name: 'C++' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'sql', name: 'SQL' },
    { id: 'aptitude', name: 'Aptitude' },
    { id: 'mock interview', name: 'Mock Interview' },
    { id: 'questions', name: 'Questions' },
    { id: 'soft skills', name: 'Soft Skills' }
  ];

  seedCategories.forEach(cat => {
    difficulties.forEach(diff => {
      // 100 questions per level per category
      for (let i = 1; i <= 100; i++) {
        const options = [
          `Primary ${cat.name} principle for ${diff} level`,
          `Secondary ${cat.name} implementation strategy`,
          `Advanced ${cat.name} optimization technique`,
          `None of the above`
        ];
        const correctCharIndex = Math.floor(Math.random() * 4);
        
        const questionObj = {
          questionText: `${cat.name} ${diff} Level Assessment (#${i}): Which of the following is correct?`,
          options: options,
          correctAnswer: options[correctCharIndex],
          category: cat.id,
          difficulty: diff,
          explanation: `This concept is essential for mastering ${cat.name} at the ${diff} level in professional environments.`
        };
        allQuestions.push(questionObj);
      }
    });
  });
  
  return allQuestions;
};

const importData = async () => {
  try {
    await Question.deleteMany();
    
    const questions = generateQuestions();
    console.log(`Generated ${questions.length} questions. Starting import...`);
    
    // Breaking into chunks to avoid memory issues
    const chunkSize = 100;
    for (let i = 0; i < questions.length; i += chunkSize) {
      const chunk = questions.slice(i, i + chunkSize);
      await Question.insertMany(chunk);
      console.log(`Imported ${i + chunk.length}/${questions.length}...`);
    }

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

connectDB().then(importData);
