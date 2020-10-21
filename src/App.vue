<template>
  <v-app>
    <side-menu />
    <v-main>
      <router-view />
      <map-component />
    </v-main>
  </v-app>
</template>

<script>
import MapComponent from './components/MapComponent'
import SideMenu from './components/SideMenu'
import {
  mapActions, mapMutations
} from 'vuex'

export default {
  name: 'App',

  components: {
    MapComponent,
    SideMenu
  },

  data: () => ({
    //
  }),
  mounted () {
    this.loadEditorConfig()
    this.getUser()
  },
  methods: {
    ...mapActions(['loadEditorConfig']),
    ...mapMutations(['setUser']),
    getUser () {
      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/me`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          this.setUser(data)
        })
        .catch(error => {
          console.error('Error login', error)
        })
    }
  }
}
</script>
