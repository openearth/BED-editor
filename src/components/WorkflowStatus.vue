<template>
  <div class="workflow-status pa-3 d-flex flex-column">
    <h2 class="h3 mb-3 justify-start">
      Workflow details for job: {{ jobDetails.title }}
    </h2>
    <data-table items :tableHeaders="tableHeaders" :tableItems="detailItems"/>
    <h2 class="mt-4">
      Model results
    </h2>
    <data-table items :tableHeaders="tableHeaders" :tableItems="resultItems"/>
    <v-btn v-if="jobResults.s3path !== ''" :to="jobDataUrl()" target=”_blank”>
      Show results in bucket
    </v-btn>
  </div>
</template>

<script>
import DataTable from '@/components/DataTable'
export default {
  data () {
    return {
      jobDetails: [],
      tableHeaders: ['Name', 'Value'],
      detailItems: [],
      resultItems: [],
      jobResults: []
    }
  },
  components: {
    DataTable
  },
  mounted () {
    this.fetchJobDetails()
    this.fetchJobResults()
  },
  methods: {
    jobDataUrl () {
      if (this.jobResults.s3path) {
        const s3path = this.jobResults.s3path.replace('/', '%2F')
        return `/data/${s3path}`
      } else {
        return null
      }
    },
    fetchJobDetails () {
      fetch(
        `${process.env.VUE_APP_EDITOR_SERVER}/processes/hydromt/jobs/${this.$route.params.jobId}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.jobDetails = data
          this.detailItems = []
          Object.entries(data).forEach(val => {
            this.detailItems.push({
              value: val[1],
              name: val[0]
            })
          })
        })
        .catch(error => {
          console.error('Error fetching job per process_id', error)
        })
    },
    fetchJobResults () {
      fetch(
        `${process.env.VUE_APP_EDITOR_SERVER}/processes/hydromt/jobs/${this.$route.params.jobId}/results`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        .then(response => {
          return response.json()
        })
        .then(data => {
          this.jobResults = data
          this.resultItems = []

          Object.entries(data).forEach(val => {
            this.resultItems.push({
              value: val[1],
              name: val[0]
            })
          })
        })
        .catch(error => {
          console.error('Error fetching job per process_id', error)
        })
    }
  }
}
</script>

<style>
</style>
