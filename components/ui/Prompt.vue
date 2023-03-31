<template lang="pug">
main

  v-container

    //- Upload and configure
    v-row
      v-col(
        cols="12"
        md="6"
      )
          v-textarea(label="Prompt" v-model="prompt")
      v-col(
        cols="12"
        md="6"
      )
        //- v-responsive.right-config(:aspect-ratio="1")
        p.text-caption Suggested Tags
        v-chip-group.flex-wrap(v-model='selectedTags' multiple)
          v-chip(v-for="el in suggestedTags" filter='' variant='outlined')
            | {{ el }}
        .py-2
        v-btn(
          @click="createPrediction"
          :disabled="false"
          :loading="loading_submit"
          color="secondary"
          size="x-large"
          block flat rounded
        ) Create Poster

    //- List results
    v-row
      v-col(
        v-for="(item, index) in list"
        :key="`item-${index}`"
        cols="12"
      )
        ui-output(:output="item")
</template>

<script setup lang="ts">
// Imports
import { Upload } from 'upload-js'

interface Prediction {
  id: string
  status: string
  output: string
  prompt: string
}

// Modules
const runtimeConfig = useRuntimeConfig()

// Instances
const upload = Upload({
  apiKey: runtimeConfig.public.uploadApiKey
})

// State
const file = ref<null | HTMLInputElement>(null)
const image = ref<null | string>(null)
const loading_file = ref(false)
const loading_file_pc = ref(0)
const loading_submit = ref(false)
const list: Prediction[] = reactive([])
let interval: null | NodeJS.Timer = null

const selectedTags = ref([])
const suggestedTags = ref(['8K resolution', 'Disney', 'Hyper realistic', 'Volumetric lighting', 'Masterpiece', 'Highly detailed', 'Sharp focus', 'Artstation', 'Concept art']);
const prompt = ref('')

// Computed
const processing = computed<Prediction[]>(() =>
  list.filter(
    (item) => item?.status === 'starting' || item?.status === 'processing'
  )
)

// Watcher
watch(processing, (list) => {
  if (list.length > 0) {
    if (interval) return

    // interval to read every processing prediction every 2s
    interval = setInterval(async () => {
      await Promise.all(processing.value.map((item) => readPrediction(item.id)))
    }, 2000)
  } else {
    if (interval) clearInterval(interval)
    interval = null
  }
})

const calculateAspectRatioFit = (
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight)
  return { width: srcWidth * ratio, height: srcHeight * ratio }
}

const createPrediction = async () => {
  loading_submit.value = true
  try {
    const data: Prediction = await $fetch('/api/create', {
      method: 'post',
      body: {
        prompt: prompt.value + selectedTags.value.join(' '),
      }
    })

    // Add response to beginning of list
    list.unshift({
      ...data,
      prompt: prompt.value
    })
  } catch (e) {
    console.log(e)
  } finally {
    loading_submit.value = false
  }
}

const readPrediction = async (id: string) => {
  try {
    const data: Prediction = await $fetch('/api/read', {
      method: 'post',
      body: {
        id
      }
    })

    // Patch response back to list
    const index = processing.value?.findIndex((item) => item?.id === id)
    if (index > -1) list[index] = { ...list[index], ...data }
  } catch (e) {
    console.log(e)
  }
}
</script>

<style lang="stylus" scoped>
main
  padding-top 64px

  input[type="file"]
    display none

  .v-container
    .left-upload
      background #e4e4e4
      text-align center
      border-radius 16px
      cursor pointer
      position relative
      display flex
      align-items center
      transition background 150ms ease-in-out

      .preview
        background-size cover
        background-position center
        position absolute
        bottom 0
        right 0
        left 0
        top 0

      .v-icon
        transition transform 150ms ease-in-out

      &:hover
        background #dddddd

        .v-icon
          transform translateY(-5px)

    .right-config
      .v-img
        max-width 150px
        margin 0 auto
</style>
