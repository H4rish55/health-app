import React, { useState } from "react";
import { usePredictStore } from "../../store/predictStore";
import { Activity } from "lucide-react";

const DiabetesPredictPage = () => {
  const [pregnancies, setPregnancies] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bloodPressure, setBloodPressure] = useState("");
  const [skinThickness, setSkinThickness] = useState("");
  const [insulin, setInsulin] = useState("");
  const [bmi, setBmi] = useState("");
  const [diabetesPedigreeFunction, setDiabetesPedigreeFunction] = useState("");
  const [age, setAge] = useState("");

  const isFormValid = () => {
    return (
      pregnancies &&
      glucose &&
      bloodPressure &&
      skinThickness &&
      insulin &&
      bmi &&
      diabetesPedigreeFunction &&
      age
    );
  };

    const { diabetes, prediction, probability, diabetesPredict } =
    usePredictStore();

  const mapPayload = () => {
    return {
        pregnancies: Number(pregnancies),
        glucose: Number(glucose),
        blood_pressure: Number(bloodPressure),
        skin_thickness: Number(skinThickness),
        insulin: Number(insulin),
        bmi: Number(bmi),
        diabetes_pedigree_function: Number(diabetesPedigreeFunction),
        age: Number(age)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!isFormValid) return

    await diabetes(mapPayload())
  }

  const formatResult = (p) => {
    if(p === null) return ""
    const val = p <= 1 ? p * 100: p
    return `${val.toFixed()}%`
  }

  

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header – blue/cyan theme */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl mb-6 shadow-lg">
            <Activity className="h-10 w-10" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Diabetes Prediction
          </h1>

          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-6xl font-bold text-cyan-400">91%</span>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Machine learning models assess glucose patterns and lifestyle factors for early detection.
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-700 rounded-full h-2 mt-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"
              style={{ width: "91%" }}
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pregnancies */}
              <div className="form-group">
                <label htmlFor="pregnancies" className="block text-sm font-medium text-gray-300 mb-2">
                  Pregnancies
                </label>
                <input
                  id="pregnancies"
                  type="number"
                  value={pregnancies}
                  placeholder="e.g., 2"
                  onChange={(e) => setPregnancies(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Glucose */}
              <div className="form-group">
                <label htmlFor="glucose" className="block text-sm font-medium text-gray-300 mb-2">
                  Glucose
                </label>
                <input
                  id="glucose"
                  type="number"
                  value={glucose}
                  placeholder="e.g., 120"
                  onChange={(e) => setGlucose(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Blood Pressure */}
              <div className="form-group">
                <label htmlFor="bloodPressure" className="block text-sm font-medium text-gray-300 mb-2">
                  Blood Pressure
                </label>
                <input
                  id="bloodPressure"
                  type="number"
                  value={bloodPressure}
                  placeholder="e.g., 70"
                  onChange={(e) => setBloodPressure(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Skin Thickness */}
              <div className="form-group">
                <label htmlFor="skinThickness" className="block text-sm font-medium text-gray-300 mb-2">
                  Skin Thickness
                </label>
                <input
                  id="skinThickness"
                  type="number"
                  value={skinThickness}
                  placeholder="e.g., 20"
                  onChange={(e) => setSkinThickness(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Insulin */}
              <div className="form-group">
                <label htmlFor="insulin" className="block text-sm font-medium text-gray-300 mb-2">
                  Insulin
                </label>
                <input
                  id="insulin"
                  type="number"
                  value={insulin}
                  placeholder="e.g., 80"
                  onChange={(e) => setInsulin(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* BMI */}
              <div className="form-group">
                <label htmlFor="bmi" className="block text-sm font-medium text-gray-300 mb-2">
                  BMI
                </label>
                <input
                  id="bmi"
                  type="number"
                  value={bmi}
                  placeholder="e.g., 27.3"
                  onChange={(e) => setBmi(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Diabetes Pedigree Function */}
              <div className="form-group">
                <label htmlFor="diabetesPedigreeFunction" className="block text-sm font-medium text-gray-300 mb-2">
                  Diabetes Pedigree Function
                </label>
                <input
                  id="diabetesPedigreeFunction"
                  type="number"
                  step="0.01"
                  value={diabetesPedigreeFunction}
                  placeholder="e.g., 0.45"
                  onChange={(e) => setDiabetesPedigreeFunction(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Age */}
              <div className="form-group">
                <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  placeholder="e.g., 45"
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Predict Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid() || diabetesPredict}
                className="px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
              >
                {diabetesPredict ? (
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
                    Predict Diabetes Risk
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results */}
          {prediction != null && probability != null && (
            <div className="mt-8 p-6 bg-gray-700 rounded-xl border border-gray-600">
              <h3 className="text-xl font-semibold text-white mb-4">Prediction Result</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-gray-800/70 border border-gray-600">
                  <p className="text-sm text-gray-400">Prediction</p>
                  <p className="text-2xl font-bold mt-1">
                    {prediction === 1 ? "Diabetes risk detected" : "No Diabetes risk"}
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

export default DiabetesPredictPage;
