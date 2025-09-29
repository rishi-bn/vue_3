// src/main.ts

// 1. IMPORT THE CORE VUE FUNCTION
import { createApp } from 'vue'

// 2. IMPORT THE ROOT COMPONENT
import App from './App.vue'

// 3. IMPORT AND CREATE THE PLUGINS
// Pinia for State Management
import { createPinia } from 'pinia'

// Vue Router for pages/URLs
import router from './router' // We will create this file next

// Vuetify for the UI Component Library
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 


import '@/assets/css/_colors.scss';
import '@/assets/css/_mixins.scss';
import '@/assets/css/_variables.scss';
import '@/assets/css/app.css';
import '@/assets/css/app.scss';

import '@/assets/css/viewer.css';





// 4. INITIALIZE THE PLUGINS
const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
})

// 5. CREATE AND CONFIGURE THE APP
const app = createApp(App) // Create the app instance

app.use(pinia)      // Tell the app to use Pinia
app.use(router)     // Tell the app to use the Router
app.use(vuetify)    // Tell the app to use Vuetify

app.mount('#app')   // Mount the app to the DOM