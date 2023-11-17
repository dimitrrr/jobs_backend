const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    employee: { type: mongoose.Types.ObjectId, ref: 'Users' },
    data: String,
}, {
    collection: 'CVs',
});

mongoose.model('CVs', CVSchema);