<script setup>
import { ref, onMounted } from "vue";

const video = ref(null);
const rect = ref(null)

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "environment",
        height: screen.width,
        width: screen.height
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
  <div class="w-full h-full overflow-hidden">
    <video class="h-full" autoplay ref="video"></video>
  </div>
</template>
