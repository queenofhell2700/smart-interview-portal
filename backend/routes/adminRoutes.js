const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  createQuestion, 
  updateQuestion, 
  deleteQuestion, 
  bulkUploadQuestions 
} = require('../controllers/questionController');
const { 
  getSystemAnalytics, 
  getAllUsers, 
  deleteUser 
} = require('../controllers/adminController');

// Question Management
router.post('/questions', protect, admin, createQuestion);
router.post('/questions/bulk', protect, admin, bulkUploadQuestions);
router.put('/questions/:id', protect, admin, updateQuestion);
router.delete('/questions/:id', protect, admin, deleteQuestion);

// User Management
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

// System Analytics
router.get('/analytics', protect, admin, getSystemAnalytics);

module.exports = router;
