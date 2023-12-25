const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/example', studentController.getFormsWithTag);

module.exports = router;
