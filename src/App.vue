<script setup>
import { ref, onMounted, computed } from 'vue'
import Emoji from './components/Emoji.vue'
import EmojiList from './components/EmojiList.vue'
import EmojiMixer from './components/EmojiMixer.vue'

const emojis = ref([])
const selectedSmiles = ref([null, null])

const fetchEmojis = async () => {
  try {
    const response = await fetch('https://emojihub.yurace.pro/api/all')
    emojis.value = await response.json()
  } catch (error) {
    console.error('Error fetching emojis:', error)
  }
}

const handleSelectEmoji = (index, emoji) => {
  selectedSmiles.value[index] = emoji
}

onMounted(() => {
  fetchEmojis()
})
</script>

<template>
  <div class="app">
    <h1>Emoji Kitchen</h1>
    
    <div class="container">
      <div class="emoji-selectors">
        <div class="selector">
          <h2>Выберите первый эмоджи</h2>
          <EmojiList 
            :emojis="emojis" 
            @select-emoji="(emoji) => handleSelectEmoji(0, emoji)"
          />
        </div>
        
        <div class="selector">
          <h2>Выберите второй эмоджи</h2>
          <EmojiList 
            :emojis="emojis" 
            @select-emoji="(emoji) => handleSelectEmoji(1, emoji)"
          />
        </div>
      </div>
      
      <EmojiMixer 
        v-if="selectedSmiles[0] || selectedSmiles[1]"
        :first-emoji="selectedSmiles[0]"
        :second-emoji="selectedSmiles[1]"
      />
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.emoji-selectors {
  display: flex;
  gap: 20px;
}

.selector {
  flex: 1;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
  text-align: center;
}

body {
  background-color: #ffffff;
  color: #333333;
}
</style>