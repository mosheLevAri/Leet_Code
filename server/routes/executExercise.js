const express = require('express');
const router = express.Router();
const { executeCode } = require('../BL/Logic/executeCode');
const { verifyToken } = require('../services/authService');
const Docker = require('dockerode');
const fs = require('fs');

const docker = new Docker();

// Route to get all people (optional: specify id)
router.post('/', verifyToken, executeCode);

// Additional routes for user operations can be added here

module.exports = router;