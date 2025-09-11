import React, { useState } from "react";
import { usePredictStore } from "../../store/predictStore";

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

  const { stroke } = usePredictStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const res = await stroke({
        gender,
        age,
        hypertension,
        heartDisease,
        everMarried,
        workType,
        residenceType,
        avgGlucoseLevel,
        bmi,
        smokingStatus,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          {/* Gender */}
          <div>
            <label htmlFor="gender" className="">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className=""
            >
              <option value="">Select Gender</option>
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
              <option value={"O"}>Other</option>
            </select>
          </div>

          {/* age */}
          <div>
            <label htmlFor="age" className="">
                Age
            </label>
            <input 
                id="age"
                type="number"
                value={age}
                placeholder="Enter your Age"
                onChange={(e) => setAge(e.target.value)}
            />
          </div>

          {/* Hypertension */}
          <div>
            <label htmlFor="hypertension" className="">
              Hypertension
            </label>
            <select
              id="hypertension"
              value={hypertension}
              onChange={(e) => setHypertension(e.target.value)}
              className=""
            >
              <option value="">Hypertension Status</option>
              <option value={"Y"}>Yes</option>
              <option value={"N"}>No</option>
            </select>
          </div>

          {/* Heart Disease*/}
          <div>
            <label htmlFor="heartDisease" className="">
              Heart Disease
            </label>
            <select
              id="heartDisease"
              value={heartDisease}
              onChange={(e) => setHeartDisease(e.target.value)}
              className=""
            >
              <option value="">Heart Disease Status</option>
              <option value={"Y"}>Yes</option>
              <option value={"N"}>No</option>
            </select>
          </div>

          {/* Ever Married */}
          <div>
            <label htmlFor="everMarried" className="">
              Ever Married
            </label>
            <select
              id="everMarried"
              value={everMarried}
              onChange={(e) => setEverMarried(e.target.value)}
              className=""
            >
              <option value="">Ever Married?</option>
              <option value={"Y"}>Yes</option>
              <option value={"N"}>No</option>
            </select>
          </div>

          {/* Work Type */}
          <div>
            <label htmlFor="workType" className="">
              Work Type
            </label>
            <select
              id="workType"
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              className=""
            >
              <option value="">Work Type</option>
              <option value={"P"}>Private</option>
              <option value={"G"}>Govt_job</option>
              <option value={"S"}>Self-employed</option>
              <option value={"C"}>children</option>
            </select>
          </div>

          {/* Residence Type */}
          <div>
            <label htmlFor="residenceType" className="">
              Residence Type
            </label>
            <select
              id="residenceType"
              value={residenceType}
              onChange={(e) => setResidenceType(e.target.value)}
              className=""
            >
              <option value="">Residence Type</option>
              <option value={"U"}>Urban</option>
              <option value={"R"}>Rural</option>
            </select>
          </div>

          {/* Avg Glucose level */}
          <div>
            <label htmlFor="avgGlucoseLevel" className="">
                Avg Glucose level
            </label>
            <input 
                id="avgGlucoseLevel"
                type="number"
                value={avgGlucoseLevel}
                placeholder="Enter your Glucose level"
                onChange={(e) => setAvgGlucoseLevel(e.target.value)}
            />
          </div>

          {/* Bmi */}
          <div>
            <label htmlFor="bmi" className="">
                Bmi
            </label>
            <input 
                id="bmi"
                type="number"
                value={bmi}
                placeholder="Enter your Bmi"
                onChange={(e) => setBmi(e.target.value)}
            />
          </div>

          {/* Smoking Status */}
          <div>
            <label htmlFor="smokingStatus" className="">
              Smoking Status
            </label>
            <select
              id="smokingStatus"
              value={smokingStatus}
              onChange={(e) => setSmokingStatus(e.target.value)}
              className=""
            >
              <option value="">Smoking Status</option>
              <option value={"S"}>smokes</option>
              <option value={"F"}>formerly smoked</option>
              <option value={"N"}>never smoked</option>
              <option value={"U"}>Unknown</option>
            </select>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StrokePredictPage;
