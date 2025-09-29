import type { set } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/services/api';
import { emitter } from '@/composables/emitter';

// interface UserPreauth {
//   companyId: number;
//   companyName: string;
//   isExternal: boolean;
// }

interface User {
  userId: number;
  userName: string;
  
  currentCompany: string;
  userEmail: string;
  firstName: string;
  lastName: string;

  selectedOrgRoleId: number;
  companyId: number;
  companyType: boolean;
  parentCompanyId: number;
}

export interface SwitchableCompany {
    parentCompanyId: number | null;
    parentCompanyName: string | null;
    companyId: number;
    companyName: string;
    isExternal: boolean;
    userId: number;
    
}

export const useUserStore = defineStore('user', () => {
  
  // const User_Preauth = ref<UserPreauth | null>(null);
  // console.log("User_Preauth",User_Preauth);
  
  // function setUserPreauth(userPreauthData: UserPreauth | null) { User_Preauth.value = userPreauthData; }
  
  const user = ref<User | null>(null);
  const companyToken = ref<string >();
  const userStatus = ref<'ACTIVE' | 'DEACTIVE' | null>(null);
  // const companyRoles = ref<string[]>([]);
  // const companyName = ref<string>('Virtuele INC'); 
  // const userRoles = ref<string[]>([]);
  // const userRolesType = ref<'Company' | 'Project'>('Project');
  // const userStatus = ref<'ACTIVE' | 'DEACTIVE' | null>(null);

  function setUser(userData: User | null) { user.value = userData; }
  function setCompanyToken(token: string ) { companyToken.value = token; }
  // function setCompanyRoles(roles: string[]) { companyRoles.value = roles; }
  // function setRoles(roles: string[], type: 'Company' | 'Project') { /* ... */ }
  // function setUserStatus(status: 'ACTIVE' | 'DEACTIVE' | null) { userStatus.value = status; }

   const switchableCompanies = ref<SwitchableCompany[]>([]);
  
  // --- GETTERS TO BUILD THE UI ---
  const internalCompanies = computed(() => switchableCompanies.value.filter(c => !c.isExternal));
  const externalCompanies = computed(() => switchableCompanies.value.filter(c => c.isExternal));  
  /**
   * This is the NEW central function. It fetches all company contexts for the user.
   * This should be called by the Appbar after login.
   */
  async function fetchSwitchableCompanies() {
    if (!user.value?.userEmail) {
      console.warn("Cannot fetch switchable companies: user email is missing.");
      return;
    }
    try {
      const username = user.value.userEmail.split(",")[0];
      const response = await api.get<SwitchableCompany[]>(`api/user/companies/to/switch/${username}`);
      switchableCompanies.value = response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to load company list.";
      emitter.emit('viewsnackbar', ['error', message]);
    }
  }
   function setUserStatus(status: 'ACTIVE' | 'DEACTIVE') { 
    userStatus.value = status;
  }

  return { 
    user, 
    companyToken, 
    switchableCompanies, 
    internalCompanies,   
    externalCompanies,   
    setUser, 
    setCompanyToken, 
    fetchSwitchableCompanies, 
    userStatus, 
    setUserStatus
  };
});