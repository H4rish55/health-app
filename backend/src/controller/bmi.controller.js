const Bmi = require('../models/bmi.model')

const bmiPounds = async (req, res) => {
    try {
        const { weight, height } = req.body

    if(weight < 0 || weight > 1000){
        return res.status(400).json({ success: true, message: "Invalid weight range" })
    }

    if(height < 0 || height > 110){
        return res.status(400).json({ success: false, message: "Invalid height range" })
    }

    const bmi_calc = ((weight / (height ** 2)) * 703).toFixed(2)

    const newBmi = new Bmi({
        weight,
        height,
        bmi: bmi_calc
    })

    await newBmi.save()

    res.status(200).json({ success: true, data: newBmi})
    } catch (error) {
        console.log("Error in bmi Pounds controller:", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    } 
}

const bmiKgs = async (req, res) => {
    try {
        const { weight, height } = req.body

    if(weight < 0 || weight > 500){
        return res.status(400).json({ success: true, message: "Invalid weight range" })
    }

    if(height < 0 || height > 300){
        return res.status(400).json({ success: false, message: "Invalid height range" })
    }

    const bmi_calc = (weight / (height ** 2)).toFixed(2)

    const newBmi = new Bmi({
        weight,
        height,
        bmi: bmi_calc
    })

    await newBmi.save()

    res.status(200).json({ success: true, data: newBmi})
    } catch (error) {
        console.log("Error in bmi Kgs controller:", error.message)
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

module.exports = {
    bmiKgs,
    bmiPounds
}