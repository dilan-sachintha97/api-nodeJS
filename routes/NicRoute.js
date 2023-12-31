const express = require('express');
const NicController = require('../controller/NicController');
const authMiddleware = require('../middleware/authMiddleware');
const nameController = require('../controller/NameCountroller')
const router = express.Router();

// Protected route for NIC conversion 
router.get('/convert', authMiddleware.authenticateToken, NicController.convertNIC);

router.post('/name', authMiddleware.authenticateToken, nameController.getMsg);

module.exports = router;


