const facultyService = require('../services/faculty.service');
const Form = require('../models/Form.model');
const createTag = async (req, res) => {
    const validatedData = isValidCreateTag(req.body);
    res.send(await facultyService.createTag(validatedData));
};

const getTags = (req, res) => {
    res.send('This is an example endpoint!');
}

const createForm = async (req, res) => {
        try {
            const newForm = new Form(req.body);
            const latestForm  = await newForm.save();
            res.status(201).json(latestForm);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
}

const updateForm = async (req, res) => {
    try {
        const formId = req.params.id;
        const updateData = req.body;

        const updatedForm = await Form.findByIdAndUpdate(formId, updateData, { new: true });

        if (!updatedForm) {
            return res.status(404).json({ message: "Form not found" });
        }

        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const addTagToForm = (req, res) => {
    res.send('This is an example endpoint!');
}

const getForm = async (req, res) => {
    try {
        res.status(200).json(await Form.findById(req.params.id));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getForms = async(req, res) => {
    try {
        res.status(200).json(await Form.find());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createTag,
    getTags,
    createForm,
    updateForm,
    addTagToForm,
    getForm,
    getForms
}
