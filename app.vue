<template lang="pug">
v-app
  v-main
    v-container
      ui-header
      ui-hero
      ui-prompt
      ui-footer
</template>

<script setup lang="ts">
const title = 'Poster AI'
const description = 'Get a new poster in seconds.'
const image = ''

useServerSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogType: 'website',
  ogSiteName: title,
  ogImage: image,
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: image,
  twitterCreator: ''
})
</script>

<style lang="stylus" scoped>
.v-application
  background radial-gradient(80% 130% at 50% -30%, rgba(0, 0, 0, .15) 0, rgba(0, 0, 0, 0) 100%)

  .v-container
    max-width 1000px
</style>
