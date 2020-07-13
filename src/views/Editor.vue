<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container>
      <h2 class="h3">
        Editor
      </h2>
      <v-form>
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
    ...mapState(['editorTemplate'])
  }
}
</script>

<style>
.editor {
  position: absolute;
}
</style>
