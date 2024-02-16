const fs = require("fs").promises;
const path = require("path");
const Submission = require("../models/Submission.model");

const getFormsWithTag = async (req, res) => {
  try {
    const validatedData = isValidGetFormsWithTag(req.body);
    const forms = await studentService.getForms(validatedData);
    res.send(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitForm = async (req, res) => {
  try {
    const { address, faculty, subject } = req.body;
    const submission = new Submission(req.body);
    const latestSubmission = await submission.save();
    res.status(201).json(latestSubmission);
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSubmissions = async (req, res) => {
    try {
      const submissions = await Submission.find();
      res.status(200).json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Error fetching submissions' });
    }
  };
  


module.exports = {
  getFormsWithTag,
  submitForm,
  getSubmissions,
};
