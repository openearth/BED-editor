<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container class="pa-3 flex-column d-flex">
      <h2 class="h3 mb-3 justify-start">
        Editor
      </h2>
      <div class="flex-grow-1">
        <list-workflows v-if="$route.params.jobId === 'list'" />
        <create-workflow v-if="$route.params.jobId === 'new'" />
        <workflow-status v-if="$route.params.jobId !== 'new' && $route.params.jobId !== 'list' && $route.params.jobId" />
      </div>
      <v-btn to="/Editor/new" class="my-3">
        Create new workflow
      </v-btn>
      <v-btn to="/Editor/list">
        List workflows
      </v-btn>
    </v-container>

  </v-navigation-drawer>
</template>

<script>
import CreateWorkflow from '../components/CreateWorkflow'
import ListWorkflows from '../components/ListWorkflows'
import WorkflowStatus from '../components/WorkflowStatus'
export default {
  components: {
    CreateWorkflow,
    WorkflowStatus,
    ListWorkflows
  },
  data () {
    return {
    }
  }
}
</script>

<style>
.editor {
  position: absolute;
}
</style>
