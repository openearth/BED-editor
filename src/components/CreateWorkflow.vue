<template>
  <div class="create-workflow">
    <v-form v-if="createForm === 'create'">
      <h4 class="mb-3">
        {{ selectedBbox.title }}
      </h4>
      <!-- Set bounding box -->
      <v-row>
        <v-text-field
          v-for="bound in bbox"
          :key="bound.value"
          dense
          readonly
          :label="bound.title"
          class="px-3"
          :value="bound.value"
          ref='bbox'
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
    <v-row class="pa-3 justify-end" v-if="createForm === 'create'">
      <v-btn bottom color="primary" outlined @click="createSchematization">
        Create Workflow
      </v-btn>
    </v-row>

    <v-container v-if="createForm === 'success'">
      <v-alert outlined color="primary">
        Schematization created!
      </v-alert>
      <v-textarea
        solo
        readonly
        name="input-7-4"
        label="Solo textarea"
        :value="createdMessage"
      ></v-textarea>
    </v-container>

    <v-container v-if="createForm === 'error'">
      <v-alert outlined color="error">
        Error creating Schematization!
      </v-alert>
      <v-textarea
        solo
        readonly
        name="input-7-4"
        label="Solo textarea"
        :value="createdMessage"
      ></v-textarea>
      <v-btn @click="createForm = 'create'">
        Go back
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  watch: {
    bbox: {
      handler (val) {
        console.log(val)
      },
      deep: true
    }
  },
  computed: {
    ...mapState(['editorTemplate', 'selectedBbox']),
    bbox: {
      get () {
        console.log(this.$store.state.selectedBbox.properties)
        return this.$store.state.selectedBbox.properties
      },
      set (val) {
        this.setBboxProperties(val)
      }
    }
  },
  data () {
    return {
      createForm: 'create',
      createdMessage: ''
    }
  },
  methods: {
    ...mapMutations(['setBboxProperties']),
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
      console.log(jsonBody)
      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/processes/hydromt/jobs`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(jsonBody)
      })
        .then(response => {
          return response.json()
        })
        .then(res => {
          const error = _.get(res, 'detail')
          if (error) {
            this.createForm = 'error'
            this.createdMessage = error
          } else {
            this.createForm = 'success'
            const params = _.get(res, 'spec.arguments.parameters')
            let paramString = ''
            params.forEach(p => {
              paramString = `${paramString}${p.name}: ${p.value} \n`
            })
            this.createdMessage = paramString
          }
        })
        .catch(error => {
          this.createForm = 'error'
          this.createdMessage = error.detail || error
        })
    }
  }
}
</script>

<style>

</style>
