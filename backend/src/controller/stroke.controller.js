const Stroke = require("../models/stroke.model");
const axios = require("axios");
const { ML_BASE_URL } = require("../config/envVars");

const stroke = async (req, res) => {
  console.log("[stroke] HIT", { url: req.originalUrl, method: req.method });
  console.log("[stroke] BODY", req.body);
  try {
    const {
      gender,
      age,
      hypertension,
      heart_disease,
      ever_married,
      work_type,
      residence_type,
      avg_glucose_level,
      bmi,
      smoking_status,
    } = req.body;

    if (
      !gender ||
      !age ||
      !hypertension ||
      !heart_disease ||
      !ever_married ||
      !work_type ||
      !residence_type ||
      !avg_glucose_level ||
      !bmi ||
      !smoking_status
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (gender !== "Male" && gender !== "Female" && gender !== "Other") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid gender" });
    }

    if (age < 0 || age > 150) {
      return res.status(400).json({ success: false, message: "Invalid age" });
    }

    const hypertensionLower = hypertension.toLowerCase();
    const heartDiseaseLower = heart_disease.toLowerCase();
    const everMarriedLower = ever_married.toLowerCase();

    if (hypertensionLower !== "yes" && hypertensionLower !== "no") {
      return res
        .status(400)
        .json({ success: false, message: "Hypertension must be Yes or No" });
    }

    if (heartDiseaseLower !== "yes" && heartDiseaseLower !== "no") {
      return res
        .status(400)
        .json({ success: false, message: "Heart disease must be Yes or No" });
    }

    if (everMarriedLower !== "yes" && everMarriedLower !== "no") {
      return res
        .status(400)
        .json({ success: false, message: "Ever married must be Yes or No" });
    }

    if (
      work_type !== "Private" &&
      work_type !== "Self-employed" &&
      work_type !== "Govt_job" &&
      work_type !== "children"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid work type" });
    }

    if (residence_type !== "Urban" && residence_type !== "Rural") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid resident type" });
    }

    if (avg_glucose_level < 0 || avg_glucose_level > 500) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid glucose level" });
    }

    if (bmi < 0 || bmi > 250) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid bmi range" });
    }

    if (
      smoking_status !== "formerly smoked" &&
      smoking_status !== "never smoked" &&
      smoking_status !== "smokes" &&
      smoking_status !== "Unknown"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid smoking status" });
    }

    const newStroke = new Stroke({
      gender,
      age,
      hypertension: hypertensionLower === "yes" ? "Yes" : "No",
      heart_disease: heartDiseaseLower === "yes" ? "Yes" : "No",
      ever_married: everMarriedLower === "yes" ? "Yes" : "No",
      work_type,
      residence_type,
      avg_glucose_level,
      bmi,
      smoking_status,
    });

    await newStroke.save();

    const hypertensionBinary = hypertensionLower === "yes" ? 1 : 0;
    const heartDiseaseBinary = heartDiseaseLower === "yes" ? 1 : 0;

    console.log("=== STROKE PREDICTION DEBUG ===");
    console.log("ML_BASE_URL:", ML_BASE_URL);
    console.log("Full URL:", `${ML_BASE_URL}/predict/stroke`);
    console.log(
      "Payload:",
      JSON.stringify(
        {
          features: {
            gender,
            age: Number(age),
            hypertension: hypertensionBinary,
            heart_disease: heartDiseaseBinary,
            ever_married: everMarriedLower === "yes" ? "Yes" : "No",
            work_type,
            Residence_type: residence_type,
            avg_glucose_level: Number(avg_glucose_level),
            bmi: bmi ? Number(bmi) : 0,
            smoking_status:
              smoking_status === "Unknown"
                ? "Unknown"
                : smoking_status.toLowerCase(),
          },
        },
        null,
        2
      )
    );

    const response = await axios.post(`${ML_BASE_URL}/predict/stroke`, {
      features: {
        gender,
        age: Number(age),
        hypertension: hypertensionBinary,
        heart_disease: heartDiseaseBinary,
        ever_married: everMarriedLower === "yes" ? "Yes" : "No",
        work_type,
        Residence_type: residence_type,
        avg_glucose_level: Number(avg_glucose_level),
        bmi: bmi ? Number(bmi) : 0,
        smoking_status:
          smoking_status === "Unknown"
            ? "Unknown"
            : smoking_status.toLowerCase(),
      },
    });

    const { prediction, probability } = response.data;
    if (
      typeof prediction === "undefined" ||
      typeof probability === "undefined"
    ) {
      console.error("[stroke] Bad ML response", response.data);
      return res
        .status(502)
        .json({ success: false, message: "Bad response from model service" });
    }

    newStroke.prediction = prediction;
    newStroke.probability = probability;
    await newStroke.save();

    return res.status(200).json({
      success: true,
      prediction,
      probability,
      data: newStroke,
    });
  } catch (error) {
    const ax = error?.response;
    console.error("[stroke] ERROR", {
      name: error?.name,
      msg: error?.message,
      code: error?.code,
      axiosStatus: ax?.status,
      axiosData: ax?.data,
      stack: error?.stack?.split("\n").slice(0, 3).join(" | "),
    });
    return res.status(ax?.status || 500).json({
      success: false,
      message: "Stroke prediction failed",
      detail: ax?.data || error?.message || "unknown",
    });
  }
};

module.exports = stroke;
