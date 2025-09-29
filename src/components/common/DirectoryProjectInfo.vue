<template>
  <div> <!-- Add a root div to hold both the list item and the dialog -->
    <v-list-item
      class="pa-0 b-b" 
      :class="{ 'activeList': props.isActive, 'switching': props.isSwitching }"
      @click="emit('select-project', props.projectInfo)"
    >
      <!-- Overlay for switching state -->
      <v-overlay
        :model-value="props.isSwitching"
        contained
        class="align-center justify-center"
      >
        <v-progress-circular indeterminate size="24" />
      </v-overlay>

      <v-row class="ma-0 align-center">
        <v-col class="py-1 pl-3 pr-1 k-cursor-pointer" cols="10">
          <h5 class="mb-1 mt-1 text-break text-body-2 font-weight-medium lh-18">
            {{ props.projectInfo.projectName }}
          </h5>
          <h6 class="mb-0 text-caption primary-text-2 font-weight-medium">
            Job# <span class="black--text">{{ props.projectInfo.jobNumber }}</span>
          </h6>
        </v-col>
        
        <v-col class="pa-2 pl-1 pr-1 d-flex align-center justify-end" cols="2">
          <v-img v-if="props.projectInfo.isPinned" max-width="13" class="mr-1" src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/common/pin_cover.svg" />
          <v-menu v-if="props.isActive">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" size="small" @click.stop />
            </template>
            <v-list class="pa-0" density="compact">
              <!-- THE FIX: This now calls a local method to open the confirmation dialog -->
              <v-list-item @click.stop="openDeleteDialog">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
              <v-divider />
              <v-list-item @click.stop="emit('pin-project', props.projectInfo)">
                <v-list-item-title>{{ props.projectInfo.isPinned ? "Unpin" : "Pin" }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-list-item>

    <!-- THE FIX: The dialog is a sibling to the v-list-item, controlled by a local ref -->
    <CancelPromptDialog
      v-model="isDeleteDialogOpen"
      alert-text="Are you sure you want to delete the project?"
      alert-btn="Delete"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'; // Import ref
import type { Project } from '@/stores/project';
import CancelPromptDialog from '@/components/common/CancelPromptDialog.vue'; 

const props = defineProps<{
  projectInfo: Project;
  isActive: boolean;
  isSwitching: boolean;
}>();

const emit = defineEmits<{
  (e: 'select-project', project: Project): void;
  (e: 'delete-project', projectId: number): void;
  (e: 'pin-project', project: Project): void;
}>();

// --- THE FIX: Add local state to control the dialog's visibility ---
const isDeleteDialogOpen = ref(false);

/**
 * This function is called when the user clicks "Delete" in the menu.
 * It simply sets our local ref to true, which opens the dialog.
 */
function openDeleteDialog() {
  isDeleteDialogOpen.value = true;
}

/**
 * This function is called when the user clicks "Delete" (or "Yes") inside the dialog.
 * The dialog emits the 'confirm' event, which triggers this handler.
 */
function handleDeleteConfirm() {
  // Now that we have confirmation, we emit the final 'delete-project' event
  // up to the parent component (DirectoryProjects.vue).
  emit('delete-project', props.projectInfo.projectId);
  // The dialog will close itself automatically.
}
</script>

<style scoped>
/* Your existing styles are correct */
.activeList {
  box-shadow: inset 3px 0 0 #3667d9 !important;
  background-color: #f3f6ff !important;
}
.activeList h5 { color: #2583fd !important; }
.k-cursor-pointer { cursor: pointer; }
.b-b { border-bottom: 1px solid #e0e0e0; }
.switching { filter: blur(1px); opacity: 0.7; }
</style>