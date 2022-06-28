var mongoose = require('mongoose');
var FeedbackSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true
    },

    userid: {
        type: Number, 
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    message: {
        type: String, 
        required: true
    }
});
module.exports = mongoose.model('Feedback', FeedbackSchema);
