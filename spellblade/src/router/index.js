import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Logout from '@/views/Logout.vue'
import Signup from '@/views/Signup.vue'
import Dashboard from '@/views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: { requiresAuth: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
