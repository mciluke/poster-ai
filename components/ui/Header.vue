<template lang="pug">
header.align-center(:class="{ xs }")
  v-img(src="/img/logo.svg")
  .text-h5 Poster AI
  v-spacer
  v-btn(
    :size="size"
    :height="height"
    href=""
    target="_new"
    color="secondary"
    prepend-icon="mdi-login-variant"
    class="mr-4"
    flat rounded
  ) Login
  v-btn(
    :size="size"
    :height="height"
    href=""
    target="_new"
    color="secondary"
    prepend-icon="mdi-cart-outline"
    flat rounded
  ) Cart
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { xs, mobile } = useDisplay()

const size = computed(() => (mobile.value ? 'small' : 'default'))
const height = computed(() => (mobile.value ? '32px' : '40px'))
</script>

<style lang="stylus" scoped>
header
  padding 32px 0
  display flex

  &.xs
    align-items center
    flex-direction column

    .v-btn
      margin-top 16px

  .v-img
    max-width 42px
    min-width 42px
    max-height 100%
    margin-right 16px

  .text-h5
    font-weight 400
</style>
