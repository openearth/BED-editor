import Vue from 'vue'
import VueRouter from 'vue-router'
import Editor from '../views/Editor.vue'
import About from '../views/About.vue'

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
  }
]

const router = new VueRouter({
  routes
})

export default router
