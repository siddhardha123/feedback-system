const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
    address : {
        type: String,
        required: true
    },
    faculty : {
        type : String,
        required : true
    },
    subject : {
        type : String,
        required : true
    },
    metadata: {
        type: Schema.Types.Mixed,
        required: true
    }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

module.exports = Submission;
