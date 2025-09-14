import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

export const useChatStore = create((set) => ({
    isChatting: false,
    reply: null,
    usage: null,
    chatbot: async (input) => {
        set({ isChatting: true })
        try {
            const response = await axios.post("/api/v1/chat/chatbot", input)
            set({ reply: response.data.reply,usage: response.data.usage, isChatting: false })
            return response.data.reply
        } catch (error) {
            toast.error(error.response.data.message || "Failed to connect to chatBot")
            set({ isChatting: false, reply: null, usage: null })
            console.log("Error in useChatStore:", error.message)
            throw error
        }
    }
}));