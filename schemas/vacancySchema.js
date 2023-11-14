const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    employer: { type: mongoose.Types.ObjectId, ref: 'Users' },
    text: String,
    status: String,
    name: String,
    tags: [String],
    candidates: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
    testTaskLink: String,
}, {
    collection: 'Vacancies',
});

mongoose.model('Vacancies', VacancySchema);