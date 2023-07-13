<template>
  <img class="gem" :src="`/Gem${this.color || 'Black'}.png`" :style="`transform: scale(${this.scale}`">
</template>

<script>
export default {
  props: {
    color: String,
    scale: {
      type: Number,
      default: 1
    }
  },
    name: "Gem",
}
</script>

<style>
.gem {
    width: 1rem;
    margin-right: 4px;
    transform: scale(1.5)
}
</style>