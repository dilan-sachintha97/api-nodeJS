const express = require('express');
const UserController = require('../controller/CustomerController');

const router = express.Router();
router.post('/save', UserController.saveCustomer)
router.get('/find', UserController.findCustomer)
router.delete('/delete', UserController.deleteCustomer)
router.put('/update', UserController.deleteCustomer)
router.get('/find-all', UserController.findAllCustomers)

module.exports = router;