<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container class="pa-3">
      <h2 class="h3 mb-3 justify-start">
        Editor
      </h2>
      <v-form v-if="createForm === true">
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
      <v-row class="pa-3 justify-end" v-if="createForm === true">
        <v-btn bottom color="primary" outlined @click="createSchematization">
          Create schematization
        </v-btn>
      </v-row>
    </v-container>
    <v-container v-if="createForm === false">
      <v-alert outlined color="primary">
        Scehmatization created!
      </v-alert>
      <v-textarea
        solo
        readonly
        name="input-7-4"
        label="Solo textarea"
        :value="createdMessage"
      ></v-textarea>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['editorTemplate', 'selectedBbox'])
  },
  data () {
    return {
      createForm: true,
      createdMessage: ''
    }
  },
  methods: {
    createSchematization () {
      const jsonBody = {}
      // Fill in the json body needed for the schematization request
      Object.entries(this.editorTemplate.properties).forEach(entry => {
        if (entry[0] === 'bbox') {
          const bbox = {}
          Object.entries(this.selectedBbox.properties).forEach(bboxEntry => {
            bbox[bboxEntry[0]] = bboxEntry[1].value
          })
          jsonBody[entry[0]] = bbox
        } else {
          jsonBody[entry[0]] = entry[1].value
        }
      })

      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/hydromt`, {
        method: 'POST',
        body: JSON.stringify(jsonBody)
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          console.log(res)
          this.createForm = false
          this.createdMessage = JSON.stringify(res)
        })
    }
  }
}
</script>

<style>
.editor {
  position: absolute;
}
</style>
