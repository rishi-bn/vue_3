<template>
  <div class="d-flex align-center">
    <!-- Notification View (Stub) -->
    <BellNotification />
    <!-- <v-btn v-if="!monitoringMode" icon size="small" class="mr-3">
      <v-badge content="0" color="primary">
        <v-icon width="25">mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn> -->

    <!-- Help View -->
    <v-btn v-if="!monitoringMode" icon size="small" class="mr-2" @click="openHelpDoc">
      <v-img width="25" src="https://dvlc9qcftewvt.cloudfront.net/assets/images/header/headerissue.svg" />
    </v-btn>

    <!-- Chat bot View -->
    <v-btn class="mr-2" icon size="small" @click="uiStore.openChatbot()">
      <v-img width="25" src="https://dvlc9qcftewvt.cloudfront.net/assets/images/chatbot.svg" />
    </v-btn>

    <!-- Settings View - A direct translation of your original v-menu -->
    <v-menu v-if="!monitoringMode" location="bottom end" transition="slide-y-transition">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="mr-3">
          <v-img width="25" src="https://dvlc9qcftewvt.cloudfront.net/assets/images/setting.svg" />
        </v-btn>
      </template>
      <v-list density="compact" nav class="py-0">
        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          @click="settingsAction(item)"
          class="b-b"
        >
          <template #prepend>
            <!-- This v-if/v-else-if structure exactly mirrors your original template -->
            <v-img
              v-if="item.title == 'Micellaneous Steel'"
              width="22"
              class="mr-3"
              :src="item.iconUrl"
            />
            <v-img
              v-else-if="item.title == 'Shop Standards'"
              width="22"
              class="mr-3"
              :src="item.iconUrl"
            />
            <v-img
              v-else-if="item.title == 'Connection Library'"
              width="22"
              class="mr-3"
              :src="item.iconUrl"
            />
            <v-img
              v-else-if="item.title == 'VIRTUELE Plugins'"
              width="22"
              class="mr-3"
              :src="item.iconUrl"
            />
            <v-icon v-else :icon="item.icon" class="" />
          </template>
          <v-list-item-title class="text-subtitle-2">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- User Profile Menu -->
    <v-menu location="bottom end" transition="slide-x-transition" :close-on-content-click="false">
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ml-0 mr-5">
          <v-avatar size="32">
            <v-img :src="profilePic" alt="User Avatar" cover />
          </v-avatar>
        </v-btn>
      </template>
      <v-card min-width="250">
        <div class="text-center pa-4">
          <v-avatar size="80" class="mb-4">
            <v-img :src="profilePic" alt="User Avatar" cover />
          </v-avatar>
          <h4 class="text-h6">{{ fullName }}</h4>
          <p class="text-body-2 text-medium-emphasis mt-1 mb-0 ls-07">
            {{ userStore.user?.userEmail }}
          </p>
        </div>
        <v-divider />
        <v-list density="compact" nav class="py-0">
          <v-list-item
            v-for="(item, index) in userViewItems"
            :key="index"
            @click="profileAction(item.action)"
            :prepend-icon="item.icon"
            class="py-1"
          >
            <v-list-item-title class="text-subtitle-2 font-weight-regular">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// --- Import your local SVG asset ---
import DefaultAvatarSVG from '@/assets/avatar.svg';

// --- Pinia Store Imports ---
import { useUserStore } from '@/stores/user';
import { useAuthStore } from '@/stores/auth';
import { useAppStore } from '@/stores/app';
import api from '@/services/api';
import { useUiStore } from '@/stores/chatBot/ui';
import BellNotification from './BellNotification.vue';

const uiStore = useUiStore();
// --- Type Definitions ---
interface MenuItem { title: string; iconUrl: string; action: string; }
interface UserMenuItem { title: string; icon: string; action: 'MySpace' | 'SignOut'; }

// --- Stores and Router ---
const userStore = useUserStore();
const authStore = useAuthStore();
const appStore = useAppStore();
const router = useRouter();
const isChatBotOpen = ref(false);
// --- Component State ---
const profilePic = ref(DefaultAvatarSVG);
const fullName = computed(() => userStore.user ? `${userStore.user.firstName} ${userStore.user.lastName}` : '');
const monitoringMode = computed(() => appStore.monitorStatus);

// --- THIS IS YOUR ORIGINAL DATA ---
const menuItems = ref<MenuItem[]>([
  {
    title: "Micellaneous Steel",
    iconUrl: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/devimages/accountadmin/shopstandards.svg",
    action: 'ShopStandard'
  },
  {
    title: "Shop Standards",
    iconUrl: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/devimages/accountadmin/shopstandards.svg",
    action: 'ShopStandard'
  },
  {
    title: "Connection Library",
    iconUrl: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/devimages/accountadmin/connectiondesignlibrary.svg",
    action: 'ConnectionLibrary'
  },
  {
    title: "VIRTUELE Plugins",
    iconUrl: "https://dvlc9qcftewvt.cloudfront.net/virtuele/images/plugins/virtueleplugins.svg",
    action: 'VirtuelePlugins'
  },
]);

const userViewItems = ref<UserMenuItem[]>([
  { title: "My Space", icon: "mdi-account-details", action: 'MySpace' },
  { title: "Sign Out", icon: "mdi-logout-variant", action: 'SignOut' },
]);

// --- Methods (Simplified as per your request) ---

const openHelpDoc = () => window.open("https://virtuele.zohodesk.com/portal/en/home", "_blank");

const settingsAction = (item: MenuItem) => {
  const urlMap: Record<string, string> = {
    'ShopStandard': '/directory/shopstandard',
    'ConnectionLibrary': '/directory/connectionlibrary',
    'VirtuelePlugins': '/directory/plugins',
  };
  const url = urlMap[item.action];
  if (url) {
    window.open(url, '_blank');
  } else {
    console.warn(`No URL defined for settings action: ${item.action}`);
  }
};

const profileAction = (action: 'MySpace' | 'SignOut') => {
  if (action === "MySpace") {
    router.push({ name: "MySpacing" });
  } else if (action === "SignOut") {
    handleLogout();
  }
};

const handleLogout = async () => {
  try {
    const response = await api.post("api/user/logout", {});
    if (response.data.status) {
      authStore.logout();
    } else {
      throw new Error("Logout failed");
    }
  } catch (error) {
    console.error("Logout API call failed, logging out locally anyway:", error);
    authStore.logout();
  }
};

</script>

<style scoped>
/* Scoped styles are a best practice */
.ls-07 { letter-spacing: 0.7px !important; }
.b-b { border-bottom: 1px solid #e0e0e0; }
</style>