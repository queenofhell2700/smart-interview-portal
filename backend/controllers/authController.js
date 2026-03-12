const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic password validation: 6+ chars
  if (!password || password.length < 6) {
    return res.status(400).json({ 
      message: 'Password must be at least 6 characters long.' 
    });
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Update user profile stats
// @route   PUT /api/auth/stats
// @access  Private
const updateUserStats = async (req, res) => {
  const { solvedCount, accuracy } = req.body;

  const user = await User.findById(req.user._id);

  if (user) {
    // Weighted accuracy update
    const sessionSolved = solvedCount || 0;
    const currentSolved = user.profile.solvedCount;
    const currentAccuracy = user.profile.accuracy;
    
    const newSolvedCount = currentSolved + sessionSolved;
    const newAccuracy = newSolvedCount > 0 
      ? Math.round(((currentAccuracy * currentSolved) + (accuracy * sessionSolved)) / newSolvedCount)
      : accuracy;

    user.profile.solvedCount = newSolvedCount;
    user.profile.accuracy = newAccuracy;
    
    // Simple streak logic: update lastActive and increment streak if active today
    const today = new Date().setHours(0,0,0,0);
    const lastActive = new Date(user.profile.lastActive).setHours(0,0,0,0);
    
    if (today > lastActive) {
      user.profile.streak += 1;
    }
    user.profile.lastActive = Date.now();

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profile: updatedUser.profile,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get leaderboard
// @route   GET /api/auth/leaderboard
// @access  Public
const getLeaderboard = async (req, res) => {
  try {
    const users = await User.find({})
      .select('name profile')
      .sort({ 'profile.solvedCount': -1 })
      .limit(10);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserStats,
  getLeaderboard,
};
