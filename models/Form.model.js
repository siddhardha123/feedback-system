const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    questionType: {
        type: String,
        required: true
    },
    questionText: {
        type: String,
        required: true
    },
    metadata: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const formSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    questions: [questionSchema]
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
