<template>
  <div :style="styleDefaultObject">
    <v-row class="ma-0">
      <!-- 3D Model Extraction Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card @click="switchProjectInfo(3)" hover class="fill-height cursor-pointer">
          <v-card-title class="text-caption font-weight-bold d-flex align-center bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/modelextraction.svg" max-width="32" class="mr-3" />
            3D Model Extraction
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Check for errors and fix inaccuracies in your 3D models. Compare 3D model versions for changes, enhance data with custom UDAs, and export models from Revit to Tekla.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Map UDAs Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card @click="switchProjectInfo(4)" hover class="fill-height cursor-pointer">
          <v-card-title class="text-caption font-weight-bold d-flex align-center bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/udamapper.svg" max-width="32" class="mr-3" />
            Map UDAs
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Map user-defined attributes (UDAs) in your 3D models to enhance the utility of your workflows and modules.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Model Check Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card @click="switchProjectInfo(5)" hover class="fill-height cursor-pointer">
          <v-card-title class="text-caption font-weight-bold d-flex align-center bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/modelcheck.svg" max-width="32" class="mr-3" />
            Model Check
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Enhance your 3D model data clarity and perform comprehensive error checks. Amend inaccuracies and augment your models with customized UDAs embedded with documents.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- BIM Export Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card @click="switchProjectInfo(6)" hover class="fill-height cursor-pointer">
          <v-card-title class="text-caption font-weight-bold d-flex align-center bg-grey-lighten-4" style="min-height: 70px;">
            <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/modelcheck.svg" max-width="32" class="mr-3" />
            BIM Export
          </v-card-title>
          <v-divider />
          <v-card-text class="text-caption text-medium-emphasis">
            Export your 3D models from Revit to Tekla by performing comprehensive error checks and have data clarity. Amend inaccuracies and augment your models.
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- ABM Manager Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div :class="{ 'cursor-pointer': abmSwitch }" class="d-flex align-center flex-grow-1" @click="validateModule('ABM_MANAGER', abmSwitch)">
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/generalfile.svg" max-width="32" class="mr-3" />
              ABM Manager
            </div>
            <v-switch v-model="abmSwitch" color="primary" hide-details density="compact" @update:modelValue="toggleModules($event, 'ABM_MANAGER')" />
          </v-card-title>
          <v-divider />
          <v-card-text :class="{ 'cursor-pointer': abmSwitch }" class="text-caption text-medium-emphasis" @click="validateModule('ABM_MANAGER', abmSwitch)">
            Automatically generate ABM reports tailored to your specifications. Optimize material usage by nesting sections and plates, and track changes through comparative report analysis.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Drawings Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div :class="{ 'cursor-pointer': drawingsSwitch }" class="d-flex align-center flex-grow-1" @click="validateModule('CONNECTED_DATA', drawingsSwitch)">
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/drawings.svg" max-width="32" class="mr-3" />
              Drawings
            </div>
            <v-btn icon variant="text" size="x-small" @click="configurationModule('CONNECTED_DATA')">
              <v-img :src="IMG_SETTING" width="18" />
            </v-btn>
            <v-switch v-model="drawingsSwitch" color="primary" hide-details density="compact" @update:modelValue="toggleModules($event, 'CONNECTED_DATA')" />
          </v-card-title>
          <v-divider />
          <v-card-text :class="{ 'cursor-pointer': drawingsSwitch }" class="text-caption text-medium-emphasis" @click="validateModule('CONNECTED_DATA', drawingsSwitch)">
            Generate and distribute design drawing sets to team members. View Shop Drawings in the 3D Model and link Part sheets, Eplans, RFIs, and Change Orders for enhanced accuracy and efficiency.
          </v-card-text>
        </v-card>
      </v-col>

       <!-- RFI Management Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div :class="{ 'cursor-pointer': rfiSwitch }" class="d-flex align-center flex-grow-1" @click="validateModule('RFI_MANAGER', rfiSwitch)">
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/rfimanagement.svg" max-width="32" class="mr-3" />
              RFI Management
            </div>
             <v-btn icon variant="text" size="x-small" @click="configurationModule('RFI_MANAGER')">
              <v-img :src="IMG_SETTING" width="18" />
            </v-btn>
            <v-switch v-model="rfiSwitch" color="primary" hide-details density="compact" @update:modelValue="toggleModules($event, 'RFI_MANAGER')" />
          </v-card-title>
          <v-divider />
          <v-card-text :class="{ 'cursor-pointer': rfiSwitch }" class="text-caption text-medium-emphasis" @click="validateModule('RFI_MANAGER', rfiSwitch)">
            Customize RFI workflows to align with project requirements. Integrate RFIs within documents and models, sharing updates externally through web links.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Project Status Tracker Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div :class="{ 'cursor-pointer': pstSwitch }" class="d-flex align-center flex-grow-1" @click="validateModule('PROJECT_STATUS_TRACKER', pstSwitch)">
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/projectstatustracker.svg" max-width="32" class="mr-3" />
              Project Status Tracker
            </div>
            <v-switch v-model="pstSwitch" color="primary" hide-details density="compact" @update:modelValue="toggleModules($event, 'PROJECT_STATUS_TRACKER')" />
          </v-card-title>
          <v-divider />
          <v-card-text :class="{ 'cursor-pointer': pstSwitch }" class="text-caption text-medium-emphasis" @click="validateModule('PROJECT_STATUS_TRACKER', pstSwitch)">
            Develop custom workflows to monitor project progress visually in 3D. Automatically update project statuses using vendor reports.
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Issue Management Card -->
      <v-col sm="3" cols="12" class="pa-2">
        <v-card class="fill-height">
          <v-card-title class="d-flex align-center text-caption font-weight-bold bg-grey-lighten-4" style="min-height: 70px;">
            <div :class="{ 'cursor-pointer': imSwitch }" class="d-flex align-center flex-grow-1" @click="validateModule('ISSUE_MANAGEMENT', imSwitch)">
              <v-img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/directory/generalfile.svg" max-width="32" class="mr-3" />
              Issue Management
            </div>
            <v-switch v-model="imSwitch" color="primary" hide-details density="compact" @update:modelValue="toggleModules($event, 'ISSUE_MANAGEMENT')" />
          </v-card-title>
          <v-divider />
          <v-card-text :class="{ 'cursor-pointer': imSwitch }" class="text-caption text-medium-emphasis" @click="validateModule('ISSUE_MANAGEMENT', imSwitch)">
            Track, manage, and resolve project issues efficiently with Virtuele. Assign tasks, set priorities, and collaborate in real time to ensure seamless coordination.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    
    <!-- Child Component Dialogs (stubs for now) -->
    <!-- <ModelSelectionView ref="modelSelectionViewRef" @verify-model-check="verifyModelCheck" /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { CSSProperties } from 'vue';

