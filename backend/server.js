const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://Harshtastic:7v0lv70ErvLF7iCv@cluster0.kzxy60c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB Atlas', err);
    });

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                FormDataModel.create(req.body)
                    .then(log_reg_form => res.json(log_reg_form))
                    .catch(err => res.json(err));
            }
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                res.json("No records found!");
            }
        });
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});