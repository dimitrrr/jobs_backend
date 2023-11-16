const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    fromUser: { type: mongoose.Types.ObjectId, ref: 'Users' },
    aboutUser: { type: mongoose.Types.ObjectId, ref: 'Users' },
    mark: Number,
    text: String,
    sender: String,
    timestamp: { type: Date },
}, {
    collection: 'Feedback',
});

mongoose.model('Feedback', FeedbackSchema);