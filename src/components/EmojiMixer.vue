<script setup>
import { computed } from 'vue'
import Emoji from './Emoji.vue'

const props = defineProps({
  firstEmoji: {
    type: Object,
    default: null
  },
  secondEmoji: {
    type: Object,
    default: null
  }
})

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase()
    const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase()
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`
  }
  return null
})
</script>

<template>
  <div class="emoji-mixer">
    <h2>Результат смешивания</h2>
    <div class="mixer-container">
      <div class="emoji-container" v-if="firstEmoji">
        <Emoji :emoji="firstEmoji" />
      </div>
      
      <div class="plus-sign" v-if="firstEmoji && secondEmoji">+</div>
      
      <div class="emoji-container" v-if="secondEmoji">
        <Emoji :emoji="secondEmoji" />
      </div>
      
      <div class="equal-sign" v-if="kitchenEmoji">=</div>
      
      <div class="result" v-if="kitchenEmoji">
        <img :src="kitchenEmoji" alt="Mixed emoji" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.emoji-mixer {
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.mixer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.emoji-container {
  font-size: 3rem;
}

.plus-sign, .equal-sign {
  font-size: 2rem;
  margin: 0 10px;
}

.result img {
  width: 96px;
  height: 96px;
}
</style>