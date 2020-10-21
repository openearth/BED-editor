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
      state.selectedBbox.properties = props
    },
    setUser (state, { user }) {
      state.user = user
    }
  },
  actions: {
    loadEditorConfig () {
      // Get the openapi json to retrieve the template per model.
      // For now only HydroMT available

      let url = process.env.VUE_APP_EDITOR_SERVER
      url = url.replace('/v1', '')
      fetch(`${url}/openapi.json`)
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
