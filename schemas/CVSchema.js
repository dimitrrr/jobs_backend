const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    userId: String,
    data: String,
}, {
    collection: 'CVs',
});

mongoose.model('CVs', CVSchema);