const Question = require('../models/Question');

// @desc    Get all questions (with optional filtering)
// @route   GET /api/questions
// @access  Public
const getQuestions = async (req, res) => {
  try {
    const { category, difficulty, limit } = req.query;

    // Build query object
    let query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    let questionsQuery = Question.find(query).sort({ createdAt: -1 });
    
    if (limit) {
      questionsQuery = questionsQuery.limit(parseInt(limit));
    }

    const questions = await questionsQuery;
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get single question by ID
// @route   GET /api/questions/:id
// @access  Public
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      res.json(question);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new question
// @route   POST /api/questions
// @access  Private/Admin
const createQuestion = async (req, res) => {
  try {
    const { questionText, options, correctAnswer, difficulty, category, explanation } = req.body;
    
    const question = await Question.create({
      questionText,
      options,
      correctAnswer,
      difficulty,
      category,
      explanation
    });

    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a question
// @route   PUT /api/questions/:id
// @access  Private/Admin
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      question.questionText = req.body.questionText || question.questionText;
      question.options = req.body.options || question.options;
      question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
      question.difficulty = req.body.difficulty || question.difficulty;
      question.category = req.body.category || question.category;
      question.explanation = req.body.explanation || question.explanation;

      const updatedQuestion = await question.save();
      res.json(updatedQuestion);
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a question
// @route   DELETE /api/questions/:id
// @access  Private/Admin
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (question) {
      await question.deleteOne();
      res.json({ message: 'Question removed' });
    } else {
      res.status(404).json({ message: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bulk upload questions
// @route   POST /api/questions/bulk
// @access  Private/Admin
const bulkUploadQuestions = async (req, res) => {
  try {
    const questions = req.body; // Array of questions
    if (!Array.isArray(questions)) {
      return res.status(400).json({ message: 'Data must be an array of questions' });
    }
    
    const importedQuestions = await Question.insertMany(questions);
    res.status(201).json({ count: importedQuestions.length });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get question counts by category
// @route   GET /api/questions/stats
// @access  Public
const getQuestionStats = async (req, res) => {
  try {
    const stats = await Question.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    const formattedStats = stats.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    res.json(formattedStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  bulkUploadQuestions,
  getQuestionStats,
};
