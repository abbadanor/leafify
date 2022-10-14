<script setup>
import CameraControls from './CameraControls.vue'
import { ref, onMounted } from "vue";

const video = ref(null);
const canvasWidth = ref(null)
const canvasHeight = ref(null)
const canvas = ref(null)
const canvasHidden = ref(true)

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
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  } catch (error) {
    console.error(error);
  }
}

function takePicture() {
  const context = canvas.value.getContext('2d');
  context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
  canvasHidden.value = false
}

onMounted(async () => {
  await openCamera();
});
</script>

<template>
  <div>
    <video autoplay ref="video"></video>
    <canvas class="absolute bottom-0" ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
    <CameraControls @clicked="takePicture"></CameraControls>
  </div>
</template>
