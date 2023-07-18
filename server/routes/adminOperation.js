const express = require('express');
const router = express.Router();
const { getAllPeople } = require('../controller/userController');
const { verifyToken } = require('../services/authService');

// Route to get all people (optional: specify id)
router.get('/people/:id?', verifyToken, getAllPeople);

// Additional routes for user operations can be added here

module.exports = router;