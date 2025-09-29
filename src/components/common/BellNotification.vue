<template>
  <!-- The v-menu is the root. It handles the open/close logic. -->
  <v-menu
    v-model="isMenuOpen"
    location="bottom end"
    :close-on-content-click="false"
    offset="10"
  >
    <!-- 1. The Activator: The Bell Icon with a Badge -->
    <template #activator="{ props }">
      <v-badge
        content="0"
        color="primary"
        offset-x="8"
        offset-y="10"
      >
        <v-btn
          icon="mdi-bell-outline"
          v-bind="props"
        />
      </v-badge>
    </template>
    
    <!-- 2. The Panel Content: A single v-card with the exact layout -->
    <v-card width="400" height="800" class="notification-card">
      <!-- Header Section -->
      <div class="d-flex align-center pa-2 border-b">
        <v-avatar color="primary" size="32" class="ml-2 mr-4">
          <v-icon icon="mdi-bell-outline" color="white"></v-icon>
        </v-avatar>
        <h6 class="text-body-1 font-weight-medium">Notification</h6>
        <v-spacer />
        <v-btn
          size="small"
          variant="flat"
          color="primary"
          class="text-capitalize"
        >
          Mark all as read
        </v-btn>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          class="ml-2"
          @click="isMenuOpen = false"
        />
      </div>

      <!-- Body Section: The "No notifications" message -->
      <div class="text-center pa-16">
        <v-img
          class="mx-auto mb-4"
          width="200"
          src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/bellnotification/nobellnotification.svg"
        />
        <p class="text-body-2 text-grey">No notifications right now</p>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// The only script needed is a simple ref to control the menu's visibility.
const isMenuOpen = ref(false);
</script>

<style scoped>
/* A little bit of CSS to ensure the border is correct */
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
</style>