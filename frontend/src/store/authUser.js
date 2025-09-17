import toast from 'react-hot-toast'
import { create } from 'zustand'
import { api } from '../lib/api'

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
    error: null,
    signup: async (credentials) => {
        set({isSigningUp: true})
        try {
            const response = await api.post("/v1/auth/signup", credentials)
            set({ user: response.data.user, isAuthenticated: true, isSigningUp: false, role: response.data.user.role })
            toast.success("Account created successfully")
            return { ok: true }
        } catch (error) {
            toast.error(error.response.data.message || "SignUp failed")
            set({ isSigningUp: false, user: null })
        }
    },

    login: async (credentials) => {
        set({isLogginIn: true})
        try {
            const response = await api.post("/v1/auth/login", credentials)
            set({ user: response.data.user, isAuthenticated: true, isLogginIn: false, role: response.data.user.role })
            toast.success("Logged In successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Login Failed")
            set({ isLogginIn: false, user: null })
            return { ok: false }
        }
    },

    logout: async () => {
        set({ isLogginOut: true })
        try {
            await api.post("/v1/auth/logout")
            set({ user: null, isAuthenticated: false, isLogginOut: false })
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error(error.response.data.message || "Logout failed")
        }
    },

    authCheck: async () => {
        set({isCheckingAuth: true})
        try {
            const response = await api.get('/v1/auth/auth-check')
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false, role: response.data.user?.role ?? null })
        } catch (error) {
            set({ isCheckingAuth: false, isAuthenticated: false, user: null })
            throw error
        }
    },

    verifyEmail: async (code) => {
        set({isVerifyingEmail: true})
        try {
            const response = await api.post("/v1/auth/verify-email", { code })
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
            const response = await api.post("/v1/auth/forgot-password", { email })
            set({ message: response.data.message, isForgotPassword: false })
        } catch (error) {
            set({ isForgotPassword: false })
            toast.error(error.response.data.message || "Error sending reset password email")
        }
    },

    resetPassword: async (token, password) => {
        set({ isResetPassword: true, error: null })
        try {
            const response = await api.post(`/v1/auth/reset-password/${token}`, { password })
            set({ message: response.data.message, isResetPassword: false })
        } catch (error) {
            set({ isResetPassword: false, error: error.response.data.message })
            toast.error(error.response.data.message || "Error in reseting password")
        }
    }
}))