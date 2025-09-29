<template>
  <v-container fluid class="pa-2">
    <v-row>
      <!-- Estimation Assistant Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div
              :class="{ 'cursor-pointer': estimateSwitch }"
              class="d-flex align-center flex-grow-1"
              @click="validateModule('QUICK_ESTIMATE', estimateSwitch)"
            >
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/estimationassistant.svg" max-width="32" class="mr-3" />
              Estimation Assistant
            </div>
            <v-switch
              v-model="estimateSwitch"
              color="primary"
              hide-details
              density="compact"
              @update:modelValue="toggleModules($event, 'QUICK_ESTIMATE')"
            />
          </v-card-title>
          <v-divider />
          <v-card-text
            :class="{ 'cursor-pointer': estimateSwitch }"
            class="text-caption text-medium-emphasis"
            @click="validateModule('QUICK_ESTIMATE', estimateSwitch)"
          >
            Rapidly generate accurate 3D model-based estimates using automated tools. Leverage connection libraries to enhance detail and accuracy.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Detailing Assistant Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
             <div
              :class="{ 'cursor-pointer': bimSwitch }"
              class="d-flex align-center flex-grow-1"
              @click="validateModule('THREED_BIM', bimSwitch)"
            >
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/detailingassistant.svg" max-width="32" class="mr-3" />
              Detailing Assistant
            </div>
            <v-switch
              v-model="bimSwitch"
              color="primary"
              hide-details
              density="compact"
              @update:modelValue="toggleModules($event, 'THREED_BIM')"
            />
          </v-card-title>
          <v-divider />
          <v-card-text
            :class="{ 'cursor-pointer': bimSwitch }"
            class="text-caption text-medium-emphasis"
            @click="validateModule('THREED_BIM', bimSwitch)"
          >
            Automate 3D modeling to minimize manual errors and reduce modeling time. Utilize design document data and connection libraries.
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- BIM Tools Card -->
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div
              :class="{ 'cursor-pointer': bimtoolsSwitch }"
              class="d-flex align-center flex-grow-1"
              @click="validateModule('BIM_TOOLS', bimtoolsSwitch)"
            >
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/bimtools.svg" max-width="32" class="mr-3" />
              BIM Tools
            </div>
            <v-switch
              v-model="bimtoolsSwitch"
              color="primary"
              hide-details
              density="compact"
              @update:modelValue="toggleModules($event, 'BIM_TOOLS')"
            />
          </v-card-title>
          <v-divider />
          <v-card-text
            :class="{ 'cursor-pointer': bimtoolsSwitch }"
            class="text-caption text-medium-emphasis"
            @click="validateModule('BIM_TOOLS', bimtoolsSwitch)"
          >
            Evaluate the quality of manually created 3D models using over 35 configurable checks and generate error reports.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useProjectStore } from '@/stores/project';
import { emitter } from '@/composables/emitter';
import { useCommon } from '@/composables/useCommon';

// --- Component Emits ---
const emit = defineEmits(['update-modules', 'activate-modules']);

// --- Stores and Composables ---
const projectStore = useProjectStore();
// const { getAPIResponse, encryptStoreKeysHandler } = useCommon(); 

// --- Component State ---
const estimateSwitch = ref(false);
const bimSwitch = ref(true); // Defaulted to on as per original UI
const bimtoolsSwitch = ref(false);

// --- Methods ---
const toggleModules = (isActive: boolean, moduleName: string) => {
  const moduleNameMap: Record<string, string> = {
    QUICK_ESTIMATE: "Estimate",
    THREED_BIM: "3D BIM",
    BIM_TOOLS: "BIM Tools",
  };
  const friendlyName = moduleNameMap[moduleName] || moduleName;
  const message = `${friendlyName} module has been ${isActive ? 'activated' : 'deactivated'}`;
  emit("activate-modules", moduleName, isActive, message);
};

const validateModule = async (moduleName: string, moduleActive: boolean) => {
  if (!projectStore.projectId) {
    emitter.emit('viewsnackbar', ["info", "Please select a project to access this feature!"]);
    return;
  }
  if (!moduleActive) return;
  
  console.log(`Validating and navigating to module: ${moduleName}`);
  // In a real scenario, API calls would happen here before navigation.
  // const handlerMap: Record<string, string> = {
  //   QUICK_ESTIMATE: "QuickEstimate",
  //   THREED_BIM: "ModellingDashboard",
  //   BIM_TOOLS: "BimTools",
  // };
  // if (handlerMap[moduleName]) {
  //   encryptStoreKeysHandler(handlerMap[moduleName]);
  // }
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>