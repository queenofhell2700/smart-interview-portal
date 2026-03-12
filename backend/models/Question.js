const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true,
  },
  options: {
    type: [String],
    required: true,
    validate: [array => array.length === 4, 'Options must have exactly 4 items']
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['easy', 'medium', 'hard'],
  },
  category: {
    type: String,
    required: true,
    // Including all required categories
    enum: ['java', 'python', 'c', 'cpp', 'javascript', 'sql', 'aptitude', 'mock interview', 'questions', 'soft skills'],
  },
  explanation: {
    type: String,
    default: '',
  }
}, {
  timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
