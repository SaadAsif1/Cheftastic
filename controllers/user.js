const mongoose = require('mongoose');
const UserProfile = require('../models/UserProfile');
const User = require('../models/User.js');
const { updateAccountValidation, userProfileValidation } = require('../validators/user');

// Get Singal User Account
exports.getSingalAccounts = async (req, res) => {
  // Check Object ID
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Invalid ObjectId!' });
  }

  const userProfile = await UserProfile.findOne({ user: req.params.id });

  if (!userProfile) return res.status(400).json({ error: 'No profile found!' });

  res.json({ userProfile });
};

// Get All Users Accounts
exports.getAllAccounts = async (req, res) => {
  const userProfile = await UserProfile.find({});

  res.json({ userProfile });
};

// Update A Users Account
exports.updateAccount = async (req, res) => {
  const { error, value } = updateAccountValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  // get name and password from req.body
  const { name, password } = value;

  // find user in database
  const user = await User.findOne({ _id: req.user._id });
  const userProfile = await UserProfile.findOne({ user: req.user._id });

  user.name = name;
  user.password = password;

  userProfile.name = name;

  const result = await user.save();

  await userProfile.save();

  // not sending back pass and salt to user if update was succesful
  result.hashed_password = undefined;
  result.salt = undefined;
  res.json({ result });
};

// Update A User Profile
exports.updateUserProfile = async (req, res) => {
  const { error, value } = userProfileValidation(req.body);

  if (error) return res.status(400).json({ error: error.details[0].message });

  const { thumbnail, website, bio } = value;

  const userProfile = await UserProfile.findOne({ user: req.user._id });

  if (thumbnail) userProfile.thumbnail = thumbnail;

  if (website) userProfile.website = website;

  if (bio) userProfile.bio = bio;

  const result = await userProfile.save();
  res.json({ userProfile: result });
};
