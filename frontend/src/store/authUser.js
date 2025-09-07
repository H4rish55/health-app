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
    isAuthenticated: false,
    isForgotPassword: false,
    isResetPassword: false,
    message: null,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials)
            set({ user: response.data.user, isAuthenticated: true, isSigningUp: false })
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
            set({ user: response.data.user, isAuthenticated: true, isLogginIn: false })
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
            set({ user: null, isAuthenticated: false, isLogginOut: false })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
        }
    },

    authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response = await axios.get('/api/v1/auth/auth-check')
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ isCheckingAuth: false, isAuthenticated: false, user: null })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({isVerifyingEmail: true})
        try {
            const response = await axios.post("/api/v1/auth/verify-email", { code })
            set({ user: response.data.user, isAuthenticated: true, isVerifyingEmail: false })
            toast.success("Email verification successfull")
            return response.data
        } catch (error) {
            toast.error(error.response.data.message || "Verification failed")
            set({ isVerifyingEmail: false, user: null })
        }
    },

    forgotPassword: async (email) => {
        set({ message: null, isForgotPassword: true })
        try {
            const response = await axios.post("/api/v1/auth/forgot-password", { email })
            set({ message: response.data.message, isForgotPassword: false })
        } catch (error) {
            set({ isForgotPassword: false })
            toast.error(error.response.data.message || "Error sending reset password email")
        }
    },

    resetPassword: async (token, password) => {
        set({ isResetPassword: true })
        try {
            const response = await axios.post(`/api/v1/auth/reset-password/${token}`, { password })
            set({ message: response.data.message, isResetPassword: false })
        } catch (error) {
            set({ isResetPassword: false })
            toast.error(error.response.data.message || "Error in reseting password")
        }
    }
}))