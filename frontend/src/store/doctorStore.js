import { create } from 'zustand';
import toast from 'react-hot-toast';
import { api } from '../lib/api'

export const useDoctorStore = create((set) => ({
    data: null,
    total: null,
    limit: null,
    page: null,
    isDoctor: false,
    doctorPage: async () => {
        set({ isDoctor: true })
        try {
            const response = await api.get("/v1/doctor/patient-records")
            set({ data: response.data.data, total: response.data.total, limit: response.data.limit, page: response.data.page, isDoctor: false })
        } catch (error) {
            set({ isDoctor: false, data: null, total: null, limit: null, page: null })
            toast.error(error.response.data.message || "Error in acessing patient records")
            console.log("Error in Doctor store", error.message)
            throw error
        }
    }
}))