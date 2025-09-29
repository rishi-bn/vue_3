<!-- src/pages/register.vue -->
<template>
  
    <!-- Panel 1: Background Image -->
    <div class="login-page-wrapper">

    <!-- Panel 2: Form Panel -->
    <div class="form-panel">
      <div class="form-content-wrapper">

        <!-- SUCCESS VIEW -->
        <div v-if="registrationCompleted" class="text-center">
          <p class="text-h6">Registration Successful!</p>
          <p class="my-4">Thank you. An administrator will review your request.</p>
          <v-btn color="primary" to="/" block>Return to Sign In</v-btn>
        </div>

        <!-- FORM VIEW -->
        <div v-else>
          <div class="text-center mb-6">
            <img src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/common/vlogo.svg" alt="Logo" style="width: 140px" />
            <p class="text-h6 font-weight-regular text-grey-darken-2 mt-4">Sign Up</p>
          </div>

          <v-form ref="registrationForm" v-model="isFormValid" @submit.prevent="handleRegister">
            <v-row dense>
              <!-- All fields are now compact and correctly styled -->
              <v-col cols="12" md="6"><v-text-field class="form-field" v-model="form.firstName" label="First Name*" variant="outlined" :rules="nameRules"></v-text-field></v-col>
              <v-col cols="12" md="6"><v-text-field class="form-field" v-model="form.lastName" label="Last Name*" variant="outlined" :rules="nameRules"></v-text-field></v-col>
              
              <v-col cols="12" md="6"><v-text-field class="form-field" v-model="form.email" label="E-mail*" variant="outlined" :rules="emailRules"></v-text-field></v-col>
              <v-col cols="12" md="6"><v-row dense>
                <v-col cols="5"><v-select v-model="form.primaryPhoneCountry" :items="countries" :item-title="item => `${item.countryName} (${item.countryCode})`" item-value="countryId" label="Country*" variant="outlined" density="compact" return-object></v-select></v-col>
                <v-col cols="7"><v-text-field class="form-field" v-model="form.primaryPhone" label="Phone*" variant="outlined" :rules="mobileRules" @keypress="isNumber"></v-text-field></v-col>
              </v-row></v-col>

              <v-col cols="12" md="6"><v-text-field class="form-field" v-model="form.companyName" label="Company name*" variant="outlined" :rules="companyNameRules"></v-text-field></v-col>
              <v-col cols="12" md="6"><v-select class="form-field" v-model="form.companyType" :items="companyTypes" item-title="companytypename" item-value="companytypeid" label="Company Type*" variant="outlined" @update:modelValue="onCompanyTypeChange"></v-select></v-col>
              
              <v-col cols="12" md="6"><v-text-field class="form-field" v-model="form.website" label="Website*" variant="outlined" :rules="urlRules"></v-text-field></v-col>
              <v-col cols="12" md="6"><v-select class="form-field" v-model="form.numEmployees" :items="noOfEmployees" item-title="value" item-value="key" label="Number of Employees*" variant="outlined" return-object></v-select></v-col>
              
              <v-col cols="12" md="4"><v-select class="form-field" v-model="form.addressCountry" @update:modelValue="onCountryChange" :items="countries" item-title="countryName" item-value="countryId" label="Country*" variant="outlined" return-object :loading="authStore.isLoadingLocations"></v-select></v-col>
              <v-select v-model="form.addressState"   @update:modelValue="onStateChange":items="states" item-title="name" item-value="id"  label="State*"  variant="outlined"  return-object   :disabled="!form.addressCountry"></v-select>
              <v-col cols="12" md="4"><v-select class="form-field" v-model="form.addressCity" @update:modelValue="onCityChange" :items="cities" item-title="name" item-value="id" label="City*" variant="outlined" return-object :disabled="!form.addressState"></v-select></v-col>
              
              <v-col cols="12" md="9"><v-text-field class="form-field" v-model="form.addressStreet" label="Street*" variant="outlined" :rules="addressRules"></v-text-field></v-col>
              <v-col cols="12" md="3"><v-text-field class="form-field" v-model="form.addressZip" label="Zip Code*" variant="outlined" @keypress="isNumber"></v-text-field></v-col>
              
              <v-col cols="5"><v-select v-model="form.primaryPhoneCountry" :items="countries" :item-title="item => `${item.countryName} (${item.countryCode})`" item-value="countryId" label="Country*" variant="outlined" density="compact" return-object></v-select></v-col>
              <v-col cols="12" md="5"><v-text-field class="form-field" v-model="form.secondaryPhone" label="Phone" variant="outlined" @keypress="isNumber"></v-text-field></v-col>
              <v-col cols="12" md="3"><v-text-field class="form-field" v-model="form.secondaryPhoneExt" label="Extension" variant="outlined" @keypress="isNumber"></v-text-field></v-col>
            </v-row>
            
            <v-checkbox v-model="form.termsAccepted" class="my-2" :rules="[v => !!v || '']">
              <template #label>
                <div class="text-caption"> <a href="#" @click.prevent="showTermsDialog = true" class="text-primary font-weight-bold text-decoration-none">I agree to the terms and conditions</a></div>
              </template>
            </v-checkbox>
            
            <v-btn type="submit" block color="primary" size="large" :loading="isLoading" :disabled="!isFormValid" class="mt-2">SIGN UP</v-btn>
          </v-form>

          <div class="text-center mt-6">
            <router-link to="/" class="text-blue-bold-1 text-decoration-none text-caption mx-9">Sign in</router-link>
            <router-link to="/forgot-password" class="text-grey-darken-1 text-decoration-none text-caption mx-2">forgot password</router-link>
          </div>
        </div>
      </div>
    </div>
    
    <TermsandConditions v-model="showTermsDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore, type State, type City } from '@/stores/auth'; 
