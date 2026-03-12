const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./models/Question');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const languages = ['java', 'python', 'cpp', 'c', 'javascript', 'sql'];
const categories = ['aptitude', 'mock-interview', 'questions', 'soft-skills'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const generateQuestions = () => {
  const allQuestions = [];

  // Programming Questions (30 per level per language)
  languages.forEach(lang => {
    difficulties.forEach(diff => {
      for (let i = 1; i <= 30; i++) {
        allQuestions.push({
          title: `${lang.toUpperCase()} ${diff} Challenge #${i}`,
          category: lang,
          difficulty: diff,
          description: `This is a comprehensive ${diff} level question for ${lang}. Question number ${i}.`,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctOption: Math.floor(Math.random() * 4),
          solution: `Steps to solve ${lang} ${diff} Q${i}:\n1. Analyze input\n2. Design algorithm\n3. Optimize space complexity\n4. Final implementation.`
        });
      }
    });
  });

  // Other Categories (30 per level)
  categories.forEach(cat => {
    difficulties.forEach(diff => {
      for (let i = 1; i <= 30; i++) {
        allQuestions.push({
          title: `${cat.replace('-', ' ').toUpperCase()} ${diff} Quiz #${i}`,
          category: cat,
          difficulty: diff,
          description: `Advanced ${diff} level challenge for ${cat}. Assessment path #${i}.`,
          options: ['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4'],
          correctOption: Math.floor(Math.random() * 4),
          solution: `Detailed breakdown for ${cat} ${diff} #${i}: Evaluation of key principles and methodology.`
        });
      }
    });
  });

  return allQuestions;
};

const importData = async () => {
  try {
    const questions = generateQuestions();
    await Question.deleteMany();
    await Question.insertMany(questions);
    console.log(`Successfully imported ${questions.length} questions!`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
