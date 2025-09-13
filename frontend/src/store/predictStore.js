import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const usePredictStore = create((set) => ({
    data: null,
    prediction: null,
    probability: null,
    strokePredict: false,
    diabetesPredict: false,
    heartPredict: false,
    stroke: async (input) => {
        set({ strokePredict: true })
        try {
            const response = await axios.post("/api/v1/predict/stroke", input)
            set({prediction: response.data.prediction, probability: response.data.probability, data: response.data.data, strokePredict: false})
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || "Stroke prediction Failed")
            set({strokePredict: false, prediction: null, probability: null, data: null })
            console.log("Error in Stroke predict store:", error.message)
            throw error
        }
    },

    diabetes: async (input) => {
        set({ diabetesPredict: true })
        try {
            const response = await axios.post("/api/v1/predict/diabetes", input)
            set({prediction: response.data.prediction, probability: response.data.probability, data: response.data.data, diabetesPredict: false})
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || "Diabetes prediction failed")
            set({diabetesPredict: false, prediction: null, probability: null, data: null})
            console.log("Error in diabetes predict store:", error.message)
            throw error
        }
    },

    heart: async (input) => {
        set({ heartPredict: true })
        try {
            const response = await axios.post("/api/v1/predict/heart", input)
            set({prediction: response.data.prediction, probability: response.data.probability, data: response.data.data, heartPredict: false})
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || "Heart disease prediction failed")
            set({heartPredict: false, prediction: null, probability: null, data: null})
            console.log("Error in heart predict store:", error.message)
            throw error 
        }
    }
}))