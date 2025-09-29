<template>
  <!-- The entire component is wrapped in a container that is fixed to the screen -->
  <div v-if="isChatOpen" class="chatbot-container">
    <!-- 1. The Floating Action Button (FAB) - Shown when chat is open but minimized -->
    <v-fab
      v-show="isMinimized"
      icon="mdi-robot-happy-outline"
      color="blue"
      location="bottom right"
      size="large"
      app
      appear
      class="ma-0"
      @click="isMinimized = false"
    />

    <!-- 2. The Main Chat Window - Shown when chat is open and NOT minimized -->
    <v-card
      v-show="!isMinimized"
      class="chat-window"
      elevation="12"
      width="400"
      height="600"
    >
      <!-- Header -->
      <v-toolbar color="primary" density="compact">
        <v-avatar class="ml-2 mr-3" size="30" image="https://cm4-production-assets.s3.amazonaws.com/1706784828518-virtuele-2.png" />
        <v-toolbar-title class="font-weight-bold text-body-1">VIRTUELE AI Assistant</v-toolbar-title>
        
        <v-btn icon="mdi-window-minimize" size="small" @click="isMinimized = true" />
        <v-btn icon="mdi-close" size="small" @click="isCloseConfirmVisible = true" />
      </v-toolbar>

      <!-- Message Area -->
      <v-card-text class="message-area pa-4 flex-grow-1" ref="messageAreaRef">
        <div v-for="(message, index) in messages" :key="index" :class="message.sender === 'user' ? 'user-message' : 'bot-message'">
          <v-avatar v-if="message.sender === 'bot'" size="32" class="mr-2" image="https://cm4-production-assets.s3.amazonaws.com/1706784828518-virtuele-2.png" />
          <div class="message-bubble">
            <p v-if="!message.isLoading" class="ma-0">{{ message.text }}</p>
            <v-progress-circular v-else indeterminate size="20" />
          </div>
        </div>
      </v-card-text>

      <!-- Input Area -->
      <v-divider />
      <v-card-actions class="pa-2">
        <v-text-field
          v-model="newMessage"
          placeholder="Type a message..."
          variant="solo"
          flat
          dense
          hide-details
          @keydown.enter="sendMessage"
        >
          <template #append-inner>
            <v-btn icon="mdi-send" variant="text" @click="sendMessage" :disabled="isLoading" />
          </template>
        </v-text-field>
      </v-card-actions>
    </v-card>
    </div>
        <!-- 3. Close Confirmation Dialog -->
    <div class="container">
    <v-dialog v-model="isCloseConfirmVisible" persistent width ="500px">
      <v-card class="pa-4 text-center black-message-box">
        <v-card-title class="text-p5">Are you sure you want to close the chat?</v-card-title>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" variant="flat" @click="closeChat">Yes</v-btn>
          <v-btn variant="text" @click="isCloseConfirmVisible = false">No</v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
    
  
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useChatBotStore } from '@/stores/chatBot/chatbot';

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const chatBotStore = useChatBotStore();

const isMinimized = ref(false);
const isCloseConfirmVisible = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const messages = ref([ { sender: 'bot', text: 'Hello! How can I assist you today?' } ]);
const messageAreaRef = ref<HTMLElement | null>(null);

const isChatOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    isMinimized.value = false;
  }
});

watch(messages, () => {
  nextTick(() => {
    if (messageAreaRef.value) {
      messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight;
    }
  });
}, { deep: true });

async function sendMessage() {
  const query = newMessage.value.trim();
  if (!query || isLoading.value) return;

  // 1. Add user's message immediately
  messages.value.push({ sender: 'user', text: query });
  newMessage.value = '';
  
  // 2. Add the loading indicator immediately
  const loadingId = Date.now(); // Give it a unique ID
  messages.value.push({ id: loadingId, sender: 'bot', text: '', isLoading: true });
  isLoading.value = true;

  try {
    // 3. Get the response from the fast API
    const responseText = await chatBotStore.sendMessage(query);
    
    // 4. Find the loading message in the array
    const loadingMessageIndex = messages.value.findIndex(m => m.id === loadingId);
    
    if (loadingMessageIndex !== -1) {
      // 5. REPLACE the loading message with the final response.
      // This is a strong signal to Vue to update the UI immediately.
      messages.value.splice(loadingMessageIndex, 1, {
        sender: 'bot',
        text: responseText,
        isLoading: false,
      });
    }
  } catch (error) {
    // Also replace the loading message on error
    const loadingMessageIndex = messages.value.findIndex(m => m.id === loadingId);
    if (loadingMessageIndex !== -1) {
      messages.value.splice(loadingMessageIndex, 1, {
        sender: 'bot',
        text: 'Sorry, an error occurred.',
        isLoading: false,
      });
    }
  } finally {
    isLoading.value = false;
  }
}


function closeChat() {
  isCloseConfirmVisible.value = false;
  isChatOpen.value = false;
  messages.value = [{ sender: 'bot', text: 'Hello! How can I assist you today?' }];
}
</script>

<style scoped>

.chatbot-container { position: fixed; bottom: 0; right: 0; z-index: 2000; }
.chat-window { margin: 16px; display: flex; flex-direction: column; height: 500px; max-height: calc(100vh - 32px); }
.message-area { overflow-y: auto; display: flex; flex-direction: column; }
.bot-message, .user-message { display: flex; align-items: flex-start; margin-bottom: 12px; max-width: 85%; }
.user-message { align-self: flex-end; }
.message-bubble { padding: 8px 12px; border-radius: 18px; }
.bot-message .message-bubble { background-color: #f0f0f0; border-top-left-radius: 4px; }
.user-message .message-bubble { background-color: #1976D2; color: white; border-top-right-radius: 4px; margin-left: auto; }
.black-message-box { background-color: #333; color: white; }
</style>