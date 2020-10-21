<template>
  <div class="list-workflows">
    <v-list>
      <v-list-item v-for="workflow in workflows" :key="workflow.jobId" :to="`/Editor/${workflow.jobID}`">
        {{workflow.title}}
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      workflows: []
    }
  },
  mounted () {
    this.getWorkflows()
  },
  methods: {
    getWorkflows () {
      fetch(`${process.env.VUE_APP_EDITOR_SERVER}/processes/hydromt/jobs`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.workflows = data
        })
        .catch(error => {
          console.error('Error processes', error)
        })
    }
  }
}
</script>

<style lang="css" scoped >

</style>
