import React, { useState } from "react";

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

  return (
    <div>
      <form>
        <div>
          <div>
            {/* Age Input */}
            <div>
              <label htmlFor="age" className="">
                <svg>
                  <path />
                </svg>
                Age
              </label>
              <input
                type="text"
                name="age"
                className=""
                placeholder="Enter your age"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            {/* Sex input */}
            <div>
              <label htmlFor="sex" className="">
                <svg>
                  <path />
                </svg>
                Sex
              </label>
              <input
                type="text"
                name="sex"
                className=""
                placeholder="Select your gender"
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />
            </div>

            {/* Chest pain Input */}
            <div>
              <label htmlFor="chestPain" className="">
                <svg>
                  <path />
                </svg>
                Chest Pain Type
              </label>
              <input
                type="text"
                name="chestPain"
                className=""
                placeholder="Select your chest pain type"
                id="chestPain"
                value={chestPainType}
                onChange={(e) => setChestPainType(e.target.value)}
              />
            </div>

            {/* Resting Bp Input */}
            <div>
              <label htmlFor="restingBp" className="">
                <svg>
                  <path />
                </svg>
                Resting Bp
              </label>
              <input
                type="text"
                name="restingBp"
                className=""
                placeholder="Enter your resting Blood pressure"
                id="restingBp"
                value={restingBp}
                onChange={(e) => setRestingBp(e.target.value)}
              />
            </div>

            {/* Cholesterol Input */}
            <div>
              <label htmlFor="cholesterol" className="">
                <svg>
                  <path />
                </svg>
                Cholesterol
              </label>
              <input
                type="text"
                name="cholesterol"
                className=""
                placeholder="Enter your Cholesterol level"
                id="cholesterol"
                value={cholesterol}
                onChange={(e) => setCholesterol(e.target.value)}
              />
            </div>

            {/* fasting Bs Input */}
            <div>
              <label htmlFor="fastingBs" className="">
                <svg>
                  <path />
                </svg>
                Fasting Bs
              </label>
              <input
                type="text"
                name="fastingBs"
                className=""
                placeholder="Enter your Fasting blood sugar level"
                id="fastingBs"
                value={fastingBs}
                onChange={(e) => setFastingBs(e.target.value)}
              />
            </div>

            {/* resting Ecg Input */}
            <div>
              <label htmlFor="restingEcg" className="">
                <svg>
                  <path />
                </svg>
                Resting Ecg
              </label>
              <input
                type="text"
                name="restingEcg"
                className=""
                placeholder="Select your Resting Ecg level"
                id="restingEcg"
                value={restingEcg}
                onChange={(e) => setRestingEcg(e.target.value)}
              />
            </div>

            {/* max Hr Input */}
            <div>
              <label htmlFor="maxHr" className="">
                <svg>
                  <path />
                </svg>
                Max Hr
              </label>
              <input
                type="text"
                name="maxHr"
                className=""
                placeholder="Enter your maximum Heart rate"
                id="maxHr"
                value={maxHr}
                onChange={(e) => setMaxHr(e.target.value)}
              />
            </div>

            {/* Exercise Angina Input */}
            <div>
              <label htmlFor="exerciseAngina" className="">
                <svg>
                  <path />
                </svg>
                Exercise Angina
              </label>
              <input
                type="text"
                name="exerciseAngina"
                className=""
                placeholder="Do you have Exercise Angine"
                id="exerciseAngina"
                value={exerciseAngina}
                onChange={(e) => setExerciseAngina(e.target.value)}
              />
            </div>

            {/* Old Peak Input */}
            <div>
              <label htmlFor="oldPeak" className="">
                <svg>
                  <path />
                </svg>
                Old Peak
              </label>
              <input
                type="text"
                name="oldPeak"
                className=""
                placeholder="Enter your Old peak"
                id="oldPeak"
                value={oldPeak}
                onChange={(e) => setOldPeak(e.target.value)}
              />
            </div>

            {/* St SlopeInput */}
            <div>
              <label htmlFor="stSlope" className="">
                <svg>
                  <path />
                </svg>
                St Slope
              </label>
              <input
                type="text"
                name="stSlope"
                className=""
                placeholder="Select your st slope"
                id="stSlope"
                value={stSlope}
                onChange={(e) => setStSlope(e.target.value)}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeartPredictPage;
