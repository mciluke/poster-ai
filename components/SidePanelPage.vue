<template lang="pug">
.d-flex.flex-column.flex-shrink-0.text-bg-dark(style='width: 280px;')
  //- a.d-flex.align-items-center.mb-3.mb-md-0.me-md-auto.text-white.text-decoration-none(href='/')
  .px-3.py-2.gray-400.text-uppercase.header Create
  hr
  .px-3.py-2.gray-400.header.text-uppercase Algorithim 
  .d-flex.justify-content-center.px-3
    Dropdown
  .py-2
  hr
  .px-3.py-2.gray-400.header.text-uppercase Text Prompt 
  .px-3
    textarea#exampleFormControlTextarea1.form-control(rows='3')

</template>

<script setup></script>

<style scoped>
.header {
  font-size: 11px;
  font-weight: bold;
}
</style>
