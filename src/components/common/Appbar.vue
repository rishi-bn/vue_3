<template>
  <v-app-bar density="compact" flat class="border-b">
    <!-- 1. "9-Dots" Main Modules Menu -->
    <v-menu location="bottom start">
      <template #activator="{ props }">
        <v-btn icon="mdi-dots-grid" v-bind="props" />
      </template>
      <v-card min-width="250">
        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-folder-multiple-outline"
            title="Project Directory"
            @click="router.push('/directory/landing')"
          />
          <v-list-item
            prepend-icon="mdi-card-account-contacts-outline"
            title="Contacts"
          />
          <v-list-item
            prepend-icon="mdi-shield-account-outline"
            title="Account Admin"
          />
          <v-list-item
            prepend-icon="mdi-credit-card-outline"
            title="Billing"
          />
        </v-list>
      </v-card>
    </v-menu>

    <v-divider vertical inset />
    
      <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/common/vlogo.svg" max-width="120" class="ml-4" />
    
    <v-divider vertical inset class="ml-4" />

    <!-- 2. Company Switcher Menu -->
    <v-menu v-if="userStore.user" location="bottom start" :close-on-content-click="true">
      <template #activator="{ props }">
        <v-btn variant="text" size="small" class="text-capitalize ml-2" v-bind="props">
          <!-- Display the company name from the user store -->
          <span>{{ userStore.user.currentCompany }}</span>
          <v-icon end icon="mdi-menu-down" />
        </v-btn>
      </template>
      <v-card>
        <v-list density="compact" nav>
          <!-- "My company" Section -->
          <template v-if="internalCompanies.length > 0">
            <v-list-subheader>My company</v-list-subheader>
            <v-list-item
              v-for="company in userStore.internalCompanies"
              :key="company.companyId"
              :active="userStore.user?.companyId === company.companyId"
              @click="handleCompanySwitch(company)"
              color="primary"
            >
              <template #prepend>
                <v-avatar color="grey-lighten-2" size="30" class="mr-3">
                  <span class="text-uppercase font-weight-bold">{{ company.companyName.substring(0, 2) }}</span>
                </v-avatar>
              </template>
              <v-list-item-title>{{ company.companyName }}</v-list-item-title>
            </v-list-item>
          </template>

          <!-- "Associated companies" Section -->
          <template v-if="externalCompanies.length > 0">
            <v-list-subheader>Associated companies</v-list-subheader>
            <v-list-item
              v-for="company in userStore.externalCompanies"
              :key="company.companyId"
              :active="userStore.user?.companyId === company.companyId"
              @click="handleCompanySwitch(company)"
              color="primary"
            >
               <template #prepend>
                <v-avatar color="grey-lighten-2" size="30" class="mr-3">
                  <span class="text-uppercase font-weight-bold">{{ company.companyName.substring(0, 2) }}</span>
                </v-avatar>
              </template>
              <v-list-item-title>{{ company.parentCompanyName }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-menu>

    <!-- 3. Project Switcher Menu -->
    <!-- The menu is visible as long as there is at least one active project -->
    <v-menu v-if="projectStore.selectedProject" location="bottom start">
      <template #activator="{ props }">
        <v-btn variant="text" size="small" class="text-capitalize" v-bind="props">
          <span>{{ projectStore.selectedProject.projectName }}</span>
          <span class="text-grey-darken-1 ml-2">#{{ projectStore.selectedProject.jobNumber }}</span>
          <!-- <span>{{ projectStore.activeProjects[0].projectName }} #{{ projectStore.activeProjects[0].jobNumber }}</span> -->
          <v-icon end icon="mdi-menu-down" />
        </v-btn>
      </template>
      <v-card max-height="300">
        <v-list density="compact" nav>
            <v-list-item
                v-for="project in projectStore.activeProjects"
                :key="project.projectId"
                :title="project.projectName"
                :subtitle="`#${project.jobNumber}`"
                :active="project.projectId === projectStore.activeProjectId"
                @click="projectStore.selectProject(project)"
                color="primary"
            />
        </v-list>
      </v-card>
    </v-menu>
    <!-- <v-btn icon="mdi-robot-happy-outline" @click="uiStore.openChatbot()"></v-btn>
    <v-btn icon="mdi-cog-outline"></v-btn> -->
    <v-spacer />
    <UserContext @toggle-chat="emit('toggle-chat')" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useUserStore, type SwitchableCompany } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import UserContext from './UserContext.vue';

const projectStore = useProjectStore();
const userStore = useUserStore();
const authStore = useAuthStore();
const router = useRouter();
const { user, internalCompanies, externalCompanies } = storeToRefs(userStore);
// --------------------------------

const handleCompanySwitch = (company: SwitchableCompany) => {
    // The logic remains the same, but now it's guaranteed to have the user object.
  
    console.log('Switching to company:', company);
    authStore.switchCompany(company);
};

onMounted(() => {
    // The component's only job is to tell the store to fetch the data.
    userStore.fetchSwitchableCompanies();
    
});
</script>