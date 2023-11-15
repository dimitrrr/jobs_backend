const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json( { limit: 10000000000 }));
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
require('./schemas/candidateSchema.js');
require('./schemas/vacancySchema.js');
require('./schemas/feedbackSchema.js');
require('./schemas/CVSchema.js');

const Users = mongoose.model('Users');
const Candidates = mongoose.model('Candidates');
const Vacancies = mongoose.model('Vacancies');
const Feedback = mongoose.model('Feedback');
const CVs = mongoose.model('CVs');

app.post('/register', async(req, res) => {

    const { username, email, password, timeZone } = req.body;

    const encryptedPassword = await bcryptjs.hash(password, 10);

    try {
        const oldUser = await Users.findOne({ email });

        if(oldUser) {
            return res.json({ status: 'User already exist'});
        }

        await Users.create({ username, email, password: encryptedPassword, timeZone, company: '', savedUsers: [], savedVacancies: [], hiddenVacancies: [] });
        res.json({ status: 'Ok' });
    } catch(error) {
        res.json({ status: 'error', data: error });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });

    if(!user) {
        return res.json({ status: 'error', data: 'User not found'});
    }

    if(await bcryptjs.compare(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
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

        await Users.findOne({ _id: user._id }).populate('savedUsers').populate('savedVacancies').populate('hiddenVacancies')
            .then((data) => {
                res.send({ status: 'ok', data });
            }).catch(error => {
                res.send({ status: 'error', data: error })
            });
    } catch(error) {
        console.log(error)
    }
});

app.post('/updateUser', async (req, res) => {
    const { _id, username, email, timeZone, company, hiddenVacancies, savedVacancies, savedUsers } = req.body;
    try {
        await Users.updateOne({_id: _id}, {
            $set: { username, email, timeZone, company, hiddenVacancies, savedVacancies, savedUsers }
        });

        return res.json({status: 'ok', data: 'updated'});
    } catch(error) {
        return res.json({ status: 'error', data: error });
    }
});

app.post('/postedVacancies', async (req, res) => {
    const { token } = req.body;
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err) {
            return 'token expired';
        }

        return res;
    });

    if(user === 'token expired') {
        return res.send({ status: 'error', data: 'token expired' });
    }

    try {
        const vacancies = await Vacancies.find().populate('employer');

        return res.json({ status: 'ok', data: vacancies });
    } catch(error) {
        return res.json({ status: 'error', data: error });
    }
});

app.post('/createVacancy', async(req, res) => {

    const { employer, name, text, tags, testTaskLink } = req.body;

    try {

        await Vacancies.create({ employer, name, text, tags, testTaskLink, candidates: [], status: 'active' });
        res.json({ status: 'Ok' });
    } catch(error) {
        res.json({ status: 'error', data: error });
    }
});

app.post('/updateVacancy', async (req, res) => {
    const { _id, name, status, tags, text, testTaskLink } = req.body;
    try {
        await Vacancies.updateOne({_id: _id}, {
            $set: {
                name,
                status,
                tags,
                text,
                testTaskLink,
            }
        })

        return res.json({status: 'ok', data: 'updated'});
    } catch(error) {
        return res.json({ status: 'error', data: error });
    }
});

app.post('/searchVacanciesByName', async (req, res) => {
    const { name, userId } = req.body;

    try {
        const vacancies = await Vacancies.find().populate('employer');

        const filteredVacanciesByName = vacancies.filter(v => v.name.toLowerCase().includes(name.toLowerCase()));
        const filteredVacanciesByUserId = userId ? filteredVacanciesByName.filter(v => v.employer._id !== userId) : filteredVacanciesByName;

        return res.json({ status: 'ok', data: filteredVacanciesByUserId });
    } catch(error) {
        return res.json({ status: 'error', data: error });
    }
});

app.post('/addCandidate', async(req, res) => {

    const { employee, vacancy, text, CV, expectations, testTaskLink } = req.body;

    try {
        await Candidates.create({ employee, vacancy, CV, text, expectations, testTaskLink, status: 'pending' });
        res.json({ status: 'Ok' });
    } catch(error) {
        res.json({ status: 'error', data: error });
    }
});

app.post('/removeCandidate', async(req, res) => {
    const { _id } = req.body;

    try {
        await Candidates.findOneAndDelete({_id});
        res.json({ status: 'Ok' });
    } catch(error) {
        console.log('error', error)
        res.json({ status: 'error', data: error });
    }
});

app.post('/candidates', async (req, res) => {
    const { token } = req.body;
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
        if(err) {
            return 'token expired';
        }

        return res;
    });

    if(user === 'token expired') {
        return res.send({ status: 'error', data: 'token expired' });
    }

    try {
        const candidates = await Candidates.find().populate('employee').populate('vacancy').populate('CV');

        return res.json({ status: 'ok', data: candidates });
    } catch(error) {
        return res.json({ status: 'error', data: error });
    }
});