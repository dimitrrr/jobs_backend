const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());

const mongoUrl = `mongodb+srv://admin:test@cluster0.iy3fwj2.mongodb.net/`;

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to database!');
}).catch(e => console.log(e));

app.listen(1234, () => {
    console.log('Server started!')
});

app.post('/post', async (req, res) => {
    
    const { data } = req.body;

    try {
        if(data === 'hello') {
            res.send( { status: 'ok' });
        } else {
            res.send({ status: 'User not found' });
        }
    } catch (error) {
        res.send({ status: 'error' });
    }

});

require('./schemas/userSchema.js');

const User = mongoose.model('Users');

app.post('/register', async(req, res) => {

    const { username, email, password } = req.body;

    try {
        await User.create({ username, email, password });
        res.send({ status: 'Ok' });
    } catch(error) {
        res.send({ status: 'Error' });
    }
});