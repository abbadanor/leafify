<script setup>
import { ref } from 'vue'
const count = ref(0)
function increment() {
    count.value++
}
</script>

<template>
    <div class="flex flex-col p-4 w-full max-w-3xl select-none">
        <h1 class="text-3xl font-bold">Leafify</h1>
        <p>Count: {{count}}</p>
        <button @click="increment" type="button"
            class="w-fit py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">Increment</button>
    </div>
</template>
