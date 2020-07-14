import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorTemplate: [],
    selectedBbox: {}
  },
  mutations: {},
  actions: {
    loadEditorConfig (state) {
      console.log(process.env.VUE_APP_EDITOR_SERVER)
      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/openapi.json`)
        .then(res => {
          return res.json()
        })
        .then(response => {
          console.log(response.components.schemas.HydroMT.properties)
          state.editorTemplate = response.components.schemas.HydroMT.properties
        })
    }
  }
})
