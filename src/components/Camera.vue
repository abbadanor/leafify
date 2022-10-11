<script setup>
import CameraButton from './CameraButton.vue'
import { ref, onMounted } from "vue";

const video = ref(null);

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        height: window.innerWidth,
        width: window.innerHeight,
      },
      audio: false,
    });
    video.value.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

function hej() {
  console.log('hej')
}

onMounted(async () => {
  await openCamera();
});
</script>

<template>
  <div>
    <video autoplay ref="video"></video>
    <CameraButton @clicked="hej"></CameraButton>
  </div>
</template>
