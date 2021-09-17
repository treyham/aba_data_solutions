import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/vueApp/src/views/Home.vue'
import Vuex from '@/vueApp/src/views/Vuex.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@app/client/src/router') // lazy-load
    // @/vueApp/src/views/Axios.vue
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
