const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    company: String,
    timeZone: String,
}, {
    collection: 'Users',
});

mongoose.model('Users', UserSchema);