import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorTemplate: {},
    selectedBbox: {}
  },
  mutations: {
    setBboxProperties (state, props) {
      state.selectedBbox.properties = props
    }
  },
  actions: {
    loadEditorConfig () {
      // Get the openapi json to retrieve the template per model.
      // For now only HydroMT available

      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/openapi.json`)
        .then(res => {
          return res.json()
        })
        .then(response => {
          // Save the schemas asstate properties
          this.state.editorTemplate = response.components.schemas.HydroMT
          // TODO: in backedn add default value property to all fields
          Object.keys(response.components.schemas.BBox.properties).forEach(
            key => {
              console.log(key)
              response.components.schemas.BBox.properties[key].value = 0
            }
          )
          this.state.selectedBbox = response.components.schemas.BBox
        })
    }
  }
})
