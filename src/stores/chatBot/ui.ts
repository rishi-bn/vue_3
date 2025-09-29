import { defineStore } from 'pinia';
import { ref } from 'vue';

// This store manages the visibility of global UI elements like the chatbot.
export const useUiStore = defineStore('ui', () => {
  const isChatbotVisible = ref(false);

  function openChatbot() {
    isChatbotVisible.value = true;
  }

  function closeChatbot() {
    isChatbotVisible.value = false;
  }

  return { isChatbotVisible, openChatbot, closeChatbot };
});