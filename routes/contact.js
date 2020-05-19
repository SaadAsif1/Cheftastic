const express = require('express');
const router = express.Router();

// Import controller
const { contact } = require('../controllers/contact');

router.post('/contact', contact);

module.exports = router;
