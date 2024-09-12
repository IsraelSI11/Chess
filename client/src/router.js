import { createRouter, createWebHistory } from 'vue-router'
import ConnectUser from './components/ConnectUser.vue'
import TheChessView from './components/TheChessView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ConnectUser
  },
  {
    path: '/chess',
    name: 'Chess',
    component: TheChessView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
