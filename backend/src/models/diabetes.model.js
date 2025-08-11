const mongoose = require('mongoose')

const diabetesSchema = new mongoose.Schema({
    pregnancies: {
        type: Number,
        required: true
    },
    glucose: {
        type: Number,
        required: true
    },
    blood_pressure: {
        type: Number,
        required: true
    },
    skin_thickness: {
        type: Number,
        required: true
    },
    insulin: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    diabetes_pedigree_function: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    prediction: {
        type: Number
    },
    probability: {
        type: Number
    }
})

const Diabetes = mongoose.model('Diabetes', diabetesSchema)

module.exports = Diabetes