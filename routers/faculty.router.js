const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

//get end points
router.get('/tags', facultyController.getTags)
router.get('/form/:id', facultyController.getForm)
router.get('/form', facultyController.getForms)

// post endpoints
router.post('/form', facultyController.createForm)
router.post('/tags', facultyController.createTag)
router.post('/form/:id', facultyController.addTagToForm)

//patch and put
router.patch('/form/:id', facultyController.updateForm)




module.exports = router;
