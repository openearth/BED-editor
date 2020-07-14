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
import { mapState } from 'vuex'

export default {
  watch: {
    $route (to, from) {
      if (to.name === 'Editor') {
        this.addDrawingTools()
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
        return this.selectedBbox
      },
      set (val) {
        this.$store.state.selectedBbox = val
      }
    }
  },
  methods: {
    addDrawingTools () {
      this.map.addControl(this.draw, 'top-right')
      this.map.on('draw.create', this.drawFunction)
      // this.map.on('draw.delete', () => {
      //   this.bbox = {}
      // })
    },
    drawFunction (e) {
      this.draw.deleteAll()
      this.draw.add(e.features[0])
      const North = e.features[0].geometry.coordinates[0][3][0]
      const West = e.features[0].geometry.coordinates[0][3][1]
      const South = e.features[0].geometry.coordinates[0][1][0]
      const East = e.features[0].geometry.coordinates[0][1][1]
      const NW = this.map.project([North, West])
      const SE = this.map.project([South, East])
      const features = this.map.queryRenderedFeatures([NW, SE], {
        layers: this.circleLayers
      })
      this.profileIds = features.map(feat => {
        return feat.properties.cdi_id
      })
      console.log(East)
      this.bbox = {
        lng: `(${East.toFixed(4)}, ${West.toFixed(4)})`,
        lat: `(${North.toFixed(4)}, ${South.toFixed(4)})`
      }
    },
    removeDrawingTools () {
      this.map.removeControl(this.draw)
      this.map.off('draw.create', this.drawFunction)
      this.bbox = {}
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
