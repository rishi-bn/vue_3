<template>
  <!-- <v-app class="appcss"> -->
  <v-app class="appcss">
    <v-main>
      <v-container fluid>
        <router-view />
           <v-snackbar
      v-model="appStore.snackbar.show"
      :color="appStore.snackbar.color"
      :timeout="4000"
      location="top right"
    >
      {{ appStore.snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="appStore.hideSnackbar">Close</v-btn>
      </template>
    </v-snackbar>
    
    <!-- You might also have a global loader here -->
    <v-overlay
      v-model="appStore.screenLoader"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-overlay>
      </v-container>
    </v-main>
     <ChatBot v-model="uiStore.isChatbotVisible" />
  </v-app>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import { emitter } from '@/composables/emitter';
import { useAppStore } from '@/stores/app';
import { useUiStore } from '@/stores/chatBot/ui';
import ChatBot from '@/components/common/chatBot.vue'; 

const uiStore = useUiStore();
const appStore = useAppStore();

// const webSocketStore = useWebSocketStore();
// const authStore = useAuthStore();

// Define the function that will handle the event
const showSnackbar = (payload: [string, string]) => {
  const [type, message] = payload;
  console.log(`Showing snackbar: ${type} - ${message}`);
  // Your actual snackbar logic here
};

onMounted(() => {
  // Start listening when the component is mounted
  emitter.on('viewsnackbar', showSnackbar);
});

onBeforeUnmount(() => {
  // Stop listening when the component is unmounted to prevent memory leaks
  emitter.off('viewsnackbar', showSnackbar);
});

// if (authStore.idToken) {
//   webSocketStore.connect().catch(err => {
//     console.error("Initial WebSocket connection failed.", err);
//   });
// }

</script>
