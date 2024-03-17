<script setup lang="ts">
import LOGO from '~/assets/images/logo.png'

const version = APP_VERSION
const name = APP_NAME
</script>

<template>
  <div class="text-center">
    <img class="inline-block" :src="LOGO" />
  </div>
</template>
