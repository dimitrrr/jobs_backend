const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    employee: { type: mongoose.Types.ObjectId, ref: 'Users' },
    vacancy: { type: mongoose.Types.ObjectId, ref: 'Vacancies' },
    CV: { type: mongoose.Types.ObjectId, ref: 'CVs' },
    text: String,
    expectations: String,
    testTaskLink: String,
    status: String,
}, {
    collection: 'Candidates',
});

mongoose.model('Candidates', CandidateSchema);