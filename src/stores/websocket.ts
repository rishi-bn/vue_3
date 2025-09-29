// FILE: src/stores/websocket.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'webstomp-client';
import type { Subscription } from 'webstomp-client';

import axios from '@/assets/js/axios-auth'; 
// This will hold the single Stomp client instance for the entire application.
// It lives outside the store definition to act as a singleton.
let stompClient: Client | null = null;

// This will keep track of active subscriptions to prevent duplicates and allow for cleanup.
const activeSubscriptions = new Map<string, Subscription>();

export const useWebSocketStore = defineStore('websocket', () => {
  // --- State ---
  // A reactive flag to let any component (like the Footer) know if the connection is live.
  const isConnected = ref(false);

  // --- Core Actions ---

  /**
   * Establishes a connection to the WebSocket server using Stomp over SockJS.
   * This action should only be called once, typically when the application loads for an authenticated user.
   */
  const connect = (): Promise<void> => {
    // Prevent multiple connections
    if (stompClient && isConnected.value) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const socket = new SockJS(`${axios.defaults.baseURL}virtuele-socket`);
      stompClient = Stomp.over(socket);
      
      // Disable the library's noisy console logging in production
      stompClient.debug = () => {};

      stompClient.connect(
        {}, // No extra headers needed for connection
        (frame) => {
          console.log('%cWebSocket connected successfully.', 'color: green', frame);
          isConnected.value = true;
          resolve();
        },
        (error) => {
          console.error('WebSocket connection failed:', error);
          isConnected.value = false;
          stompClient = null;
          reject(error);
        }
      );
    });
  };

  /**
   * Disconnects from the WebSocket server and clears all active subscriptions.
   * This should be called on user logout.
   */
  const disconnect = () => {
    if (stompClient && isConnected.value) {
      stompClient.disconnect(() => {
        console.log('WebSocket disconnected.');
      });
    }
    // Clean up state
    isConnected.value = false;
    stompClient = null;
    activeSubscriptions.clear();
  };

  // --- Generic Subscription Management ---

  /**
   * A generic, safe subscription method. It prevents duplicate subscriptions to the same channel.
   * @param {string} channel - The channel/topic to subscribe to.
   * @param {(message: any) => void} onMessage - The callback function to handle incoming messages.
   */
  const subscribe = (channel: string, onMessage: (message: any) => void) => {
    if (!stompClient || !isConnected.value) {
      console.warn(`Cannot subscribe to "${channel}". WebSocket is not connected.`);
      return;
    }
    if (activeSubscriptions.has(channel)) {
      return; // Already subscribed
    }
    const subscription = stompClient.subscribe(channel, (tick) => {
      try {
        const message = JSON.parse(tick.body);
        onMessage(message);
      } catch (e) {
        console.error(`Failed to parse WebSocket message from channel: ${channel}`, tick.body);
      }
    });
    activeSubscriptions.set(channel, subscription);
  };

  /**
   * Unsubscribes from a specific channel.
   * @param {string} channel - The channel/topic to unsubscribe from.
   */
  const unsubscribe = (channel: string) => {
    if (activeSubscriptions.has(channel)) {
      activeSubscriptions.get(channel)?.unsubscribe();
      activeSubscriptions.delete(channel);
    }
  };

  // ===================================================================
  // --- ALL SPECIFIC SUBSCRIPTION HELPERS (Complete List) ---
  // ===================================================================

  const subscribeToNewRegistration = (onMessage: (message: string) => void) => subscribe("/ws/customer/new-registration", (p) => onMessage(p.message));
  const unsubscribeFromNewRegistration = () => unsubscribe("/ws/customer/new-registration");

  const subscribeToPotentialCompany = (companyId: number, onMessage: (message: string) => void) => subscribe(`/ws/customer/potential/${companyId}`, (p) => onMessage(p.message));
  const unsubscribeFromPotentialCompany = (companyId: number) => unsubscribe(`/ws/customer/potential/${companyId}`);

  const subscribeToCompany = (companyId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${companyId}`, (p) => onMessage(p.message));
  const unsubscribeFromCompany = (companyId: number) => unsubscribe(`/ws/company/${companyId}`);

  const subscribeToCompanyUsers = (companyId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${companyId}/user-ops`, (p) => onMessage(p.message));
  const unsubscribeFromCompanyUsers = (companyId: number) => unsubscribe(`/ws/company/${companyId}/user-ops`);

  const subscribeToAddCompanyOrgRole = (companyId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${companyId}/role`, (p) => onMessage(p.message));
  const unsubscribeFromAddCompanyOrgRole = (companyId: number) => unsubscribe(`/ws/company/${companyId}/role`);

  const subscribeToCompanyOrgRoleOps = (roleId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${roleId}/role-ops`, (p) => onMessage(p.message));
  const unsubscribeFromCompanyOrgRoleOps = (roleId: number) => unsubscribe(`/ws/company/${roleId}/role-ops`);

  const subscribeToContactCompany = (companyId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${companyId}/contactCompany-ops`, (p) => onMessage(p.message));
  const unsubscribeFromContactCompany = (companyId: number) => unsubscribe(`/ws/company/${companyId}/contactCompany-ops`);
  
  const subscribeToUserBellNotifications = (companyId: number, userId: number, onMessage: (message: string) => void) => subscribe(`/ws/company/${companyId}/user/${userId}/bell`, (p) => onMessage(p.message));
  const unsubscribeFromUserBellNotifications = (companyId: number, userId: number) => unsubscribe(`/ws/company/${companyId}/user/${userId}/bell`);

  const subscribeToContactCompanyOps = (contactCompanyId: number, onMessage: (message: string) => void) => subscribe(`/ws/contact/${contactCompanyId}/ops`, (p) => onMessage(p.message));
  const unsubscribeFromContactCompanyOps = (contactCompanyId: number) => unsubscribe(`/ws/contact/${contactCompanyId}/ops`);

  const subscribeToUser = (userId: number, onMessage: (message: string) => void) => subscribe(`/ws/user/${userId}`, (p) => onMessage(p.message));
  const unsubscribeFromUser = (userId: number) => unsubscribe(`/ws/user/${userId}`);

  const subscribeToUserProject = (userId: number, onMessage: (message: string) => void) => subscribe(`/ws/user/${userId}/project/ops`, (p) => onMessage(p.message));
  const unsubscribeFromUserProject = (userId: number) => unsubscribe(`/ws/user/${userId}/project/ops`);

  const subscribeToProjectTeam = (projectId: number, onMessage: (message: string) => void) => subscribe(`/ws/project/${projectId}/team/ops`, (p) => onMessage(p.message));
  const unsubscribeFromProjectTeam = (projectId: number) => unsubscribe(`/ws/project/${projectId}/team/ops`);

  const subscribeToProjectRoleOps = (pRoleId: number, onMessage: (message: string) => void) => subscribe(`/ws/project/${pRoleId}/role/ops`, (p) => onMessage(p.message));
  const unsubscribeFromProjectRoleOps = (pRoleId: number) => unsubscribe(`/ws/project/${pRoleId}/role/ops`);

  const subscribeToProjectModuleOps = (projectId: number, onMessage: (message: string) => void) => subscribe(`/ws/project/${projectId}/modules/ops`, (p) => onMessage(p.message));
  const unsubscribeFromProjectModuleOps = (projectId: number) => unsubscribe(`/ws/project/${projectId}/modules/ops`);

  const subscribeToProjectRFI = (projectId: number, onMessage: (message: string) => void) => subscribe(`/ws/project/${projectId}/rfi`, (p) => onMessage(p.message));
  const unsubscribeFromProjectRFI = (projectId: number) => unsubscribe(`/ws/project/${projectId}/rfi`);
  
  const subscribeToRFI = (rfiId: number, onMessage: (message: string) => void) => subscribe(`/ws/rfi/${rfiId}`, (p) => onMessage(p.message));
  const unsubscribeFromRFI = (rfiId: number) => unsubscribe(`/ws/rfi/${rfiId}`);

  const subscribeToModelExtraction = (modelRevisionId: number, onMessage: (message: any) => void) => subscribe(`/ws/model/${modelRevisionId}`, onMessage);
  const unsubscribeFromModelExtraction = (modelRevisionId: number) => unsubscribe(`/ws/model/${modelRevisionId}`);

  const subscribeToForgeExtraction = (modelRevisionId: number, onMessage: (message: any) => void) => subscribe(`/ws/forge/${modelRevisionId}`, onMessage);
  const unsubscribeFromForgeExtraction = (modelRevisionId: number) => unsubscribe(`/ws/forge/${modelRevisionId}`);

  const subscribeToModelCheckExtraction = (modelRevisionId: number, onMessage: (message: any) => void) => subscribe(`/ws/model-check/${modelRevisionId}`, onMessage);
  const unsubscribeFromModelCheckExtraction = (modelRevisionId: number) => unsubscribe(`/ws/model-check/${modelRevisionId}`);

  const subscribeToFileUpload = (companyId: number, userId: number, onMessage: (message: any) => void) => subscribe(`/ws/company/${companyId}/user/${userId}/file/upload`, onMessage);
  const unsubscribeFromFileUpload = (companyId: number, userId: number) => unsubscribe(`/ws/company/${companyId}/user/${userId}/file/upload`);

  const subscribeToSetUpPageFileUpload = (connectedDataId: number, onMessage: (message: any) => void) => subscribe(`/ws/connected-data-sync-process/${connectedDataId}`, onMessage);
  const unsubscribeFromSetUpPageFileUpload = (connectedDataId: number) => unsubscribe(`/ws/connected-data-sync-process/${connectedDataId}`);

  // --- Return the public API of the store ---
  return {
    isConnected,
    connect,
    disconnect,
    // Export all the specific helpers
    subscribeToNewRegistration, unsubscribeFromNewRegistration,
    subscribeToPotentialCompany, unsubscribeFromPotentialCompany,
    subscribeToCompany, unsubscribeFromCompany,
    subscribeToCompanyUsers, unsubscribeFromCompanyUsers,
    subscribeToAddCompanyOrgRole, unsubscribeFromAddCompanyOrgRole,
    subscribeToCompanyOrgRoleOps, unsubscribeFromCompanyOrgRoleOps,
    subscribeToContactCompany, unsubscribeFromContactCompany,
    subscribeToUserBellNotifications, unsubscribeFromUserBellNotifications,
    subscribeToContactCompanyOps, unsubscribeFromContactCompanyOps,
    subscribeToUser, unsubscribeFromUser,
    subscribeToUserProject, unsubscribeFromUserProject,
    subscribeToProjectTeam, unsubscribeFromProjectTeam,
    subscribeToProjectRoleOps, unsubscribeFromProjectRoleOps,
    subscribeToProjectModuleOps, unsubscribeFromProjectModuleOps,
    subscribeToProjectRFI, unsubscribeFromProjectRFI,
    subscribeToRFI, unsubscribeFromRFI,
    subscribeToModelExtraction, unsubscribeFromModelExtraction,
    subscribeToForgeExtraction, unsubscribeFromForgeExtraction,
    subscribeToModelCheckExtraction, unsubscribeFromModelCheckExtraction,
    subscribeToFileUpload, unsubscribeFromFileUpload,
    subscribeToSetUpPageFileUpload, unsubscribeFromSetUpPageFileUpload,
  };
});