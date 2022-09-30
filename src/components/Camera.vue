<script setup>
import { ref, onMounted } from "vue";

const video = ref(null);

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        height: 480,
        width: 720
      },
      audio: false,
    });
    const [track] = stream.getVideoTracks();
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
  <div class="">
    <video autoplay ref="video"></video>
  </div>
</template>
