import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editorTemplate: []
  },
  mutations: {},
  actions: {
    loadEditorConfig (state) {
      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/hydromt`, { method: 'POST' })
        .then(res => {
          return res.json()
        })
        .then(response => {
          console.log(response)
          state.editorTemplate = response
        })
    }
  }
})
