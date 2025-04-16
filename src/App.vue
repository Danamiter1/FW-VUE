<script setup>
import { ref } from 'vue'

const number = ref('')
const category = ref('trivia')
const fact = ref(null)
const isLoading = ref(false)
const error = ref(null)

const categories = [
  { value: 'trivia', label: 'Случайный факт' },
  { value: 'math', label: 'Факт из областики математики' },
  { value: 'year', label: 'Факт о годе' }
]

const fetchFact = async () => {
  if (!number.value) return
  
  isLoading.value = true
  error.value = null
  fact.value = null
  
  try {
    const response = await fetch(`http://numbersapi.com/${number.value}/${category.value}?json`)
    const data = await response.json()
    
    if (data.found) {
      fact.value = data.text
    } else {
      error.value = `${number.value} - ${category.value === 'year' ? 'скучный год' : 'скучное число'}`
    }
  } catch (err) {
    error.value = 'Произошла ошибка при получении данных'
  } finally {
    isLoading.value = false
  }
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    fetchFact()
  }
}
</script>

<template>
  <div class="app">
    <h1>Факты о числах</h1>
    
    <div class="controls">
      <input
        type="text"
        v-model="number"
        @keypress="handleKeyPress"
        placeholder="Введите число или год"
      />
      
      <select v-model="category">
        <option 
          v-for="option in categories" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      
      <button @click="fetchFact" :disabled="isLoading || !number">
        Поиск
      </button>
    </div>
    
    <div class="result">
      <div v-if="isLoading" class="loader">Загрузка...</div>
      
      <div v-if="error" class="error">{{ error }}</div>
      
      <div v-if="fact" class="fact" style="color: black;">
        {{ fact }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
}

.controls {
  margin: auto;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input, select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.result {
  min-height: 100px;
  padding: 20px;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.loader {
  text-align: center;
  color: #666;
}

.error {
  color: #d32f2f;
}

.fact {
  font-size: 18px;
  line-height: 1.5;
}
</style>