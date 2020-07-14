<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container>
      <h2 class="h3">
        Editor
      </h2>
      <v-form>
        <v-row>
          <!-- Set bounding box -->
          <v-text-field
            dense
            readonly
            label="Latitude (min; max):"
            class="px-3"
            :value="selectedBbox.lat"
          ></v-text-field>
          <v-text-field
            dense
            readonly
            label="Longitude (min, max):"
            class="px-3"
            :value="selectedBbox.lng"
          ></v-text-field>
        </v-row>
        <v-row v-for="parameter in editorTemplate" :key="parameter.name">
          <v-text-field
            dense
            :label="parameter.name"
            v-model="parameter.value"
            suffix="[m3/s]"
          ></v-text-field>
        </v-row>
      </v-form>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['editorTemplate', 'selectedBbox'])
  }
}
</script>

<style>
.editor {
  position: absolute;
}
</style>
