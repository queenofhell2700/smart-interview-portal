const express = require('express');
const router = express.Router();
const { getQuestions, getQuestionById, getQuestionStats } = require('../controllers/questionController');

// Routes
router.route('/stats').get(getQuestionStats);
router.route('/').get(getQuestions);
router.route('/:id').get(getQuestionById);

module.exports = router;
