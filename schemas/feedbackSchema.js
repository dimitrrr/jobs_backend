const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    fromUserId: String,
    toUserId: String,
    mark: Number,
    text: String,
}, {
    collection: 'Feedback',
});

mongoose.model('Feedback', FeedbackSchema);