import { nameRules, emailRules, mobileRules, companyNameRules, urlRules, addressRules } from '@/utils/validation';
import TermsandConditions from '@/components/common/TermsandConditions.vue';

// --- SETUP ---
const router = useRouter();
const authStore = useAuthStore();
const registrationForm = ref<any>(null);

// --- COMPONENT STATE ---
const registrationCompleted = ref(false);
const isLoading = ref(false);
const isFormValid = ref(false);
const showTermsDialog = ref(false);

// --- FORM STATE ---
const form = reactive({
  firstName: '', 
  lastName: '', 
  email: '',
  primaryPhoneCountry: null as any, 
  primaryPhone: '',
  companyName: '',
  companyType: null as number | null, 
  companyTypeArray: [] as number[],
  website: '', 
  numEmployees: null as any,
  addressCountry: null as any, 
  addressState: null as State | null, 
  addressCity: null as City | null,
  addressStreet: '', 
  addressZip: '',
  secondaryPhoneCountry: null as any, 
  secondaryPhone: '', 
  secondaryPhoneExt: '',
  termsAccepted: false,
});

// --- COMPUTED DATA FOR DROPDOWNS ---
const countries = computed(() => authStore.countriesForSelection);
const states = computed(() => authStore.statesForSelection);
const cities = computed(() => authStore.citiesForSelection);
const companyTypes = computed(() => authStore.companyTypes);
const noOfEmployees = computed(() => authStore.noOfEmployees);

// --- LIFECYCLE HOOK ---
onMounted(() => {
  authStore.loadStaticLocations();
});

// --- EVENT HANDLERS & UTILITIES ---
function isNumber(event: KeyboardEvent) {
  if (!/^[0-9]*$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
    event.preventDefault();
  }
}

function onCountryChange(country: any) {
  form.addressState = null; form.addressCity = null;
  if (country) authStore.loadStatesForCountry(country.countryId);
}

function onStateChange() {
  form.addressCity = null; 
  const selectedState = form.addressState;  if (selectedState && form.addressCountry) {  
    authStore.loadCitiesForState(form.addressCountry.countryId, selectedState.id);
  }
}

function onCompanyTypeChange(typeId: number | null) {
  form.companyTypeArray = typeId ? [typeId] : [];
}

function onCityChange(city: any): void {
  if (city && city.zipCode) {form.addressZip = city.zipCode;  }
}

async function handleRegister() {
  const { valid } = await registrationForm.value.validate();
  if (!valid) return;

  isLoading.value = true;
  try {
    const payload = {
      companyName: form.companyName,
      companyTypeId: form.companyTypeArray,
      companyWebsite: form.website,
      numberOfEmployeesId: form.numEmployees?.key,
      address: {
        addressType: "COMPANY", 
        street: form.addressStreet,
        cityId: form.addressCity?.id, 
        stateId: form.addressState?.id,
        countryId: form.addressCountry?.countryId, 
        zipCode: form.addressZip,
        primaryPhone: form.primaryPhone, 
        landPhoneCountryId: form.secondaryPhoneCountry?.countryId,
        landPhone: form.secondaryPhone, 
        landPhoneExternsion: form.secondaryPhoneExt,
      },
      users: [{
        firstName: form.firstName, 
        lastName: form.lastName, 
        email: form.email.toLowerCase(),
        address: {
          addressType: "USER", 
          street: form.addressStreet,
          cityId: form.addressCity?.id, 
          stateId: form.addressState?.id,
          countryId: form.addressCountry?.countryId, 
          zipCode: form.addressZip,
          primaryPhoneCountryId: form.primaryPhoneCountry?.countryId, 
          primaryPhone: form.primaryPhone,
        }
      }],
    };
    
    await authStore.registerUser(payload);
    registrationCompleted.value = true;
  } catch (error) {
    alert(`Registration failed: ${authStore.registrationError}`);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
/* .page-wrapper {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
} */
.login-page-wrapper {
  background: url('https://dvlc9qcftewvt.cloudfront.net/assets/images/background/login-register.jpg') no-repeat center center;
  background-size: cover;
  
  /* Make it fill the entire screen */
  width: 100vw;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: flex-end; 
}

.form-panel {
  width: 60%;
  height: 100%;
  max-width: 600px;
  min-width: 450px;
  background-color: #ffffff;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  overflow-y: auto;
}
.form-content-wrapper {
  width: 100%;
}
.form-field :deep(.v-field__input),
.form-field :deep(.v-label) {
  font-size: 0.875rem !important; /* Smaller font */
}
.form-field :deep(.v-field) {
  height: 40px; /* Shorter height */
}


</style>