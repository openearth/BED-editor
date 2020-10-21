<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container class="pa-3">
      <h2 class="h3 mb-3 justify-start">
        Editor
      </h2>
      <create-workflow @workflow-created="createdMessage = $event"/>
      <workflow-status />
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
import CreateWorkflow from '../components/CreateWorkflow'
import WorkflowStatus from '../components/WorkflowStatus'
export default {
  components: {
    CreateWorkflow,
    WorkflowStatus
  },
  data () {
    return {
      createForm: true,
      createdMessage: ''
    }
  }
}
</script>

<style>
.editor {
  position: absolute;
}
</style>
