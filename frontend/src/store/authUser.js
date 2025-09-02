import toast from 'react-hot-toast'
import { create } from 'zustand'
import axios from 'axios'

export const useAuthStore = create((set) => ({
	user: null,
    isSigningUp: false,
    isLogginIn: false,
    isLogginOut: false,
    isVerifyingEmail: false,
    isCheckingAuth: false,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({ user: response.data.user, isSigningUp: false })
            toast.success("Account created successfully")
        } catch (error) {
            toast.error(error.response.data.message || "SignUp failed")
            set({ isSigningUp: false, user: null })
        }
    },

    login: async (credentials) => {
        set({isLogginIn: true})
        try {
            const response = await axios.post("/api/v1/auth/login", credentials)
            set({ user: response.data.user, isLogginIn: false })
            toast.success("Logged In successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login Failed")
            set({ isLogginIn: false, user: null })
        }
    },

    logout: async () => {
        set({ isLogginOut: true })
        try {
            await axios.post("/api/v1/auth/logout")
            set({ user: null, isLogginOut: false })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
        }
    },

    authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response = await axios.get('/api/v1/auth/auth-check')
            set({ user: response.data.user, isCheckingAuth: false })
        } catch (error) {
            set({ isCheckingAuth: false, user: null })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({isVerifyingEmail: true})
        try {
            const response = await axios.post("/api/v1/auth/verify-email", { code })
            set({ user: response.data.user, isVerifyingEmail: false })
            toast.success("Email verification successfull")
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || "Verification failed")
            set({ isVerifyingEmail: false, user: null })
        }
    }
}))