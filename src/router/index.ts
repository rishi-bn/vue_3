// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// For now, we will create a placeholder for our LoginView.
// We will create the actual component file later.
const LoginView = { template: '<div>Login Page</div>' }
const DashboardView = { template: '<div>Dashboard Page</div>' }

const routes = [
  {
    path: '/',
    name: 'Login',
    component:  () => import('@/views/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component:  () => import('@/views/register.vue'),
  },
  {
    path: "/module/dashboard",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(), // Uses the browser's history API for clean URLs
  routes, // This is the short-hand for routes: routes
})

export default router