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

export default {
  name: 'App',

  components: {
    MapComponent,
    SideMenu
  },

  data: () => ({
    //
  })
}
</script>
