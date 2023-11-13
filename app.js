const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const cors = require('cors');
app.use(cors());
const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const JWT_SECRET = 'da23hkj235ksdf98gsdodgs34t-s]dg-]=|sgd/sdf,scxfdsd--243tewfds';

const mongoUrl = `mongodb+srv://admin:test@cluster0.iy3fwj2.mongodb.net/`;

mongoose.connect(mongoUrl).then(() => {
    console.log('Connected to database!');
}).catch(e => console.log(e));

app.listen(1234, () => {
    console.log('Server started!')
});

require('./schemas/userSchema.js');

const Users = mongoose.model('Users');

app.post('/register', async(req, res) => {

    const { username, email, password, timeZone } = req.body;

    const encryptedPassword = await bcryptjs.hash(password, 10);

    try {
        const oldUser = await Users.findOne({ email });

        if(oldUser) {
            return res.json({ status: 'User already exist'});
        }

        await Users.create({ username, email, password: encryptedPassword, timeZone });
        res.json({ status: 'Ok' });
    } catch(error) {
        res.json({ status: 'error', error: 'cannot register' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if(!user) {
        return res.json({ status: 'error', data: 'User not found'});
    }

    if(await bcryptjs.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, {
            expiresIn: 1000000000000,
        });

        if(res.status(201)) {
            return res.json({ status: 'ok', data: token });
        } else {
            return res.json({ status: 'error', data: 'not logged in' });
        }
    }

    return res.json({ status: 'error', data: 'invalid password' });

});

app.post('/userData', async (req, res) => {
    const { token } = req.body;
    
    try {
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if(err) {
                return 'token expired';
            }

            return res;
        });

        if(user === 'token expired') {
            return res.send({ status: 'error', data: 'token expired' });
        }

        await Users.findOne({ email: user.email }).then((data) => {
            res.send({ status: 'ok', data });
        }).catch(error => {
            res.send({ status: 'error', data: error })
        })
    } catch(error) {
        console.log(error)
    }
});