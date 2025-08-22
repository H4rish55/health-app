const mongoose = require('mongoose')

const bmiSchema = new mongoose.Schema({
    weight: {
        type: Number,
        required: true,
        trim: true
    },
    height: {
        type: Number,
        required: true,
        trim: true
    },
    bmi: {
        type: Number,
        required: true
    }
})

const Bmi = mongoose.model('Bmi', bmiSchema)

module.exports = Bmi