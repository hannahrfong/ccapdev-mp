var mongoose = require('mongoose');
var FeedbackSchema = new mongoose.Schema({
    id: {
        type: Number,
        required:true
    },

    userid: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Account',
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
