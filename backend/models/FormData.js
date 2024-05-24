const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
