import axios from 'axios'
import type { AxiosInstance } from 'axios' 

interface CustomAxiosInstance extends AxiosInstance {
  baseBucketName?: string
  baseNotificationURL?: string
  clientId?: string
  clientSecret?: string
  procoreLogin?: string
}



const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVICE_URL,
}) as CustomAxiosInstance

// Attach additional custom properties (optional metadata)
instance.baseBucketName = import.meta.env.VITE_SERVICE_BUCKET
instance.baseNotificationURL = import.meta.env.VITE_NOTIFICATION_URL
instance.clientId = import.meta.env.VITE_CLIENTID
instance.clientSecret = import.meta.env.VITE_CLIENTSECRET
instance.procoreLogin = import.meta.env.VITE_PROCORELOGIN

export default instance
