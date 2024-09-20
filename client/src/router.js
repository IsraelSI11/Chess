import { createRouter, createWebHistory } from 'vue-router'
import ConnectUser from './components/ConnectUser.vue'
import TheChessView from './components/TheChessView.vue'
import UsersList from './components/UsersList.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: ConnectUser
  },
  {
    path: '/home',
    name: 'Home',
    component: UsersList
  },
  {
    path: '/chess/:to/:from',
    name: 'Chess',
    component: TheChessView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
