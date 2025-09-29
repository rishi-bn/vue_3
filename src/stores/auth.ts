// FILE: src/stores/auth.ts

import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import axios from '@/assets/js/axios-auth'; 
import { useUserStore, type SwitchableCompany } from './user';
// import { useWebSocketStore } from './websocket';
import { emitter } from '@/composables/emitter';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', () => {
  // --- Initialize other stores and router for use in actions ---
  const router = useRouter();
  const userStore = useUserStore();
  // const wsStore = useWebSocketStore();

  // --- State ---
  // State related ONLY to the authentication process and session.
  const idToken = ref<string | null>(localStorage.getItem('idToken')); 
  const preAuthError = ref<string | null>(null);
  const sessionActive = ref(false);
  const availableCompanies = ref<any[]>([]);
  

  // --- Getters ---
  const isLoggedIn = computed(() => !!idToken.value);

  // --- Actions ---

  /**
   * Step 1 of Login: Fetches a user's associated companies based on email/password.
   */
  async function fetchCompaniesForUser(payload: { email: string, password: string }) {
    availableCompanies.value = [];
    
    preAuthError.value = null;
    try {
      const response = await api.post('/api/user/pre-auth', {
        username: payload.email,
        password: payload.password,
      });

      // userStore.setUserPreauth({
      //   companyId : response.data.data.companyId,
      //   companyName : response.data.data.companyName,
      //   isExternal : response.data.data.isExternal,
        
      // })
      console.log("availableCompanies",availableCompanies.value)
      
      if (response.data?.data?.length > 0) {
        availableCompanies.value = response.data.data;
      } else {
        preAuthError.value = "No companies associated with this account.";
      }
    } catch (error: any) {
      preAuthError.value = error.response?.data?.message || 'Invalid credentials.';
      throw error;
    }
  }

  /**
   * Step 2 of Login: Authenticates with a selected company and correctly populates all necessary stores.
   */
  async function loginWithCompany(payload: { email: string, password: string, company: any }) {
    try {
      const { email, password, company } = payload;
      const legacyUsername = `${email},${company.companyId},${company.isExternal ? 1 : 0}`;
      const response = await api.post('/api/user/login', { username: legacyUsername, password });

      const token = response.headers.token;
      const data = response.data.data;
      if (!token || !data) throw new Error("Invalid login response");

      // 1. Set the token in this (auth) store
      setToken(token);
      localStorage.setItem('idToken', token);
      // 2. Find the full company name from the pre-auth list
      const currentCompany = availableCompanies.value.find(c => c.companyId === (data.isExternal ? data.parentCompanyId : data.companyId));
      const companyName = currentCompany?.companyName || 'Unknown Company';
      
      // 3. Delegate user data to the userStore
      userStore.setUser({
        userId: data.userId,
        userName: `${data.firstName} ${data.lastName}`,

        firstName: data.firstName,
        lastName: data.lastName,

        userEmail: email,
        currentCompany : companyName,

        selectedOrgRoleId: data.selectedOrgRoleId,
        companyId: data.companyId,
        companyType: data.isExternal,
        parentCompanyId: data.parentCompanyId,
        
      });
      userStore.setCompanyToken(token);
      
      router.push('/module/dashboard');
    } catch (error) {
      console.error("Final login failed:", error);
      throw error;
    }
  }
  
  /**
   * Switches the user's active company context.
   */
  async function switchCompany(companyToSwitchTo: SwitchableCompany) {
    if (!userStore.user || !idToken.value) return;
    console.log("Switching to company:", companyToSwitchTo);
    console.log("companyToSwitchTo",companyToSwitchTo);
    
    const payload = {
      companyId: companyToSwitchTo.companyId,
      projectId: null,
      token: idToken.value,
      userName: userStore.user.userEmail.split(",")[0],
    };
    console.log("payload_switch",payload);
    emitter.emit('toggleScreenLoader', true);
    try {
      const response = await api.post('api/user/switch/company', payload);
      const token = response.headers.token;
      const data = response.data.data;
      if (!token || !data) throw new Error("Switch failed");
      
      idToken.value = token;
      
      // const currentCompany = availableCompanies.value.find(c => c.companyId === (data.isExternal ? data.parentCompanyId : data.companyId));
      
      const companyName = companyToSwitchTo.isExternal ? companyToSwitchTo.parentCompanyName! : companyToSwitchTo.companyName
      console.log("companyName_switch",companyName);
      
      userStore.setUser({
        userId: data.userId,
        userName: `${data.firstName} ${data.lastName}`,

        firstName: data.firstName,
        lastName: data.lastName,

        userEmail: userStore.user.userEmail, // Keep original email
        currentCompany : companyName,

        selectedOrgRoleId: data.selectedOrgRoleId,
        companyId: data.companyId,
        companyType: data.isExternal,
        parentCompanyId: data.parentCompanyId,
      });
      userStore.setCompanyToken(token);
      
      localStorage.setItem('idToken', token);
      console.log("Switch successful");
      console.log("userStore.user",userStore.user);
      
    } catch (error) { console.error("Failed to switch company:", error);}
    finally { emitter.emit('toggleScreenLoader', false); }
  }
  
  function setToken(token: string | null) {
    idToken.value = token;
    if (token) localStorage.setItem('idToken', token);
    else localStorage.removeItem('idToken');
  }

  function logout() {
    idToken.value = null;
    // userStore.clearUser(); 
    localStorage.clear();
    // wsStore.disconnect();
    router.push('/');
  }

  return {
    // State
    idToken,
    availableCompanies,
 
    preAuthError,
    sessionActive,
    // Getters
    isLoggedIn,
    // Actions
    fetchCompaniesForUser,
    loginWithCompany,
    switchCompany,
    logout,
    setToken,
    
   
  };
});