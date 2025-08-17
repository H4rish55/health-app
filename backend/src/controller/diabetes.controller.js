const Diabetes = require("../models/diabetes.model");
const axios = require("axios");

const diabetes = async (req, res) => {
  try {
    const {
      pregnancies,
      glucose,
      blood_pressure,
      skin_thickness,
      insulin,
      bmi,
      diabetes_pedigree_function,
      age,
    } = req.body;

    if (
      !glucose ||
      !blood_pressure ||
      !skin_thickness ||
      !insulin ||
      !bmi ||
      !diabetes_pedigree_function ||
      !age
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (pregnancies === null) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (pregnancies < 0 || pregnancies > 20) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Pregnancy Input" });
    }

    if (glucose < 0 || glucose > 500) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid glucose level" });
    }

    if (blood_pressure < 0 || blood_pressure > 200) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blood pressure level" });
    }

    if (skin_thickness < 0 || skin_thickness > 80) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Skin Thickness" });
    }

    if (insulin < 0 || insulin > 1000) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Insulin level" });
    }

    if (bmi < 0 || bmi > 250) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid bmi range" });
    }

    if (diabetes_pedigree_function < 0 || diabetes_pedigree_function > 5) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid diabetes pedigree function level",
        });
    }

    if (age < 0 || age > 150) {
      if (bmi < 0 || bmi > 250) {
        return res.status(400).json({ success: false, message: "Invalid age" });
      }
    }

    const newDiabetes = new Diabetes({
      pregnancies,
      glucose,
      blood_pressure,
      skin_thickness,
      insulin,
      bmi,
      diabetes_pedigree_function,
      age,
    });

    await newDiabetes.save();

    const response = await axios.post(
      "http://127.0.0.1:5000/predict/diabetes",
      {
        features: {
          Pregnancies: pregnancies,
          Glucose: glucose,
          BloodPressure: blood_pressure,
          SkinThickness: skin_thickness,
          Insulin: insulin,
          BMI: bmi,
          DiabetesPedigreeFunction: diabetes_pedigree_function,
          Age: age,
        },
      }
    );

    const { prediction, probability } = response.data;

    newDiabetes.prediction = prediction;
    newDiabetes.probability = probability;
    await newDiabetes.save();

    return res.status(200).json({
      success: true,
      prediction,
      probability,
      data: newDiabetes,
    });
  } catch (error) {
    console.log("Error in diabetes controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = diabetes;
