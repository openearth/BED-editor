<template>
  <v-navigation-drawer class="pl-16" permanent absolute width="60vw">
    <v-container class="editor d-flex flex-column pa-3">
      <h2 class="h3 mb-3 justify-start">
        Editor
      </h2>
      <div class="flex-grow-1 editor-content">
        <list-workflows v-if="$route.params.jobId === 'list'" />
        <create-workflow v-if="$route.params.jobId === 'new'" />
        <workflow-status v-if="$route.params.jobId !== 'new' && $route.params.jobId !== 'list' && $route.params.jobId" />
      </div>
      <v-btn :to="{ name: 'editor', params: { jobId: 'new' }}" class="my-3 flex-grow-0"  outlined block>
        Create new workflow
      </v-btn>
      <v-btn :to="{ name: 'editor', params: { jobId: 'list' }}" class="flex-grow-0"  outlined block>
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
  align-items: flex-start;
  height: 100%;
}

.editor-content {
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
}

</style>
