<template>
  <v-container fluid class="pa-2">
    <v-row>
      <!-- Project Info Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height cursor-pointer" hover @click="handleCardClick('ProjectInfo')">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectinfo.svg" max-width="32" class="mr-3" />
            Project Info
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Manage your project details and stakeholder information efficiently. Archive completed projects and securely store data for future reference.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Documents Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height cursor-pointer" hover @click="handleCardClick('Documents')">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/documents.svg" max-width="32" class="mr-3" />
            Documents
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Centralize all project documentation. Implement folder-level access control, share documents externally via links, and manage document versions and history.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Project Teams Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height cursor-pointer" hover @click="handleCardClick('ProjectTeams')">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectteams.svg" max-width="40" class="mr-3" />
            Project Teams
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Formulate project teams by adding colleagues and inviting them to join projects. Include users from external companies, granting them access to collaborate.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Project Specification Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height cursor-pointer" hover @click="handleCardClick('ProjectSpecification')">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectspecification.svg" max-width="32" class="mr-3" />
            Project Specification
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Define and enforce project specifications to streamline workflow automation across various modules.
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Project Settings Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height cursor-pointer" hover @click="handleCardClick('ProjectSettings')">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectspecification.svg" max-width="32" class="mr-3" />
            Project Settings
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Project settings must be configured before adding a 3D model to the project.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/stores/project';
import { useUserStore } from '@/stores/user';
import { emitter } from '@/composables/emitter';
import { useCommon } from '@/composables/useCommon';

// --- Stores and Composables ---
const projectStore = useProjectStore();
const userStore = useUserStore();
// Note: encryptStoreKeysHandler is not available in the provided useCommon.ts, so we're assuming it will be added there.
// const { encryptStoreKeysHandler } = useCommon(); 

// --- Methods ---
const handleCardClick = (cardType: string) => {
  if (!projectStore.projectId) {
    emitter.emit('viewsnackbar', ["info", "Please select or create a project to access this feature!"]);
    return;
  }
  if (userStore.userStatus === 'DEACTIVE') {
    emitter.emit('viewsnackbar', ["error", 'You are not associated with this project.']);
    return;
  }
  
  // A map for clean navigation/action logic. This assumes the URLs are handled by the encrypt handler.
  const actionMap: Record<string, () => void> = {
    ProjectInfo: () => emitter.emit('open-project-form'),
    Documents: () => console.log('Encrypting for ProjectDocuments'), // encryptStoreKeysHandler('ProjectDocuments'),
    ProjectTeams: () => console.log('Encrypting for ProjectTeams'), // encryptStoreKeysHandler('ProjectTeams'),
    ProjectSpecification: () => console.log('Encrypting for ProjectSpecifications'), // encryptStoreKeysHandler('ProjectSpecifications'),
    ProjectSettings: () => console.log('Encrypting for ProjectSettings'), // encryptStoreKeysHandler('ProjectSettings'),
  };
  
  const action = actionMap[cardType];
  if (action) {
    action();
  }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>