// Pinia Store Imports
import { useUserStore } from '@/stores/user';
import { useProjectStore } from '@/stores/project';
// import { useRfiConfigurationStore } from '@/stores/directory/rfiConfiguration';


// Shared Utilities
import { emitter } from '@/composables/emitter';
import { useCommon } from '@/composables/useCommon';
import { IMG_SETTING } from '@/composables/useImages';

// Component Props and Emits
defineProps({ isDocumentsView: Boolean, isSetupView: Boolean });
const emit = defineEmits(['update-modules', 'activate-modules']);

// Stores, Router, and Composables
const userStore = useUserStore();
const projectStore = useProjectStore();
// const rfiConfigStore = useRfiConfigurationStore();

const router = useRouter();
const { getAPIResponse, encryptStoreKeysHandler } = useCommon();

// Component State
const styleDefaultObject = ref<CSSProperties>({ 'overflow-y': 'scroll', height: `calc(100vh - 124px)` });
const modulesList = ref<any>({});
const drawingsSwitch = ref(false);
const rfiSwitch = ref(false);
const pstSwitch = ref(false);
const imSwitch = ref(false);
const abmSwitch = ref(false);

const shopStandardId = ref<number | null>(null);
const aiscVersion = ref<string>('');

// Template Refs
const modelSelectionViewRef = ref<any>(null); // Replace 'any' with a proper interface

