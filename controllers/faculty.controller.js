const facultyService = require('../services/faculty.service');

const createTag = async (req, res) => {
    const validatedData = isValidCreateTag(req.body);
    res.send(await facultyService.createTag(validatedData));
};

const getTags = (req, res) => {
    res.send('This is an example endpoint!');
}

const createForm = (req, res) => {
    res.send('This is an example endpoint!');
}

const updateForm = (req, res) => {
    res.send('This is an example endpoint!');
}

const addTagToForm = (req, res) => {
    res.send('This is an example endpoint!');
}

const getForm = (req, res) => {
    res.send('This is an example endpoint!');
}

const getForms = (req, res) => {
    res.send('This is an example endpoint!');
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
