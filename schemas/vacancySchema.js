const mongoose = require('mongoose');

const VacancySchema = new mongoose.Schema({
    employer: { type: mongoose.Types.ObjectId, ref: 'Users' },
    text: String,
    status: String,
    name: String,
    tags: [mongoose.Schema.Types.Mixed],
    testTaskLink: String,
    payment: String,
    timestamp: { type: Date },
}, {
    collection: 'Vacancies',
});

mongoose.model('Vacancies', VacancySchema);