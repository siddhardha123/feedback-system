const express = require('express');
const router = express.Router();
const exampleController = require('../controllers/example.controller');

router.get('/example', exampleController.getExample);

module.exports = router;
