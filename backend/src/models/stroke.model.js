const mongoose = require('mongoose')

const strokeSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hypertension: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    heart_disease: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    ever_married: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    work_type: {
        type: String,
        enum: ['Private', 'Self-employed', 'Govt_job'],
        required: true
    },
    residence_type: {
        type: String,
        enum: ['Urban', 'Rural'],
        required: true
    },
    avg_glucose_level: {
        type: Number,
        required: true
    },
    bmi: {
        type: Number,
        required: true
    },
    smoking_status: {
        type: String,
        enum: ['formerly smoked', 'never smoked', 'smokes', 'Unknown'],
        required: true
    },
    prediction: {
        type: Number
    },
    probability: {
        type: Number
    }
})

const Stroke = mongoose.model('Stroke', strokeSchema)
module.exports = Stroke