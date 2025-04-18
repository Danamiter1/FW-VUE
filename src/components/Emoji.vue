<script setup>
const props = defineProps({
  emoji: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <span class="emoji" v-html="emoji.htmlCode[0]"></span>
</template>

<style scoped>
.emoji {
  font-size: 2rem;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 1; 
}
</style>