<template>
  <!-- TEMPLATE: This is a direct, 1-to-1 copy of your Vue 2 template structure. -->
  <!-- We use a computed property 'dialogVisible' to control the dialog via v-model from the parent. -->
  <v-dialog
    v-model="dialogVisible"
    persistent
    max-width="425"
    @keydown.esc="handleCancel"
    @keydown.enter="handleConfirm"
  >
    <v-card>
      <v-list-item class="pa-4">
        <!-- v-list-item-action is replaced with the prepend slot in Vuetify 3 -->
        <template v-slot:prepend>
          <v-avatar color="red" class="mr-7">
            <v-icon dark>mdi-alert</v-icon>
          </v-avatar>
        </template>

        <!-- v-list-item-content is now the default slot -->
        <div>
          <p class="text-body-2 fs-13 mb-3">{{ alertText }}</p>
          <v-list-item-subtitle>
            <span class="d-inline-block pa-1 px-3 rounded-sm red lighten-5 red--text text--lighten-1 text-body-2 font-italic">
              This action cannot be undone
            </span>
          </v-list-item-subtitle>
        </div>
      </v-list-item>

      <v-divider />
      <v-card-actions class="bg-f5">
        <v-spacer />
        <!-- Vue 2 props like 'small' and 'outlined' are now 'size' and 'variant' -->
        <v-btn
          color="black"
          class="text-capitalize mr-2 bg-ff"
          size="small"
          variant="outlined"
          @click="handleCancel"
        >
          No
        </v-btn>
        <v-btn
          color="indigo"
          class="text-capitalize bg-ff"
          size="small"
          variant="outlined"
          @click="handleConfirm"
        >
          {{ alertBtn }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue';

// --- PROPS (Data passed down from the parent) ---
const props = withDefaults(defineProps<{
  modelValue: boolean; // This is the prop for v-model
  alertText: string;
  alertBtn?: string; // Optional prop for the confirm button text
}>(), {
  alertBtn: 'Yes', // Set a default value for the button text
});

// --- EMITS (Events sent up to the parent) ---
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void; // Required for v-model
  (e: 'confirm'): void; // Emitted when the user clicks "Yes"
  (e: 'cancel'): void;  // Emitted when the user clicks "No" or presses Esc
}>();

// --- STATE ---
// This computed property is the standard way to handle v-model in a child component.
// It links the dialog's visibility directly to the parent's state.
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

// --- METHODS ---

/**
 * Handles the confirmation action.
 * Emits the 'confirm' event and then closes the dialog.
 */
function handleConfirm() {
  emit('confirm');
  dialogVisible.value = false;
}

/**
 * Handles the cancellation action.
 * Emits the 'cancel' event and then closes the dialog.
 */
function handleCancel() {
  emit('cancel');
  dialogVisible.value = false;
}

// NOTE: We no longer need the 'viewDialog' method.
// The parent component now controls this dialog by simply changing the value
// of the variable it passed into v-model.
</script>

<style scoped>
/* Scoped styles are better practice if the styles are only for this component */
.fs-13 {
  font-size: 13px;
}
.bg-f5 {
  background-color: #f5f5f5;
}
.bg-ff {
  background-color: #ffffff;
}
</style>