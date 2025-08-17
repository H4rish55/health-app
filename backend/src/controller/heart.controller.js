const Heart = require("../models/heart.model");
const axios = require("axios");

const heart = async (req, res) => {
  try {
    const {
      age,
      sex,
      chest_pain_type,
      resting_bp,
      cholesterol,
      fasting_bs,
      resting_ecg,
      max_hr,
      exercise_angina,
      old_peak,
      st_slope,
    } = req.body;

    if (
      !age ||
      !sex ||
      !chest_pain_type ||
      !resting_bp ||
      !cholesterol ||
      !fasting_bs ||
      !resting_ecg ||
      !max_hr ||
      !exercise_angina ||
      !st_slope
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (age < 0 || age > 150) {
      return res.status(400).json({ success: false, message: "Invalid age" });
    }

    if (sex !== "Male" && sex !== "Female") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid gender" });
    }

    if (
      chest_pain_type !== "ATA" &&
      chest_pain_type !== "NAP" &&
      chest_pain_type !== "ASY" &&
      chest_pain_type !== "TA"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid chest pain type" });
    }

    if (resting_bp < 50 || resting_bp > 200) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid resting bp" });
    }

    if (cholesterol < 0 || cholesterol > 300) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid cholesterol level" });
    }

    const fasting_bs_lower = fasting_bs.toLowerCase();

    if (fasting_bs_lower !== "normal" && fasting_bs !== "high") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Blood sugar levels must be normal or high",
        });
    }

    const resting_ecg_lower = resting_ecg.toLowerCase();

    if (resting_ecg_lower !== "normal" && resting_ecg_lower !== "abnormal") {
      return res
        .status(400)
        .json({
          success: false,
          message: "ECG levels must be Normal or Abnormal",
        });
    }

    if (max_hr < 0 || max_hr > 300) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid heart rate" });
    }

    const exercise_angina_lower = exercise_angina.toLowerCase();

    if (exercise_angina_lower !== "yes" && exercise_angina_lower !== "no") {
      return res
        .status(400)
        .json({ success: false, message: "Exercise angina must be Yes or No" });
    }

    if (old_peak < 0 || old_peak > 10) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid oldpeak levels" });
    }

    if ((st_slope !== "Up" && st_slope !== "Flat" && st_slope !== "Down")) {
      return res.status(400).json({ success: false, message: "" });
    }

    const newHeart = new Heart({
      age,
      sex,
      chest_pain_type,
      resting_bp,
      cholesterol,
      fasting_bs: fasting_bs_lower === "normal" ? "Normal" : "High",
      resting_ecg: resting_ecg_lower === "normal" ? "Normal" : "Abnormal",
      max_hr,
      exercise_angina: exercise_angina_lower === "yes" ? "Yes" : "No",
      old_peak,
      st_slope,
    });

    await newHeart.save();

    const fasting_bs_binary = fasting_bs_lower === "normal" ? 0 : 1;
    const resting_ecg_correct =
      resting_ecg_lower === "abnormal" ? "ST" : "Normal";
    const exercise_angina_correct = exercise_angina_lower === "yes" ? "Y" : "N";

    const response = await axios.post("http://127.0.0.1:5000/predict/heart", {
      features: {
        Age: age,
        Sex: sex,
        ChestPainType: chest_pain_type,
        RestingBP: resting_bp,
        Cholesterol: cholesterol,
        FastingBS: fasting_bs_binary,
        RestingECG: resting_ecg_correct,
        MaxHR: max_hr,
        ExerciseAngina: exercise_angina_correct,
        Oldpeak: old_peak,
        ST_Slope: st_slope,
      },
    });

    const { prediction, probability } = response.data;

    newHeart.prediction = prediction;
    newHeart.probability = probability;
    await newHeart.save();

    return res.status(200).json({
      success: true,
      prediction,
      probability,
      data: newHeart,
    });
  } catch (error) {
    console.log("Error in Heart controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = heart;
