import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import About from '../views/About.vue'
import Account from '../views/Account.vue'
import Callback from '../views/auth/Callback'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home'
  },
  {
    path: '/editor/:jobId',
    name: 'editor',
    component: Editor
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/account',
    name: 'account',
    component: Account
  },
  {
    path: '/callback',
    name: 'callback',
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
