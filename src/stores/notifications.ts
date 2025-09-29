import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/services/api'; // Your API service

export interface Notification {
  bellNotificationId: number;
  message: string;
  isRead: boolean;
  createdDate: string;
  // Add other properties from your API response
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);
  const isLoading = ref(false);

  // GETTER: Calculates the number of unread notifications
  const unreadCount = computed(() => notifications.value.filter(n => !n.isRead).length);

  // ACTION: Fetches notifications from the server
  async function fetchNotifications() {
    isLoading.value = true;
    try {
      // const response = await api.get('/api/notifications');
      // notifications.value = response.data;
      
      // MOCK DATA for demonstration
      notifications.value = [
        { bellNotificationId: 1, message: 'Shilpa Moolya added Plans to Folder in Job# impact', isRead: false, createdDate: new Date().toISOString() },
        { bellNotificationId: 2, message: 'Quick Estimate has been created for Job# GW-Check-1', isRead: false, createdDate: new Date().toISOString() },
        { bellNotificationId: 3, message: 'Abhilash L has invited you to join Job# 00134', isRead: true, createdDate: '2025-09-17T10:00:00Z' },
      ];
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      isLoading.value = false;
    }
  }

  // ACTION: Marks a single notification as read
  async function markAsRead(notificationId: number) {
    const notification = notifications.value.find(n => n.bellNotificationId === notificationId);
    if (notification && !notification.isRead) {
      notification.isRead = true; // Optimistic update for instant UI feedback
      // await api.put(`/api/notifications/${notificationId}/read`);
    }
  }

  // ACTION: Marks all notifications as read
  async function markAllAsRead() {
    notifications.value.forEach(n => n.isRead = true);
    // await api.post('/api/notifications/read-all');
  }
  
  // ACTION: Deletes a notification
  async function deleteNotification(notificationId: number) {
    notifications.value = notifications.value.filter(n => n.bellNotificationId !== notificationId);
    // await api.delete(`/api/notifications/${notificationId}`);
  }

  return { notifications, isLoading, unreadCount, fetchNotifications, markAsRead, markAllAsRead, deleteNotification };
});