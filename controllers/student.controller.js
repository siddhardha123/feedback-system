const studentService = require('../services/student.service');
const getFormsWithTag = async (req, res) => {
    const validatedData = isValidGetFormsWithTag(req.body);
    res.send(await studentService.getForms(validatedData));
}

module.exports = {
    getFormsWithTag,
}
