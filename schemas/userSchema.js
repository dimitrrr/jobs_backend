const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    cvs: [{ data: String }],
    company: { data: String },
    vacancies: [{ data: String }],
    timeZone: String,
}, {
    collection: 'Users',
});

mongoose.model('Users', UserSchema);