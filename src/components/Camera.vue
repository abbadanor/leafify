<script setup>
import {ref, onMounted} from 'vue'

const video = ref(null)

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
          facingMode: 'environment',
          height: window.screen.availWidth,
          aspectRatio: { exact: (16/9) }
      },
      audio: false,
    });
    const [track] = stream.getVideoTracks();
      const capabilities = track.getCapabilities()
      const settings = track.getSettings()
    video.value.srcObject = stream
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
   await openCamera()
})
</script>

<template>
  <div>
    <video autoplay ref="video"></video>
  </div>
</template>
