import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './plugins/vue2mapbox-gl'

import '@/css/main.css'
import '@/css/typography.css'
import '@/css/markdown.css'

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
