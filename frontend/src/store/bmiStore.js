import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useBmiStore = create((set) => ({
    bmiInPounds: false,
    bmiInKgs: false,
    data: null,
    bmikg: async (input) => {
        set({ bmiInKgs: true })
        try {
            const response = await axios.post("/api/v1/bmi/kgs", input)
            set({ data: response.data.data, bmiInKgs: false })
        } catch (error) {
            toast.error(error.response.data.message || "Error in calculating bmi")
            set({ bmiInKgs: false, data: null })
            console.log("Error in bmi in kgs store:", error.message)
        }
    },
    bmipound: async (input) => {
        set({ bmiInPounds: true })
        try {
            const response = await axios.post("/api/v1/bmi/pounds", input)
            set({ data: response.data.data, bmiInPounds: false })
        } catch (error) {
            toast.error(error.response.data.message || "Error in calculating bmi")
            set({ bmiInPounds: false, data: null })
            console.log("Error in bmi in Pounds store:", error.message)
        }
    }
}))