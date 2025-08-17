const mongoose = require('mongoose')

const heartSchema = new mongoose.Schema({
    age: {
        type: Number,
        required: true,
        trim: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
        trim: true
    },
    chest_pain_type: {
        type: String,
        enum: ['ATA', 'NAP', 'ASY', 'TA'],
        required: true,
        trim: true
    },
    resting_bp: {
        type: Number,
        required: true,
        trim: true
    },
    cholesterol: {
        type: Number,
        required: true,
        trim: true
    },
    fasting_bs: {
        type: String,
        required: true,
        enum: ['Normal', 'High'],
        trim: true
    },
    resting_ecg: {
        type: String,
        required: true,
        enum: ['Normal', 'Abnormal'],
        trim: true
    },
    max_hr: {
        type: Number,
        required: true,
        trim: true
    },
    exercise_angina: {
        type: String,
        required: true,
        enum: ['Yes', 'No'],
        trim: true
    },
    old_peak: {
        type: Number,
        required: true,
        trim: true
    },
    st_slope: {
        type: String,
        required: true,
        enum: ['Up', 'Flat', 'Down'],
        trim: true
    },
    prediction: {
        type: Number
    },
    probability: {
        type: Number
    }
})

const Heart = mongoose.model('Heart', heartSchema)
module.exports = Heart