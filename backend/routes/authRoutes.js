const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile, updateUserStats, getLeaderboard } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);
router.put('/stats', protect, updateUserStats);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
