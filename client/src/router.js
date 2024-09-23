import { createRouter, createWebHistory } from 'vue-router'
import TheChessView from './components/TheChessView.vue'
import UsersList from './components/UsersList.vue'
import IndexView from './components/IndexView.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: IndexView
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