// Computed
const RFIWorkFlow = computed(() => rfiConfigStore.RFIWorkFlow);

// Methods (preserving original names and structure)

const moduleMapping: Record<string, 'drawingsSwitch' | 'rfiSwitch' | 'pstSwitch' | 'imSwitch' | 'abmSwitch'> = {
  CONNECTED_DATA: "drawingsSwitch", RFI_MANAGER: "rfiSwitch", PROJECT_STATUS_TRACKER: "pstSwitch",
  ISSUE_MANAGEMENT: "imSwitch", ABM_MANAGER: "abmSwitch",
};

const resetSwitchs = () => { /* ... as before ... */ };

const updateModules = (data: any) => {
  const refMap = { drawingsSwitch, rfiSwitch, pstSwitch, imSwitch, abmSwitch };
  data.linkedModules.forEach((item: any) => {
    const switchName = moduleMapping[item.module];
    if (switchName && item.isLinked) refMap[switchName].value = true;
  });
  modulesList.value = data;
};

const loadModules = async () => {
  if (!projectStore.projectId) return;
  resetSwitchs();
  try {
    const data = await getAPIResponse<any>(`api/project/module/dashboard/company/${userStore.user?.companyId}/project/${projectStore.projectId}`);
    emit("update-modules", data);
    updateModules(data);
  } catch (error) { /* Error handled by getAPIResponse */ }
};

const getSavedShopStdDetails = async () => {
  if (!projectStore.projectId) return;
  try {
    const data = await getAPIResponse<any>(`/api/model-standard-selector/company/${userStore.user?.companyId}/project/${projectStore.projectId}`);
    if (data) {
      shopStandardId.value = parseInt(data.shopStandard);
      aiscVersion.value = data.edition;
    }
  } catch (error) { /* Error handled */ }
};

const redirectToNewTabs = (type: number) => {
  const handlerMap: Record<number, () => void> = {
    3: () => { encryptStoreKeysHandler("ProjectModelExtraction"); window.open("/directory/extraction", '_blank'); },
    4: () => { encryptStoreKeysHandler("ProjectManageUDA"); window.open("/directory/uda", '_blank'); },
    5: () => { if (modelSelectionViewRef.value) { modelSelectionViewRef.value.modelSelectionDialog = true; modelSelectionViewRef.value.loadModels("MC"); } },
    6: () => { if (modelSelectionViewRef.value) { modelSelectionViewRef.value.modelSelectionDialog = true; modelSelectionViewRef.value.loadModels("BE"); } },
  };
  handlerMap[type]?.();
};

const switchProjectInfo = (type: number) => {
  if (!projectStore.projectId) { emitter.emit('viewsnackbar', ["info", "Please select a project."]); return; }
  if (userStore.userStatus === "DEACTIVE") { emitter.emit('viewsnackbar', ["error", "You are not associated with this project."]); return; }
  redirectToNewTabs(type);
};

const toggleModules = (event: boolean, moduleName: string) => {
  // ... same implementation as before, emitting to parent ...
};

const validateModule = async (moduleName: string, moduleActive: boolean) => {
  if (!projectStore.projectId || !moduleActive) return;
  try {
    await getAPIResponse<any>(`/api/projectdirectory/team/members/${projectStore.projectId}/${userStore.user?.userId}`);
    // ... all the original switch case logic from the Vue 2 file would be translated here ...
    if (moduleName === 'RFI_MANAGER' && userStore.userRoles.includes('rfiManager')) {
        if(RFIWorkFlow.value === 'procore') {
            encryptStoreKeysHandler('RFIManager');
        } else {
            window.open('/module/rfiview', '_blank');
        }
    }
  } catch(e) { /* Error is handled by getAPIResponse */ }
};

const configurationModule = (mName: string) => {
  if (mName === "RFI_MANAGER") { router.push({ name: "RFIConfigure" }); } 
  else { router.push({ name: "ConnectedDataConfig" }); }
};

onMounted(() => {
  if (projectStore.projectId) {
    loadModules();
    getSavedShopStdDetails();
  }
});

defineExpose({ loadModules });
</script>

<style scoped>
.cursor-pointer { cursor: pointer; }
</style>