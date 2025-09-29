// FILE: src/composables/useCommon.ts

import { useRouter } from 'vue-router';
import type { AxiosError } from 'axios';
import axios from '@/assets/js/axios-auth';
import { emitter } from '@/composables/emitter';
import { useAuthStore } from '@/stores/auth';

export function useCommon() {
  const router = useRouter();
  // We need to initialize the authStore inside the composable to use it.
  const authStore = useAuthStore();

  const catchAlert = (error: any): string => {
    const err = error as AxiosError<any>;
    if (!err.response) return "Network error.";
    const { status, data } = err.response;
    if (status === 403 && data?.reason === "FORBIDDEN") {
      authStore.setTokenExpired(true); // Still a valid use case for the toolbelt
      emitter.emit('trigger-parallel-login-alert', true);
      return "";
    }
    return data?.message || data?.error || `An unexpected error occurred.`;
  };

  // getAPIResponse is a generic helper, so it stays here.
  const getAPIResponse = async <T>(url: string): Promise<T> => {
    try {
      const response = await axios.get<T>(url);
      return response.data;
    } catch (error) {
      const errorMessage = catchAlert(error);
      if (errorMessage) emitter.emit('viewsnackbar', ["error", errorMessage]);
      throw error;
    }
  };

  // `switchCompany` and `switchProject` are REMOVED from here.
  // `encryptStoreKeysHandler` is also business logic and should likely move to `app.ts` or `auth.ts`.

  return {
    catchAlert,
    getAPIResponse,
  };
}