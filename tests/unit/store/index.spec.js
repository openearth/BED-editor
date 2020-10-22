import store from '@/store/index.js'

test('Initial state', () => {
  const initialState = {
    editorTemplate: {},
    selectedBbox: {},
    user: null
  }
  expect(store.state).toEqual(initialState)
})

describe('setBboxProperties', () => {
  test('updates state.selectedBbox with ids in payload', () => {
    const state = {
      selectedBbox: {}
    }
    const props = { prop: 'prop1' }
    store.commit('setBboxProperties', (props))
    expect(store.state.selectedBbox.properties).toBe(props)
  })
})

describe('setUser', () => {
  test('updates state.selectedBbox with ids in payload', () => {
    const state = {
      user: null
    }
    const user = { user: 'name' }
    store.commit('setUser', (user))
    expect(store.state.user).toBe(user)
  })
})

describe('loadEditorConfig', () => {
  test('updates state.editorTemplate and state.selectedBbox with schemas in payload', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({
          components: {
            schemas: {
              HydroMTProcessInputs: {
                properties: {
                  foo: 'bar',
                  type: 'type'
                }
              },
              BBox: {
                bar: 'foo'
              }
            }
          }
        })
      })
    )
    await store.dispatch('loadEditorConfig', store)
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(store.state.editorTemplate).toEqual({
      properties: {
        foo: 'bar'
      }
    })
    expect(store.state.selectedBbox).toEqual({
      bar: 'foo'
    })
  })
})
