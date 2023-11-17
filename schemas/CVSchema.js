const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    employee: { type: mongoose.Types.ObjectId, ref: 'Users' },
    CVData: mongoose.Schema.Types.Mixed,
    timestamp: { type: Date },
}, {
    collection: 'CVs',
});

mongoose.model('CVs', CVSchema);