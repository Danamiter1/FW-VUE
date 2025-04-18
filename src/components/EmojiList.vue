<script setup>
import Emoji from './Emoji.vue' 

defineProps({
  emojis: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select-emoji'])
</script>

<template>
  <div class="emoji-list">
    <div 
      v-for="emoji in emojis" 
      :key="emoji.name" 
      class="emoji-item"
      @click="emit('select-emoji', emoji)"
    >
      <Emoji :emoji="emoji" />
    </div>
  </div>
</template>

<style scoped>
.emoji-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
  background-color: white; 
  padding: 15px; 
  border-radius: 8px;
}

.emoji-item {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px; 
  border-radius: 4px;
  transition: background-color 0.2s;
  background-color: #f8f8f8; 
  min-height: 50px; 
}

.emoji-item:hover {
  background-color: #e0e0e0;
}
</style>