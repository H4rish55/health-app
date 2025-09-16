import React, { useState } from "react";
import { usePredictStore } from "../../store/predictStore";
import { Brain } from "lucide-react";

const StrokePredictPage = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [hypertension, setHypertension] = useState("");
  const [heartDisease, setHeartDisease] = useState("");
  const [everMarried, setEverMarried] = useState("");
  const [workType, setWorkType] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [avgGlucoseLevel, setAvgGlucoseLevel] = useState("");
  const [bmi, setBmi] = useState("");
  const [smokingStatus, setSmokingStatus] = useState("");

  const isFormValid = () => {
    return (
      gender &&
      age &&
      hypertension &&
      heartDisease &&
      everMarried &&
      workType &&
      residenceType &&
      avgGlucoseLevel &&
      bmi &&
      smokingStatus
    );
  };

  const { stroke, prediction, probability, strokePredict } = usePredictStore();

  const mapPayload = () => {
    const genderMap = { M: "Male", F: "Female", O: "Other" };
    const ynMap = { Y: "Yes", N: "No" };
    const workMap = {
      P: "Private",
      G: "Govt_job",
      S: "Self-employed",
      C: "children",
    };
    const residentMap = { U: "Urban", R: "Rural" };
    const smokeMap = {
      S: "smokes",
      F: "formerly smoked",
      N: "never smoked",
      U: "Unknown",
    };

    return {
      gender: genderMap[gender],
      age: Number(age),
      hypertension: ynMap[hypertension],
      heart_disease: ynMap[heartDisease],
      ever_married: ynMap[everMarried],
      work_type: workMap[workType],
      residence_type: residentMap[residenceType],
      avg_glucose_level: Number(avgGlucoseLevel),
      bmi: Number(bmi),
      smoking_status: smokeMap[smokingStatus],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    await stroke(mapPayload());
  };

  const formatResult = (p) => {
    if (p === null) return "";
    const val = p <= 1 ? p * 100 : p;
    return `${val.toFixed(1)}%`;
  };

  const riskLabelFormat = (p) => {
    if(p === null) return "No Stroke Risk"
    const prob = typeof p === "number" && p <= 1 ? p : p / 100;
    if (prob >= 0.30) return "Stroke Risk detected";
    if (prob >= 0.20) return "Moderate Stroke Risk";
    if (prob >= 0.10) return "Elevated Stroke Risk";
    return "No Stroke Risk";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Card – matches image theme */}
        <div className="mb-8 text-center">
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg
                          bg-gradient-to-br from-orange-500 to-rose-600"
          >
            <Brain className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Stroke Prediction
          </h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl font-extrabold text-orange-400">94%</span>
          </div>
          <p className="text-gray-200/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Advanced neural networks analyze risk factors to predict stroke
            likelihood with 94% accuracy
          </p>
          <div className="w-full bg-white/10 rounded-full h-2 mt-6 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 to-rose-600"
              style={{ width: "94%" }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/70 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* helper classes for consistent controls */}
              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Gender
                </label>
                <div className="relative">
                  <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                               focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                               transition-all appearance-none"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Age */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  placeholder="Enter your Age"
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Hypertension */}
              <div>
                <label
                  htmlFor="hypertension"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Hypertension
                </label>
                <div className="relative">
                  <select
                    id="hypertension"
                    value={hypertension}
                    onChange={(e) => setHypertension(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Hypertension Status</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Heart Disease */}
              <div>
                <label
                  htmlFor="heartDisease"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Heart Disease
                </label>
                <div className="relative">
                  <select
                    id="heartDisease"
                    value={heartDisease}
                    onChange={(e) => setHeartDisease(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Heart Disease Status</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Ever Married */}
              <div>
                <label
                  htmlFor="everMarried"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Ever Married
                </label>
                <div className="relative">
                  <select
                    id="everMarried"
                    value={everMarried}
                    onChange={(e) => setEverMarried(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Ever Married?</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Work Type */}
              <div>
                <label
                  htmlFor="workType"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Work Type
                </label>
                <div className="relative">
                  <select
                    id="workType"
                    value={workType}
                    onChange={(e) => setWorkType(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Work Type</option>
                    <option value="P">Private</option>
                    <option value="G">Government job</option>
                    <option value="S">Self employed</option>
                    <option value="C">Children</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Residence Type */}
              <div>
                <label
                  htmlFor="residenceType"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Residence Type
                </label>
                <div className="relative">
                  <select
                    id="residenceType"
                    value={residenceType}
                    onChange={(e) => setResidenceType(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Residence Type</option>
                    <option value="U">Urban</option>
                    <option value="R">Rural</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Avg Glucose */}
              <div>
                <label
                  htmlFor="avgGlucoseLevel"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Average Glucose Level
                </label>
                <input
                  id="avgGlucoseLevel"
                  type="number"
                  value={avgGlucoseLevel}
                  placeholder="Enter your Glucose level"
                  onChange={(e) => setAvgGlucoseLevel(e.target.value)}
                  className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* BMI */}
              <div>
                <label
                  htmlFor="bmi"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  BMI
                </label>
                <input
                  id="bmi"
                  type="number"
                  value={bmi}
                  placeholder="Enter your BMI"
                  onChange={(e) => setBmi(e.target.value)}
                  className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              {/* Smoking Status */}
              <div>
                <label
                  htmlFor="smokingStatus"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Smoking Status
                </label>
                <div className="relative">
                  <select
                    id="smokingStatus"
                    value={smokingStatus}
                    onChange={(e) => setSmokingStatus(e.target.value)}
                    className="w-full bg-gray-800/80 border border-white/10 rounded-lg px-4 py-3 text-white
                             focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none"
                  >
                    <option value="">Smoking Status</option>
                    <option value="S">Smokes</option>
                    <option value="F">Formerly Smoked</option>
                    <option value="N">Never Smoked</option>
                    <option value="U">Unknown</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Predict Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || strokePredict}
                className="px-8 py-4 text-white font-semibold rounded-xl shadow-lg
                           bg-gradient-to-r from-orange-500 to-rose-600
                           hover:shadow-xl transform hover:scale-105 transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
              >
                {strokePredict ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Predict Stroke Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {prediction != null && probability != null && (
            <div className="mt-8 p-6 bg-gray-800/80 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">
                Prediction Result
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-900/70 border border-white/10">
                  <p className="text-sm text-gray-400">Prediction</p>
                  <p className="text-2xl font-bold mt-1">
                    {riskLabelFormat(probability)}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/70 border border-white/10">
                  <p className="text-sm text-gray-400">Probability</p>
                  <p className="text-2xl font-bold mt-1">
                    {formatResult(probability)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrokePredictPage;
