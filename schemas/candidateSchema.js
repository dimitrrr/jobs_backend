const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    employeeId: String,
    vacancyId: String,
    text: String,
    expectations: String,
    testTaskLink: String,
}, {
    collection: 'Candidates',
});

mongoose.model('Candidates', CandidateSchema);