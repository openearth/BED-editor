import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorTemplate: {},
    selectedBbox: {},
    user: null
  },
  mutations: {
    setBboxProperties (state, props) {
      // First throw out old state in order to update this object properly.
      // Otherwise when used in vue files as computed property, it won't see
      // the update
      state.selectedBbox.properties = {}
      state.selectedBbox.properties = props
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    loadEditorConfig (store) {
      // Get the openapi json to retrieve the template per model.
      // For now only HydroMT available
      let url = process.env.VUE_APP_EDITOR_SERVER
      url = url.replace('/v1', '')
      return fetch(`${url}/openapi.json`)
        .then(res => {
          return res.json()
        })
        .then(response => {
          // Save the schemas asstate properties
          const inputs = response.components.schemas.HydroMTProcessInputs
          delete inputs.properties.type
          this.state.editorTemplate = inputs
          this.state.selectedBbox = response.components.schemas.BBox
        })
    }
  }
})
