<script setup>
import {ref} from 'vue'
const count = ref(0)
function increment() {
  count.value++
}
</script>

<template>
    <div class="flex flex-col p-4 w-full max-w-3xl">
        <img src="pwa-512x512.png" />
        <h1 class="text-3xl font-bold">Leafify</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.</p>
        <div class="flex justify-between items-center">
          <button @click="increment" type="button" class="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-fit">Increment</button>
          <p>Count: {{count}}</p>
        </div>
    </div>
</template>
