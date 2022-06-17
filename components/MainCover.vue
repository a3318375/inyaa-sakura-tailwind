<script setup>
function toDwon() {
  document.getElementById('cardTop').scrollTop = 0
}
</script>

<template>
  <div id="myCover" class="hero min-h-screen">
    <div class="absolute bottom-9">
      <button type="button" @click="toDwon">
        <div class="i-heroicons-outline-chevron-down w-6 h-6" />
      </button>
    </div>
  </div>
</template>

