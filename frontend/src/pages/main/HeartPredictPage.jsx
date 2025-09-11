import React, { useState } from "react";
import { usePredictStore } from "../../store/predictStore";

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

  const { heart } = usePredictStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const res = await heart({
        age,
        sex,
        chestPainType,
        restingBp,
        cholesterol,
        fastingBs,
        restingEcg,
        maxHr,
        exerciseAngina,
        oldPeak,
        stSlope,
      });

      console.log(res)
    } catch (error) {
      console.log(error.message);
    }
  };

  handleSubmit()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden p-6">
      {/* Background Glow */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,119,198,0.2), transparent 60%),
            radial-gradient(circle at 80% 70%, rgba(120,219,226,0.2), transparent 60%)
          `,
        }}
      />
      <form className="relative z-10 max-w-3xl w-full bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-pink-400 mb-6 text-center animate-pulse">
          Heart Disease Prediction
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-gray-200 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Sex */}
          <div>
            <label htmlFor="sex" className="block text-gray-200 mb-1">
              Sex
            </label>
            <select
              id="sex"
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          {/* Chest Pain Type */}
          <div>
            <label htmlFor="chestPainType" className="block text-gray-200 mb-1">
              Chest Pain Type
            </label>
            <select
              id="chestPainType"
              value={chestPainType}
              onChange={(e) => setChestPainType(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            >
              <option value="">Select Chest Pain Type</option>
              <option value="ATA">ATA</option>
              <option value="NAP">NAP</option>
              <option value="ASY">ASY</option>
              <option value="TA">TA</option>
            </select>
          </div>

          {/* Resting BP */}
          <div>
            <label htmlFor="restingBp" className="block text-gray-200 mb-1">
              Resting BP
            </label>
            <input
              type="number"
              id="restingBp"
              value={restingBp}
              onChange={(e) => setRestingBp(e.target.value)}
              placeholder="Enter Resting BP"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Cholesterol */}
          <div>
            <label htmlFor="cholesterol" className="block text-gray-200 mb-1">
              Cholesterol
            </label>
            <input
              type="number"
              id="cholesterol"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              placeholder="Enter Cholesterol level"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Fasting BS */}
          <div>
            <label htmlFor="fastingBs" className="block text-gray-200 mb-1">
              Fasting Blood Sugar
            </label>
            <input
              type="number"
              id="fastingBs"
              value={fastingBs}
              onChange={(e) => setFastingBs(e.target.value)}
              placeholder="Enter Fasting BS (0/1)"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Resting ECG */}
          <div>
            <label htmlFor="restingEcg" className="block text-gray-200 mb-1">
              Resting ECG
            </label>
            <select
              id="restingEcg"
              value={restingEcg}
              onChange={(e) => setRestingEcg(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            >
              <option value="">Select ECG</option>
              <option value="Normal">Normal</option>
              <option value="ST">ST</option>
              <option value="LVH">LVH</option>
            </select>
          </div>

          {/* Max HR */}
          <div>
            <label htmlFor="maxHr" className="block text-gray-200 mb-1">
              Max HR
            </label>
            <input
              type="number"
              id="maxHr"
              value={maxHr}
              onChange={(e) => setMaxHr(e.target.value)}
              placeholder="Enter Max Heart Rate"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* Exercise Angina */}
          <div>
            <label
              htmlFor="exerciseAngina"
              className="block text-gray-200 mb-1"
            >
              Exercise Angina
            </label>
            <select
              id="exerciseAngina"
              value={exerciseAngina}
              onChange={(e) => setExerciseAngina(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            >
              <option value="">Select Option</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </div>

          {/* Old Peak */}
          <div>
            <label htmlFor="oldPeak" className="block text-gray-200 mb-1">
              Old Peak
            </label>
            <input
              type="number"
              step="0.1"
              id="oldPeak"
              value={oldPeak}
              onChange={(e) => setOldPeak(e.target.value)}
              placeholder="Enter Old Peak"
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            />
          </div>

          {/* ST Slope */}
          <div>
            <label htmlFor="stSlope" className="block text-gray-200 mb-1">
              ST Slope
            </label>
            <select
              id="stSlope"
              value={stSlope}
              onChange={(e) => setStSlope(e.target.value)}
              className="w-full p-3 rounded-xl bg-gray-800 text-white focus:ring-2 focus:ring-pink-400 transition"
            >
              <option value="">Select ST Slope</option>
              <option value="Up">Up</option>
              <option value="Flat">Flat</option>
              <option value="Down">Down</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeartPredictPage;
