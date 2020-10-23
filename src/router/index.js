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
    name: 'Home'
  },
  {
    path: '/Editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/About',
    name: 'About',
    component: About
  },
  {
    path: '/Account',
    name: 'Account',
    component: Account
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
