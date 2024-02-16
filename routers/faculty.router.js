const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');

//get end points
router.get('/form/:id', facultyController.getForm) // done
router.get('/forms', facultyController.getForms) // done

// post endpoints
router.post('/form', facultyController.createForm) //done
router.post('/form/:id', facultyController.addTagToForm)

//patch and put
router.patch('/form/:id', facultyController.updateForm)//done




module.exports = router;
