<script setup>
import { ref, onMounted } from "vue";

const video = ref(null);

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        height: 720,
        width: 1280,
      },
      audio: false,
    });
    video.value.srcObject = stream;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  await openCamera();
});
</script>

<template>
  <div class="w-full min-h-screen">
    <video autoplay ref="video"></video>
  </div>
</template>
