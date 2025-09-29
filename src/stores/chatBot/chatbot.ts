// FILE: src/stores/chatbot.ts
import { defineStore } from 'pinia';
import api from '@/services/api';
import { useCommon } from '@/composables/useCommon';

export const useChatBotStore = defineStore('chatbot', () => {
    const { catchAlert } = useCommon();

    async function sendMessage(query: string): Promise<string> {
        try {
            const response = await api.post<{ answer: string }>('api/chat-bot', { query });
            return response.data.answer || "Sorry, I didn't understand that.";
        } catch (error) {
            const message = catchAlert(error);
            return message || "An error occurred while fetching the response.";
        }
    }

    return { sendMessage };
});