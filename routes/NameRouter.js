const express = require('express');
const NicController = require('../controller/NicController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Protected route for NIC conversion 
router.get('/name', authMiddleware.authenticateToken, NicController.convertNIC);

module.exports = router;
