<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="closeDialog"
    fullscreen
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="d-flex flex-column">
      <!-- Header Toolbar with Tabs -->
      <v-toolbar color="white" flat border>
        <v-tabs v-model="activeTab">
          <v-tab :value="1" class="text-capitalize">Project Info</v-tab>
          <v-tab :value="2" class="text-capitalize" :disabled="!isInfoComplete">2D Viewer Settings</v-tab>
          <v-tab :value="3" class="text-capitalize" :disabled="!isInfoComplete">3D Viewer Settings</v-tab>
        </v-tabs>
      </v-toolbar>

      <!-- Global Snackbar for this dialog -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" location="top" timeout="4000">
        <v-icon class="mr-2">{{ snackbar.color === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle' }}</v-icon>
        {{ snackbar.message }}
      </v-snackbar>
      
      <!-- Main Content Area -->
      <v-card-text class="flex-grow-1 overflow-y-auto pa-0 bg-grey-lighten-5">
        <v-window v-model="activeTab">
          <!-- TAB 1: Project Info Form -->
          <v-window-item :value="1">
            <v-form ref="form" class="bg-white">
              <!-- Top Header: Project Name & Job # -->
              <div class="pa-4 border-b bg-gray-lighten-2">
                <v-row>
                  <v-col cols="12" md="8">
                    <label class="text-caption font-weight-regular d-block mb-1">Project Name*</label>
                    <v-text-field v-model="formData.projectName" :rules="[rules.required]" variant="outlined" density="compact" hide-details />
                  </v-col>
                  <v-col cols="12" md="4">
                    <label class="text-caption font-weight-regular d-block mb-1">Job #*</label>
                    <v-text-field v-model="formData.jobNumber" :rules="[rules.required]" variant="outlined" density="compact" hide-details />
                  </v-col>
                </v-row>
              </div>

              <!-- Main Grid Layout: THIS IS THE CORRECTED LAYOUT -->
              <div class="pa-4">
                <v-row>
                  <!-- Left Column -->
                  <v-col cols="12" md="7">
                    <v-card variant="" class="mb-4 bg-grey-lighten-4" >
                      <v-card-title class="text-subtitle-2 font-weight-medium bg-grey-lighten-2 pa-3">Project Details</v-card-title>
                      <v-divider />
                      <v-card-text class="pa-3">
                        <v-row>
                          <v-col cols="12" sm="3"><label class="text-caption d-block mb-1">Project Type Test*</label><v-autocomplete :items="projectTypes" item-title="projectTypeName" return-object v-model="formData.projectType" :rules="[rules.required]" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="3"><label class="text-caption d-block mb-1">Project Sub Type Test*</label><v-autocomplete :items="projectSubTypes" item-title="projectSubTypeName" return-object v-model="formData.projectSubType" :rules="[rules.required]" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="2"><label class="text-caption d-block mb-1">Project Stage*</label><v-autocomplete :items="projectStages" v-model="formData.projectStatus" :rules="[rules.required]" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="2"><label class="text-caption d-block mb-1">Start Date*</label><v-menu v-model="startDateMenu" :close-on-content-click="false"><template v-slot:activator="{ props }"><v-text-field v-model="formData.projectStartDate" :rules="[rules.required]" readonly dense outlined required clearable  v-bind="props" variant="outlined" density="compact" hide-details append-icon="mdi-calendar" /></template><v-date-picker v-model="startDateValue" @update:modelValue="startDateMenu = false" /></v-menu></v-col>
                          <v-col cols="12" sm="2"><label class="text-caption d-block mb-1">End Date*</label><v-menu v-model="endDateMenu" :close-on-content-click="false"><template v-slot:activator="{ props }"><v-text-field v-model="formData.projectDueDate" :rules="[rules.required]" readonly v-bind="props" variant="outlined" density="compact" hide-details append-inner-icon="mdi-calendar" /></template><v-date-picker v-model="endDateValue" @update:modelValue="endDateMenu = false" /></v-menu></v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-card variant="" class="mb-4 bg-grey-lighten-4">
                      <v-card-title class="text-subtitle-2 font-weight-medium bg-grey-lighten-2 pa-3">Project Location</v-card-title>
                      <v-divider />
                      <v-card-text class="pa-3">
                        <v-row>
                          <v-col cols="12" sm="4"><label class="text-caption d-block mb-1">Country</label><v-autocomplete :items="countries" item-title="name" item-value="id" v-model="formData.projectAddress.countryId" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="4"><label class="text-caption d-block mb-1">State</label><v-autocomplete :items="filteredStates" item-title="name" item-value="id" v-model="formData.projectAddress.stateId" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="4"><label class="text-caption d-block mb-1">City</label><v-autocomplete :items="filteredCities" item-title="name" item-value="id" v-model="formData.projectAddress.cityId" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="8"><label class="text-caption d-block mb-1">Street</label><v-text-field v-model="formData.projectAddress.street" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="4"><label class="text-caption d-block mb-1">Zip Code</label><v-text-field v-model="formData.projectAddress.zipCode" variant="outlined" density="compact" hide-details /></v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <v-card variant="" class="mb-4 bg-grey-lighten-4">
                      <v-card-title class="text-subtitle-2 font-weight-medium bg-grey-lighten-2 pa-3">Project Stakeholders</v-card-title>
                      <v-divider />
                      <v-card-text class="pa-3">
                         <v-row>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">Project Owner</label><v-autocomplete :items="stakeholders" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">Structural Engineer</label><v-autocomplete :items="stakeholders" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">Fabricator</label><v-autocomplete :items="stakeholders" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">Architect</label><v-autocomplete :items="stakeholders" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">Erector</label><v-autocomplete :items="stakeholders" variant="outlined" density="compact" hide-details /></v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>

                  <!-- Right Column -->
                  <v-col cols="12" md="5">
                    <v-card variant="" class="mb-4 bg-grey-lighten-4">
                      <v-card-title class="pa-0 bg-grey-lighten-2 d-flex align-center">
                        <h4
                          class="pa-2 text-caption mb-1  black--text font-weight-medium"
                        >
                          2D/3D Viewer
                        </h4>
                        <span
                          class="primary-text-1 text-caption mb-1 font-weight-regular d-flex"
                        >
                          <img
                            src="https://dvlc9qcftewvt.cloudfront.net/assets/images/ActionIcons/actioninfo.svg"
                            class="width-18 mr-2"
                          />Select a specific cloud platform to render 3D and 2D
                          Documents</span
                        >
                      </v-card-title>
                      <!-- <v-card-title class="text-subtitle-2 font-weight-medium bg-grey-lighten-4 pa-3">2D/3D Viewer</v-card-title> -->
                      <v-divider />
                      <v-card-text class="pa-3">
                        <v-row>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">2D Viewer</label><v-autocomplete :items="['VIRTUELE']" v-model="formData.twoDViewer" variant="outlined" density="compact" hide-details /></v-col>
                          <v-col cols="12" sm="6"><label class="text-caption d-block mb-1">3D Viewer</label><v-autocomplete :items="['VIRTUELE']" v-model="formData.threeDViewer" variant="outlined" density="compact" hide-details /></v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                    <div class="d-flex align-center justify-center fill-height border-dashed pa-4 rounded">
                      <v-btn prepend-icon="mdi-cloud-upload" variant="tonal" color="grey-darken-1" class="text-capitalize">Upload Project Image</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </div>
            </v-form>
          </v-window-item>
          
          <v-window-item :value="2"><ViewerSettings status-text="VIRTUELE is successfully added as your 2D viewer" /></v-window-item>
          <v-window-item :value="3"><ViewerSettings status-text="Successfully Synced" /></v-window-item>
        </v-window>
      </v-card-text>

      <!-- Bottom Actions -->
      <v-divider />
      <v-card-actions class="pa-4 bg-grey-lighten-4">
        <v-spacer />
        <v-btn variant="text" @click="closeDialog">Cancel</v-btn>
        <v-btn color="primary" variant="flat" @click="handleActionClick" :loading="projectStore.isLoading">
          {{ actionButtonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useProjectStore } from '@/stores/project';
import { useUserStore } from '@/stores/user';
import type { ProjectPayload } from '@/types/project';
import { projectTypes, projectSubTypes, projectStages, countries, states, cities, stakeholders } from '@/data/projectFormData';
import ViewerSettings from './ViewerSettings.vue';


const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(['update:modelValue']);

const projectStore = useProjectStore();
const userStore = useUserStore();
const activeTab = ref(1);
const isInfoComplete = ref(false);
const form = ref<any>(null);
const snackbar = ref({ show: false, message: '', color: 'success' });
const startDateMenu = ref(false);
const endDateMenu = ref(false);

const formData = ref<ProjectPayload>({});

const rules = { required: (v: any) => !!v || 'This field is required' };

const actionButtonText = computed(() => {
  if (activeTab.value === 1) return 'Save ';
  if (activeTab.value === 2) return 'Update ';
  return 'Save';
});

// Helper for date picker binding
const startDateValue = computed({
  get: () => formData.value.projectStartDate ? new Date(formData.value.projectStartDate) : new Date(),
  set: (val) => { formData.value.projectStartDate = val.toISOString().split('T')[0] }
});
const endDateValue = computed({
  get: () => formData.value.projectDueDate ? new Date(formData.value.projectDueDate) : new Date(),
  set: (val) => { formData.value.projectDueDate = val.toISOString().split('T')[0] }
});

// Cascading dropdown logic
const filteredStates = computed(() => states.filter(s => s.countryId === formData.value.projectAddress?.countryId));
const filteredCities = computed(() => cities.filter(c => c.stateId === formData.value.projectAddress?.stateId));

watch(() => formData.value.projectAddress?.countryId, () => {
  if (formData.value.projectAddress) {
    formData.value.projectAddress.stateId = null; // FIX
    formData.value.projectAddress.cityId = null;  // FIX
  }
});
watch(() => formData.value.projectAddress?.stateId, () => {
  if (formData.value.projectAddress) {
    formData.value.projectAddress.cityId = null; // FIX
  }
});
function initializeFormData() {
  formData.value = {
    projectName: '',
    jobNumber: '',
    projectStartDate: new Date().toISOString().split('T')[0],
    projectDueDate: '',
    recordStatus: 'ACTIVE',
    projectStatus: 'OPEN', 
    createdBy: userStore.user?.userId || 0,
    companyId: userStore.user?.companyId || 0,
    userId: userStore.user?.userId || 0,
    userCompanyName: userStore.user?.currentCompany || '',
    projectType: null,
    projectSubType: null,
    projectAddress: {
      street: null,
      cityId: null,      // FIX #2: Default to null
      stateId: null,     // FIX #2: Default to null
      countryId: null,   // FIX #2: Default to null
      zipCode: null,
      customerId: null
    },
    projectStakeHolders: {},
    twoDViewer: 'VIRTUELE',
    threeDViewer: 'VIRTUELE',
    isThreeDViewerBimplusSync: false,
    isThreeDViewerTrimbleSync: false,
    projectImage: null,
  };
}

watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    activeTab.value = 1;
    isInfoComplete.value = false;
    initializeFormData();
  }
});

function closeDialog() { emit('update:modelValue', false) }

async function handleActionClick() {
  if (activeTab.value === 1) {
    const { valid } = await form.value?.validate();
    if (valid) {
      projectStore.createProject(formData.value).then((data) => {
        if(data.status === 201){
          isInfoComplete.value = true;
          activeTab.value = 2;
        }
        else{
          snackbar.value = { show: true, message: data.response.data.message, color: 'error' };
        }
      });
    }
    else{
      console.log('Form validation failed');
      snackbar.value = { show: true, message: 'Please fill in all required fields.', color: 'error' };
    }
  } else if (activeTab.value === 2) {
    activeTab.value = 3;
  } else {
    
    closeDialog();
  }
}
</script>

<style scoped>
.border-b { border-bottom: 1px solid #e0e0e0; }
.border-dashed { border: 2px dashed #e0e0e0; }
</style>