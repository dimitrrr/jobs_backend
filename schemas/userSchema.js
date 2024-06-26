const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    company: String,
    timeZone: String,
    savedUsers: [{ type: mongoose.Types.ObjectId, ref: 'Users' }],
    savedVacancies: [{ type: mongoose.Types.ObjectId, ref: 'Vacancies' }],
    hiddenVacancies: [{ type: mongoose.Types.ObjectId, ref: 'Vacancies' }],
}, {
    collection: 'Users',
});

mongoose.model('Users', UserSchema);