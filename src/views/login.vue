<template>
    <v-app id="login-bg" class="custom--input custom-form-input">
  <div>
    <!-- The main card container, using your original classes -->
    <v-card
      :min-width="isMobile ? '100%' : '500'"
      :min-height="defaultHeight"
      class="rounded-0 boxshadow-none right-float-form right-float-signup bg-f9fafc"
    >
      <!-- Loading Overlay - A more modern approach than v-scale-transition for this use case -->
      <v-overlay :model-value="isLoading" persistent class="d-flex justify-center align-center">
        <v-card max-width="350" class="pa-4">
          <div class="text-center text-subtitle-1">Verifying & Letting you in</div>
          <v-progress-linear color="primary" indeterminate rounded height="6" class="mt-4" />
        </v-card>
      </v-overlay>

      <v-card-text class="pa-4 pos-center-max" :class="isMobile ? 'pt-0' : 'pt-8'">
        <div class="py-4 pb-6">
          <v-img
            src="https://dvlc9qcftewvt.cloudfront.net/virtuele/images/common/vlogo.svg"
            width="150"
            class="mx-auto"
          />
        </div>

        <div class="py-3 pb-0">
          <p class="text-center text-black font-weight-medium ls-05 mb-0" :class="isMobile ? 'mb-5' : 'mb-10'">
            Sign in to your account
          </p>
        </div>

        <div class="px-10 mx-5">
          <v-form
            ref="loginForm"
            v-model="isFormValid"
            lazy-validation
            @submit.prevent="handleSignIn"
          >
            <!-- Email Field -->
            <div class="py-0">
              <p class="mb-0 text-black ls-04 fs-12">Email</p>
              <v-text-field
                v-model="email"
                variant="outlined"
                density="compact"
                placeholder="Email"
                :rules="[requiredRule, emailRule]"
              />
            </div>

            <!-- Password Field -->
            <div class="py-0">
              <p class="mb-0 text-black ls-04 fs-12">Password</p>
              <v-text-field
                v-model="password"
                variant="outlined"
                density="compact"
                placeholder="Password"
                class="mb-0"
                :rules="[requiredRule, minRule]"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
                @blur="fetchCompanies"
              />
            </div>
            
            <!-- Company Selection -->
            <div :class="{ 'op-05': !isCompanyListReady }" class="py-0">
              <p class="mb-0 text-black ls-04 fs-12">Company</p>
              <v-select
                v-model="selectedCompany"
                :items="companyList"
                item-title="companyName"
                return-object
                placeholder="Select Company"
                variant="outlined"
                density="compact"
                :rules="[requiredRule]"
                :loading="isFetchingCompanies"
                no-data-text="Loading your companies..."
              />
            </div>
            
            <!-- Remember Me Checkbox -->
            <div class="pa-0">
              <v-checkbox
                v-model="rememberMe"
                label="Remember me"
                hide-details
                density="compact"
                class="mt-2 text-subtitle-2"
              />
            </div>

            <!-- Sign In Button -->
            <div :class="{ 'pointer-events-none op-05': !isCompanyListReady || isLoading }" class="py-5">
              <v-btn
                type="submit"
                block
                color="primary"
                class="font-weight-regular"
                :disabled="!isFormValid"
                :loading="isLoading"
              >
                <v-icon size="small" start icon="mdi-login" />
                Sign in
              </v-btn>
            </div>
          </v-form>
        </div>

        <!-- Links Section -->
        <div class="py-5 pb-2 text-center">
          <p class="primary-text-2 ls-08 text-subtitle-2 font-weight-regular text-decoration-underline c-pointer fs-13" @click="router.push('/forgot-password')">
            Forgot Password
          </p>
        </div>
        <div class="mx-2 text-center">
          <v-btn variant="text" class="primary-text-1 ls-08 text-uppercase" @click="router.push('/signup')">
            Create New Account
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
    </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify';
import { useAuthStore } from '@/stores/auth';

// --- Stores and Composables ---
const authStore = useAuthStore();
const router = useRouter();
const { smAndDown: isMobile } = useDisplay(); // For responsive layout

// --- Template Refs ---
const loginForm = ref<any>(null); 

// --- Component State ---
const email = ref('');
const password = ref('');
const selectedCompany = ref<any>(null);
const rememberMe = ref(false);
const isPasswordVisible = ref(false);
const isFormValid = ref(false);
const isLoading = ref(false);
const isFetchingCompanies = ref(false);
const defaultHeight = ref(window.innerHeight); // For min-height binding

// --- Computed Properties ---
const companyList = computed(() => authStore.availableCompanies);
const isCompanyListReady = computed(() => companyList.value.length > 0);
const errorMessage = computed({
  get: () => authStore.preAuthError,
  set: (value) => { authStore.preAuthError = value; }
});

// --- Validation Rules ---
const requiredRule = (v: any) => !!v || 'Required';
const emailRule = (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid';
const minRule = (v: string) => (v && v.length >= 8) || 'Min 8 characters';

// --- Methods ---
const fetchCompanies = async () => {
  // Simple validation to avoid unnecessary API calls
  const isEmailValid = emailRule(email.value) === true;
  const isPasswordValid = minRule(password.value) === true;
  if (!isEmailValid || !isPasswordValid) return;

  isFetchingCompanies.value = true;
  try {
    await authStore.fetchCompaniesForUser({ email: email.value, password: password.value });
    if (isCompanyListReady.value) {
      selectedCompany.value = companyList.value[0];
    }
  } catch (error) {
    // Error is handled in the auth store and reflected in the `errorMessage` computed property
  } finally {
    isFetchingCompanies.value = false;
  }
};

const handleSignIn = async () => {
  // Vuetify 3 forms automatically update the v-model `isFormValid`
  if (!isFormValid.value || !selectedCompany.value) return;

  isLoading.value = true;
  try {
    await authStore.loginWithCompany({
      email: email.value,
      password: password.value,
      company: selectedCompany.value,
    });
    // Navigation on success is handled within the authStore action
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* These scoped styles ensure the classes from the original template work as intended */
.right-float-form {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
.bg-f9fafc {
  background-color: #f9fafc;
}

/* You would add other custom classes like ls-04, fs-12 here or in your global stylesheet */
.ls-04 { letter-spacing: 0.4px !important; }
.ls-05 { letter-spacing: 0.5px !important; }
.ls-08 { letter-spacing: 0.8px !important; }
.fs-12 { font-size: 12px !important; }
.fs-13 { font-size: 13px !important; }
.op-05 { opacity: 0.5; }
.c-pointer { cursor: pointer; }
.zindex-9 { z-index: 9; }
</style>