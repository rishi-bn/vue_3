
<template>
  <v-app>
    <Appbar @toggle-chat="toggleChat" />
    <v-navigation-drawer permanent class="leftDrawerCls">
       <DirectoryProjects @open-project-form="onFormOpenEvent" />
    </v-navigation-drawer>
    <ProjectForm v-model="isProjectFormOpen" />
    <v-main style="background-color: #f5f5f5;">
      <!-- FIX: Remove the extra wrapping card and add border/shadow directly -->
      <v-tabs v-model="activeTab" color="primary" class="border-b bg-white ">
        <v-tab value="setup">Setup project</v-tab>
        <v-tab value="manage">Manage Project</v-tab>
        <v-tab value="accelerate">Accelerate Project</v-tab>
      </v-tabs>
      <v-window v-model="activeTab">
        <!-- The background color of the content comes from v-main -->
        <v-window-item value="setup"><SetupProjectView /></v-window-item>
        <v-window-item value="manage"><ManageProjectView /></v-window-item>
        <v-window-item value="accelerate"><AccelerateProject /></v-window-item>
      </v-window>
    </v-main>
    <ProjectForm v-model="isProjectFormOpen" />
    <Footer class="footerCls" footer-title="Project Directory" />
    
    <ChatBot
      v-if="isChatVisible"
      @minimize="handleMinimize"
      @close="handleClose"
    />
    
    <!-- Minimized floating icon, also controlled by Home.vue -->
    <v-fab-transition>
        <v-btn
            v-if="isChatMinimized"
            icon
            color="primary"
            elevation="8"
            size="large"
            class="chat-minimized-fab"
            @click="handleMaximize"
        >
            <v-icon>mdi-chat-processing-outline</v-icon>
        </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Appbar from '@/components/common/Appbar.vue';
import DirectoryProjects from '@/components/directory/DirectoryProjects.vue';
import SetupProjectView from '@/components/directory/SetupProjectView.vue';
import ManageProjectView from '@/components/directory/ManageProjectView.vue';
import AccelerateProject from '@/components/directory/AccelerateProject.vue';
import Footer from '@/components/common/Footer.vue';
import ProjectForm from '@/components/directory/ProjectForm.vue';

import ChatBot from '@/components/common/chatBot.vue';

const activeTab = ref('manage'); 
const isProjectFormOpen = ref(false);


function onFormOpenEvent() {
  console.log('STEP 3: Parent (ProjectDirectory) HEARD the event!');
  isProjectFormOpen.value = true;
}


// --- THIS IS THE CRITICAL LOGIC ---
// const isChatVisible = ref(false);
// const isChatMinimized = ref(false);

// const toggleChat = () => {
//     // This logic handles all cases: opening, maximizing from minimized
//     isChatVisible.value = true;
//     isChatMinimized.value = false;
// };
// const handleMinimize = () => {
//     isChatVisible.value = false;
//     isChatMinimized.value = true;
// };
// const handleClose = () => {
//     isChatVisible.value = false;
//     isChatMinimized.value = false;
// };
// const handleMaximize = () => {
//     isChatVisible.value = true;
//     isChatMinimized.value = false;
// };
// // ---------------------------------

// ... other Home.vue script logic (activeTab, etc.)
</script>

<style scoped>
/* This style now correctly positions the minimized FAB relative to the viewport */
/* .chat-minimized-fab {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999;
} */
.footerCls{
  left: 0px !important;
      width: 100% !important;
}
.leftDrawerCls{
  height: calc(100vh - 76px) !important;
}
</style>