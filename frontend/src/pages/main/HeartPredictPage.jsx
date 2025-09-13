import React, { useState } from "react";
import { usePredictStore } from "../../store/predictStore";
import { HeartPulse } from "lucide-react";

const HeartPredictPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [chestPainType, setChestPainType] = useState("");
  const [restingBp, setRestingBp] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [fastingBs, setFastingBs] = useState("");
  const [restingEcg, setRestingEcg] = useState("");
  const [maxHr, setMaxHr] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState("");
  const [oldPeak, setOldPeak] = useState("");
  const [stSlope, setStSlope] = useState("");

  const isFormValid = () => {
    return (
      age &&
      sex &&
      chestPainType &&
      restingBp &&
      cholesterol &&
      fastingBs &&
      restingEcg &&
      maxHr &&
      exerciseAngina &&
      oldPeak &&
      stSlope
    );
  };

  const { heart, probability, prediction, heartPredict } = usePredictStore();

  const mapPayload = () => {
    const genderMap = { M: "Male", F: "Female" };
    const chestPainMap = { ATA: "ATA", NAP: "NAP", ASY: "ASY", TA: "TA" };
    const fastingBSMap = { N: "Normal", H: "High" }
    const ecgMap = { Normal: "Normal", ST: "ST", LVH: "LVH" };
    const exerciseAnginaMap = { Y: "Yes", N: "No" };
    const stSlopeMap = { Up: "Up", Flat: "Flat", Down: "Down" };

    return {
      age: Number(age),
      sex: genderMap[sex],
      chest_pain_type: chestPainMap[chestPainType],
      resting_bp: Number(restingBp),
      cholesterol: Number(cholesterol),
      fasting_bs: fastingBSMap[fastingBs],
      resting_ecg: ecgMap[restingEcg],
      max_hr: Number(maxHr),
      exercise_angina: exerciseAnginaMap[exerciseAngina],
      old_peak: Number(oldPeak),
      st_slope: stSlopeMap[stSlope],
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    await heart(mapPayload());
  };

  const formatResult = (p) => {
    if (p === null) return "";
    const val = p <= 1 ? p * 100 : p;
    return `${val.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section (purple -> pink theme) */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <HeartPulse className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Heart Disease Detection
          </h1>

          {/* Accuracy badge + blurb (use your card’s 96%) */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl font-bold text-fuchsia-400">96%</span>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Deep learning models analyze ECG patterns and key risk factors to
            identify potential cardiac conditions.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mt-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-fuchsia-500 to-purple-600 rounded-full"
              style={{ width: "96%" }}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age */}
              <div className="form-group">
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  placeholder="Enter Age"
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Sex */}
              <div className="form-group">
                <label htmlFor="sex" className="block text-sm font-medium text-gray-300 mb-2">
                  Sex
                </label>
                <div className="relative">
                  <select
                    id="sex"
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Chest Pain Type */}
              <div className="form-group">
                <label htmlFor="chestPainType" className="block text-sm font-medium text-gray-300 mb-2">
                  Chest Pain Type
                </label>
                <div className="relative">
                  <select
                    id="chestPainType"
                    value={chestPainType}
                    onChange={(e) => setChestPainType(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value="">Select Type</option>
                    <option value="ATA">ATA</option>
                    <option value="NAP">NAP</option>
                    <option value="ASY">ASY</option>
                    <option value="TA">TA</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Resting BP */}
              <div className="form-group">
                <label htmlFor="restingBp" className="block text-sm font-medium text-gray-300 mb-2">
                  Resting BP
                </label>
                <input
                  id="restingBp"
                  type="number"
                  value={restingBp}
                  placeholder="Enter Resting BP"
                  onChange={(e) => setRestingBp(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Cholesterol */}
              <div className="form-group">
                <label htmlFor="cholesterol" className="block text-sm font-medium text-gray-300 mb-2">
                  Cholesterol
                </label>
                <input
                  id="cholesterol"
                  type="number"
                  value={cholesterol}
                  placeholder="Enter Cholesterol"
                  onChange={(e) => setCholesterol(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Fasting BS (0/1) */}
              <div className="form-group">
                <label htmlFor="fastingBs" className="block text-sm font-medium text-gray-300 mb-2">
                  Fasting Blood Sugar
                </label>
                <div className="relative">
                  <select
                    id="fastingBs"
                    value={fastingBs}
                    onChange={(e) => setFastingBs(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value={""}>Select Fasting BS</option>
                    <option value={"N"}>Normal</option>
                    <option value={"H"}>High</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Resting ECG */}
              <div className="form-group">
                <label htmlFor="restingEcg" className="block text-sm font-medium text-gray-300 mb-2">
                  Resting ECG
                </label>
                <div className="relative">
                  <select
                    id="restingEcg"
                    value={restingEcg}
                    onChange={(e) => setRestingEcg(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value="">Select ECG</option>
                    <option value="Normal">Normal</option>
                    <option value="ST">ST</option>
                    <option value="LVH">LVH</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Max HR */}
              <div className="form-group">
                <label htmlFor="maxHr" className="block text-sm font-medium text-gray-300 mb-2">
                  Max Heart Rate
                </label>
                <input
                  id="maxHr"
                  type="number"
                  value={maxHr}
                  placeholder="Enter Max HR"
                  onChange={(e) => setMaxHr(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Exercise Angina */}
              <div className="form-group">
                <label htmlFor="exerciseAngina" className="block text-sm font-medium text-gray-300 mb-2">
                  Exercise Angina
                </label>
                <div className="relative">
                  <select
                    id="exerciseAngina"
                    value={exerciseAngina}
                    onChange={(e) => setExerciseAngina(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value="">Select Option</option>
                    <option value="Y">Yes</option>
                    <option value="N">No</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Old Peak */}
              <div className="form-group">
                <label htmlFor="oldPeak" className="block text-sm font-medium text-gray-300 mb-2">
                  Old Peak
                </label>
                <input
                  id="oldPeak"
                  type="number"
                  step="0.1"
                  value={oldPeak}
                  placeholder="ST depression (e.g., 1.5)"
                  onChange={(e) => setOldPeak(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all"
                />
              </div>

              {/* ST Slope */}
              <div className="form-group">
                <label htmlFor="stSlope" className="block text-sm font-medium text-gray-300 mb-2">
                  ST Slope
                </label>
                <div className="relative">
                  <select
                    id="stSlope"
                    value={stSlope}
                    onChange={(e) => setStSlope(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all appearance-none hover:bg-gray-650"
                  >
                    <option value="">Select ST Slope</option>
                    <option value="Up">Up</option>
                    <option value="Flat">Flat</option>
                    <option value="Down">Down</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Predict Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || heartPredict}
                className="px-8 py-4 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
              >
                {heartPredict ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
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
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Predict Heart Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          {prediction != null && probability != null && (
            <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4">Prediction Result</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-600">
                  <p className="text-sm text-gray-400">Prediction</p>
                  <p className="text-2xl font-bold mt-1">
                    {prediction === 1 ? "Heart Disease risk detected" : "No Heart Disease risk"}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-600">
                  <p className="text-sm text-gray-400">Probability</p>
                  <p className="text-2xl font-bold mt-1">{formatResult(probability)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartPredictPage;
