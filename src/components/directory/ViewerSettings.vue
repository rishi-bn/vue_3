<template>
  <div class="d-flex align-center justify-center fill-height">
    <v-card flat class="pa-12 text-center bg-transparent">
      <v-img src="@/assets/logo.svg" height="60" contain />
      <div class="d-flex align-center justify-center mt-6">
        <v-icon color="success" size="x-large" class="mr-2">mdi-check-circle</v-icon>
        <p class="text-h6 font-weight-regular">{{ statusText }}</p>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{ statusText: string }>();
</script>