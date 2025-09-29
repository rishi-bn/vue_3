<template>
  <!-- 1. The main transition for the entire component. FADE is the simplest "pop-up" effect. -->
  <v-fade-transition>
    <div v-if="isChatOpen" class="chatbot-container">
      
      <!-- Minimized State: The Floating Action Button -->
      <v-fab
        v-if="isMinimized"
        key="fab"
        icon="mdi-robot-happy-outline"
        location="bottom right"
        size="large"
        app
      appear
      class="ma-0"
        color="primary"
        @click="isMinimized = false"
      />

      <!-- Open State: The Main Chat Window -->
      <v-card
        v-else
        key="card"
        class="d-flex flex-column"
        elevation="12"
        width="400"
        height="600"
      >
        <!-- Header -->
        <v-toolbar color="primary" density="compact" >
          <v-avatar class="ml-2 mr-3" size="30"  />
          <v-toolbar-title class="font-weight-bold text-body-1">VIRTUELE AI Assistant</v-toolbar-title>
          <v-btn icon="mdi-window-minimize" size="small" @click="isMinimized = true" />
          <v-btn icon="mdi-close" size="small" @click="isCloseConfirmVisible = true" />
        </v-toolbar>

        <!-- Message Area - THIS PART IS FIXED -->
        <v-card-text class="pa-4 flex-grow-1 overflow-y-auto">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="d-flex mb-3"
            :class="message.sender === 'user' && 'justify-end'"
          >
            <div class="d-flex" style="max-width: 85%;">
              <v-avatar v-if="message.sender === 'bot'" size="32" class="mr-2" image="https://cm4-production-assets.s3.amazonaws.com/1706784828518-virtuele-2.png" />
              <div
                class="pa-2 rounded-lg"
                :class="message.sender === 'user' ? 'bg-primary rounded-tr-0' : 'bg-grey-lighten-3 rounded-tl-0'"
              >
                <!-- This part was missing from my previous code, I am very sorry. -->
                <p v-if="!message.isLoading" class="ma-0 text-body-2">
                  {{ message.text }}
                </p>
                <div v-else class="d-flex align-center">
                  <v-progress-circular indeterminate size="20" width="2" />
                </div>
              </div>
            </div>
          </div>
        </v-card-text>

        <!-- Input Area - THIS PART IS FIXED -->
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

        <!-- In-Window Confirmation Overlay -->
        <v-overlay
          v-model="isCloseConfirmVisible"
          contained
          scrim="#333"
          class="d-flex align-center justify-center text-center"
        >
          <div>
            <h3 class="text-h6 mb-6">Are you sure you want to close the chat?</h3>
            <v-btn color="primary" variant="flat" @click="closeChat" class="mx-2">Yes</v-btn>
            <v-btn variant="outlined" @click="isCloseConfirmVisible = false" class="mx-2">No</v-btn>
          </div>
        </v-overlay>
      </v-card>
    </div>
  </v-fade-transition>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useChatBotStore } from '@/stores/chatBot/chatbot'; // Adjust path if needed

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const chatBotStore = useChatBotStore();
const isMinimized = ref(false);
const isCloseConfirmVisible = ref(false);
const isLoading = ref(false);
const newMessage = ref('');
const messages = ref<{id?: number, sender: string, text: string, isLoading?: boolean}[]>([
  { sender: 'bot', text: 'Hello! How can I assist you today?' }
]);
const messageAreaRef = ref<HTMLElement | null>(null);

const isChatOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

watch(() => props.modelValue, (isOpen) => { if (isOpen) isMinimized.value = false; });
watch(messages, () => { nextTick(() => { if (messageAreaRef.value) messageAreaRef.value.scrollTop = messageAreaRef.value.scrollHeight; }); }, { deep: true });

// This is the correct, fast-acting sendMessage function
async function sendMessage() {
  const query = newMessage.value.trim();
  if (!query || isLoading.value) return;
  messages.value.push({ sender: 'user', text: query });
  newMessage.value = '';
  const loadingId = Date.now();
  messages.value.push({ id: loadingId, sender: 'bot', text: '', isLoading: true });
  isLoading.value = true;
  try {
    const responseText = await chatBotStore.sendMessage(query);
    const index = messages.value.findIndex(m => m.id === loadingId);
    if (index !== -1) {
      messages.value.splice(index, 1, { sender: 'bot', text: responseText, isLoading: false });
    }
  } catch (error) {
    const index = messages.value.findIndex(m => m.id === loadingId);
    if (index !== -1) {
      messages.value.splice(index, 1, { sender: 'bot', text: 'Sorry, an error occurred.', isLoading: false });
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
/* Simplified CSS */
.chatbot-container { 
  position: fixed; 
  bottom: 16px; 
  right: 16px; 
  z-index: 2000; 
  width: 400px;
  height: 600px;
}
</style>