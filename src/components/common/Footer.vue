<template>
  <!-- The `app` prop is no longer needed in Vuetify 3. The footer's position
       is automatically handled when it's a direct child of `v-app`. -->
  <v-footer height="28" app class="bg-grey-lighten-3 px-3 py-1 border-t">
    <span class="text-caption">{{ props.footerTitle }}</span>
    <v-spacer />

    <!-- WebSocket Status Indicator -->
    <v-tooltip :text="wsStatus ? 'Real-time connection active' : 'Real-time connection lost'" location="top">
      <template #activator="{ props: tooltipProps }">
        <v-icon
          v-bind="tooltipProps"
          :color="wsStatus ? 'green' : 'red-darken-1'"
          size="x-small"
          icon="mdi-circle"
        />
      </template>
    </v-tooltip>

    <!-- Date and Time Display -->
    <v-icon size="18" class="ml-2" icon="mdi-shield-account" />
    <span class="text-caption pl-1">{{ dateAndTime }}</span>
  </v-footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import moment from 'moment';

// --- Pinia Store Import ---
// This store is the single source of truth for the WebSocket connection status.
import { useWebSocketStore } from '@/stores/websocket';

// --- Component Props ---
const props = defineProps({
  footerTitle: {
    type: String,
    required: true,
  },
});

// --- Stores ---
const webSocketStore = useWebSocketStore();

// --- Component State (from data()) ---
const dateAndTime = ref('');

// --- Computed Properties ---
// This computed property reactively checks the connection status from the store.
// If the `isConnected` value in the store changes, this icon will instantly update.
const wsStatus = computed(() => webSocketStore.isConnected);

// --- Lifecycle Hooks ---
onMounted(() => {
  // Set the date and time when the component is first rendered on the screen.
  dateAndTime.value = moment().format('dddd, MMMM Do YYYY');
});
</script>

<style scoped>
/* Scoped styles are a good practice to prevent CSS from affecting other components */
.v-footer {
  font-size: 12px; /* Ensure text is small and consistent */
}
</style>