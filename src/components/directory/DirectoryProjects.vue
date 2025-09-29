<template>
    <!-- The main container is a v-card with flex-column to manage layout -->
    <v-card flat class="fill-height d-flex flex-column">

      <!-- Header Section: Replicated from your screenshot -->
      <div class="pa-2 d-flex align-center flex-shrink-0">
        <h2 class="text-h6 font-weight-regular">Projects</h2>
        <v-spacer />
        <v-btn
          color="primary"
          variant="flat"
          class="text-capitalize"
          @click="handleNewProjectClick"
        >
          New Project
        </v-btn>
      </div>

      <!-- Tabs: Replicated from your screenshot -->
      <v-tabs v-model="activeTab" density="compact" class="border-b flex-shrink-0">
        <v-tab :value="0" class="text-capitalize">Active Projects</v-tab>
        <v-tab :value="1" class="text-capitalize">Archived </v-tab>
      </v-tabs>

      <!-- Search Bar: Replicated from your screenshot -->
      <div class="pa-2 border-b flex-shrink-0">
        <v-text-field
          v-model="searchKeyword"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          clearable
        >
          <!-- The project count is now an icon inside the text field's appendix -->
          <template #append-inner>
            <div class="d-flex align-center text-medium-emphasis">
              <v-icon size="20">mdi-ballot-outline</v-icon>
              <span class="text-body-2 font-weight-medium ml-1">{{ projectsToDisplay.length }}</span>
            </div>
          </template>
        </v-text-field>
      </div>
      
      <!-- Project List Area: This section will scroll -->
      <v-card-text class="pa-0 flex-grow-1 overflow-y-auto">
        <!-- Loader State -->
        <div v-if="projectStore.isLoading" class="d-flex justify-center align-center fill-height">
          <v-progress-circular indeterminate color="primary" />
        </div>

        <!-- Empty State -->
        <div v-else-if="projectsToDisplay.length === 0" class="d-flex justify-center align-center flex-column fill-height text-medium-emphasis">
          <v-icon size="48">mdi-folder-search-outline</v-icon>
          <p class="mt-4">No Data</p>
        </div>

        <!-- The List Itself -->
        <v-list v-else nav class="pa-0">
          <DirectoryProjectInfo
            v-for="project in projectsToDisplay"
            :key="project.projectId"
            :project-info="project"
            :is-active="projectStore.activeProjectId === project.projectId"
            
            
            :is-switching="projectStore.isSwitchingProject && projectStore.activeProjectId === project.projectId"
            
            @select-project="projectStore.selectProject(project)"
            @delete-project="handleProjectDeletion"
            @pin-project="projectStore.togglePinProject(project)"
          />
        </v-list>
      </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useUserStore } from '@/stores/user';
import { useProjectStore } from '@/stores/project';
import { storeToRefs } from 'pinia';
import DirectoryProjectInfo from '@/components/common/DirectoryProjectInfo.vue'; // Make sure path is correct
import { emitter } from '@/composables/emitter';
// import { ProjectForm } from '@/components/directory/ProjectForm.vue';
// --- THE FIX for the "New Project" button ---
// This line declares that this component can send an 'open-project-form' message.
const emit = defineEmits(['open-project-form']);

// --- Store Setup ---
const userStore = useUserStore();
const projectStore = useProjectStore();

// This makes the project lists reactive in our component
const { activeProjects, archivedProjects } = storeToRefs(projectStore);

// --- Local State ---
const activeTab = ref(0);
const searchKeyword = ref('');

// --- Computed Properties for Display Logic ---
const projectsToDisplay = computed(() => {
    const list = activeTab.value === 0 ? activeProjects.value : archivedProjects.value;
    if (!searchKeyword.value) return list;
    const searchLower = searchKeyword.value.toLowerCase().trim();
    return list.filter(p => 
        p.projectName.toLowerCase().includes(searchLower) ||
        p.jobNumber.toLowerCase().includes(searchLower)
    );
});

// --- Methods for Handling Events ---
function handleProjectDeletion(projectId: number) {
    if (confirm('Are you sure you want to delete this project?')) {
        projectStore.deleteProject(projectId);
    }
}


function handleNewProjectClick() {
  // TEST #2: Add this console.log
  console.log('STEP 2: handleNewProjectClick is running, about to emit...');
  emit('open-project-form');
}

// function openForm() {
//   console.log('Broadcasting global event: open-project-form');
  
//   // This sends the message out to the entire application
//   emitter.emit('open-project-form', userStore.user?.companyId || 0, 'Create Project');
// }


// --- Lifecycle Logic to Fetch Initial Data ---
// This watcher waits for the user to be logged in, then fetches the projects.

watch(() => userStore.user?.companyId, (newCompanyId) => {
    console.log(`DirectoryProjects sees company ID changed to: ${newCompanyId}`);
    
    // If there is a new, valid company ID, it's time to fetch projects.
    // This works for both initial login and for every company switch.
    if (newCompanyId) {
        projectStore.fetchAllProjects();
    }
}, { 
    immediate: true // This is crucial. It makes the watcher run immediately when the component is created.
});



// watch(() => userStore.user, (newUser) => {
//     if (newUser && projectStore.allProjects.length === 0) {
//         projectStore.fetchAllProjects();
//     }
// }, { immediate: true });
</script>

<style scoped>
/* Scoped styles to prevent conflicts and ensure correct layout */
.border-b { 
  border-bottom: 1px solid #e0e0e0; 
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.flex-grow-1 {
  flex-grow: 1;
}
.overflow-y-auto {
  overflow-y: auto;
}
.text-medium-emphasis {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}
</style>