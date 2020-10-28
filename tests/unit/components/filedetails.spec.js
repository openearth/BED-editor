import { shallowMount } from '@vue/test-utils'
import FileDetails from '@/components/FileDetails.vue'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

Vue.use(Vuetify)

describe('FileDetails.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(FileDetails)
  })

  it('Initializes FileDetails properly', () => {
    expect(wrapper.find('.file-details').exists()).toBe(true)
  })

  it('Method:downloadUrl returns a download url per filename', () => {
    const file = { name: 'test' }
    const url = wrapper.vm.downloadUrl(file)
    expect(url).toBe(`${process.env.VUE_APP_EDITOR_SERVER}/files/${file.name}`)
  })
})
