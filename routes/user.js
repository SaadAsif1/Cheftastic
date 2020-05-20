const express = require('express');
const router = express.Router();
const { requireSignin } = require('../middleware/auth');

// Import controllers
const {
  getSingalAccounts,
  getAllAccounts,
  updateAccount,
  updateUserProfile,
} = require('../controllers/user');

// Get Singal account
router.get('/account/:id', getSingalAccounts);

// Get All accounts
router.get('/accounts', getAllAccounts);

// update user account
router.put('/account/update', requireSignin, updateAccount);

// update user profile
router.put('/user-profile/update', requireSignin, updateUserProfile);

module.exports = router;
