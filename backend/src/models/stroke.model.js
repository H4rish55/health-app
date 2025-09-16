const mongoose = require('mongoose')

const strokeSchema = new mongoose.Schema({
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        trim: true
    },
    hypertension: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
        trim: true
    },
    heart_disease: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
        trim: true
    },
    ever_married: {
        type: String,
        enum: ['Yes', 'No'],
        required: true,
        trim: true
    },
    work_type: {
        type: String,
        enum: ['Private', 'Self-employed', 'Govt_job', "children"],
        required: true,
        trim: true
    },
    residence_type: {
        type: String,
        enum: ['Urban', 'Rural'],
        required: true,
        trim: true
    },
    avg_glucose_level: {
        type: Number,
        required: true,
        trim: true
    },
    bmi: {
        type: Number,
        required: true,
        trim: true
    },
    smoking_status: {
        type: String,
        enum: ['formerly smoked', 'never smoked', 'smokes', 'Unknown'],
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

const Stroke = mongoose.model('Stroke', strokeSchema)
module.exports = Stroke