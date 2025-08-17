const mongoose = require('mongoose')

const diabetesSchema = new mongoose.Schema({
    pregnancies: {
        type: Number,
        required: true,
        trim: true
    },
    glucose: {
        type: Number,
        required: true,
        trim: true
    },
    blood_pressure: {
        type: Number,
        required: true,
        trim: true
    },
    skin_thickness: {
        type: Number,
        required: true,
        trim: true
    },
    insulin: {
        type: Number,
        required: true,
        trim: true
    },
    bmi: {
        type: Number,
        required: true,
        trim: true
    },
    diabetes_pedigree_function: {
        type: Number,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
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