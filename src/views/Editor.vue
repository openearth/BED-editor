<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container class="pa-3">
      <h2 class="h3 mb-3">
        Editor
      </h2>
      <v-form>
        <h4 class="mb-3">
          {{ selectedBbox.title }}
        </h4>
        <!-- Set bounding box -->
        <v-row>
          <v-text-field
            v-for="bound in selectedBbox.properties"
            :key="bound.title"
            dense
            readonly
            :label="bound.title"
            class="px-3"
            :value="bound.value"
          ></v-text-field>
        </v-row>
        <v-divider class="pb-3" />

        <h4 class="mb-3">
          {{ editorTemplate.title }}
        </h4>
        <v-row
          v-for="parameter in editorTemplate.properties"
          :key="parameter.name"
        >
          <!-- Use a text field for string or integer input -->
          <v-text-field
            v-if="
              (parameter.type === 'string' || parameter.type === 'integer') &&
                !parameter.enum
            "
            dense
            :label="parameter.title"
            v-model="parameter.value"
            class="px-3"
          ></v-text-field>

          <!-- use a combobox whenever a enumerate object is passed -->
          <v-combobox
            class="px-3"
            :items="parameter.enum"
            v-if="parameter.enum"
            v-model="parameter.value"
            :label="parameter.title"
            item-value="parameter.default"
            dense
          ></v-combobox>
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
