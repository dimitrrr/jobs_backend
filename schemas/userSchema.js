const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    cvs: [{ data: String }],
    company: String,
    vacancies: [{ data: String }],
    timeZone: String,
}, {
    collection: 'Users',
});

mongoose.model('Users', UserSchema);