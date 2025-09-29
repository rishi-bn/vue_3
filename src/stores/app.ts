import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
    // --- Your Existing State ---
    const activeScreen = ref<string | null>(null);
    const redirect = ref<any>(null);
    const monitorStatus = ref<boolean>(false);

    // --- My New Additions (for Snackbar and Loader) ---
    const snackbar = ref({
      show: false,
      message: '',
      color: 'info',
    });
    const screenLoader = ref(false);

    // --- Your Existing Actions ---
    function setActiveScreen(screen: string) {
        activeScreen.value = screen;
    }
    function setMonitorStatus(status: boolean) {
        monitorStatus.value = status;
    }

    // --- My New Actions ---
    function showSnackbar(color: string, message: string) {
      snackbar.value.message = message;
      snackbar.value.color = color;
      snackbar.value.show = true;
    }
    
    function hideSnackbar() {
        snackbar.value.show = false;
    }

    function setScreenLoader(isLoading: boolean) {
      screenLoader.value = isLoading;
    }

    // --- Return EVERYTHING so it can be used in components ---
    return { 
        activeScreen, 
        redirect, 
        monitorStatus, 
        snackbar,
        screenLoader,
        setActiveScreen, 
        setMonitorStatus,
        showSnackbar,
        hideSnackbar,
        setScreenLoader
    };
});