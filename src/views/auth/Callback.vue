<template>
  <div />
</template>

<script>
export default {
  mounted () {
    const authUrl = `${process.env.VUE_APP_EDITOR_SERVER}/auth${window.location.search}`
    window.location.assign(authUrl)
  }
}
</script>
