<template>
  <v-mapbox
    id="map"
    ref="map"
    :access-token="mapboxAccessToken"
    :preserve-drawing-buffer="true"
    map-style="mapbox://styles/global-data-viewer/cjtss3jfb05w71fmra13u4qqm"
    :logoPosition="'bottom-right'"
    :trackResize="'false'"
  >
    <v-mapbox-navigation-control
      :options="{ visualizePitch: true }"
      position="bottom-right"
    />
  </v-mapbox>
</template>

<script>
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import DrawRectangle from 'mapbox-gl-draw-rectangle-mode'
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  watch: {
    $route (to, from) {
      if (to.name === 'Editor' && from.name !== 'Editor') {
        this.addDrawingTools()
      } else if (from.name === 'Editor') {
        this.removeDrawingTools()
      }
    }
  },
  mounted () {
    this.map = this.$refs.map.map
    this.modes = MapboxDraw.modes
    this.modes.draw_polygon = DrawRectangle
    this.draw = new MapboxDraw({
      controls: {
        polygon: true,
        trash: true
      },
      modes: this.modes,
      displayControlsDefault: false
    })
    this.addDrawingTools()
  },
  data () {
    return {
      mapboxAccessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      draw: {}
    }
  },
  computed: {
    ...mapState(['selectedBbox']),
    bbox: {
      get () {
        return this.selectedBbox.properties
      },
      set (val) {
        const props = _.merge(this.$store.state.selectedBbox.properties, val)
        this.setBboxProperties(props)
      }
    }
  },
  methods: {
    ...mapMutations(['setBboxProperties']),
    addDrawingTools () {
      this.map.addControl(this.draw, 'top-right')
      this.map.on('draw.create', this.drawFunction)
      this.map.on('draw.delete', () => {
        this.bbox = {
          latitude_min: { value: null },
          latitude_max: { value: null },
          longitude_min: { value: null },
          longitude_max: { value: null }
        }
      })
    },
    drawFunction (e) {
      // First delete all previous elements in the draw component, so we always have 1 bbox selected
      // Store a new bbox and send the coordinates to the store
      this.draw.deleteAll()
      this.draw.add(e.features[0])
      const N = Math.min(...e.features[0].geometry.coordinates[0][3])
      const W = Math.max(...e.features[0].geometry.coordinates[0][3])
      const S = Math.max(...e.features[0].geometry.coordinates[0][1])
      const E = Math.min(...e.features[0].geometry.coordinates[0][1])
      const NW = this.map.project([N, W])
      const SE = this.map.project([S, E])
      const features = this.map.queryRenderedFeatures([NW, SE], {
        layers: this.circleLayers
      })
      this.profileIds = features.map(feat => {
        return feat.properties.cdi_id
      })
      this.bbox = {
        latitude_min: { value: E },
        latitude_max: { value: W },
        longitude_min: { value: N },
        longitude_max: { value: S }
      }
    },
    removeDrawingTools () {
      // When done on the editor page remove the drawing tools from the map
      this.map.removeControl(this.draw)
      this.map.off('draw.create', this.drawFunction)
      this.bbox = {
        latitude_min: { value: null },
        latitude_max: { value: null },
        longitude_min: { value: null },
        longitude_max: { value: null }
      }
    }
  }
}
</script>

<style>
#map {
  width: 100%;
  height: 100%;
}

#map .mapboxgl-ctrl-bottom-left {
  z-index: 0;
  right: 55px;
  bottom: 1.5rem;
  left: auto;
}

#map .mapboxgl-ctrl-bottom-right {
  padding-right: 12px;
}
</style>
