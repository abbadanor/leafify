<script setup>
// import IconAccountBox from '~icons/material-symbols/flip-camera-android'
</script>

<template>
  <div class="absolute bottom-12 w-full flex justify-center">
    <div @click="$emit('clicked')" class="flex justify-center items-center h-20 w-20 rounded-full border-4 border-white">
      <div class="h-16 w-16 rounded-full bg-white active:h-14 active:w-14 transition-all delay-75"></div>
    </div>
    <!-- <IconAccountBox></IconAccountBox> -->
  </div>
</template>
