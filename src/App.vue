<script setup>
import { ref, computed } from 'vue'

const history = ref([])
const title = ref('')
const amount = ref(0)

const addTransaction = () => {
  if (!title.value || amount.value === 0) return
  
  history.value.push({
    text: title.value,
    amount: Number(amount.value),
    id: Date.now()
  })
  
  title.value = ''
  amount.value = 0
}

const incomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

const outcomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalBalance = computed(() => {
  return history.value.reduce((sum, item) => sum + item.amount, 0)
})
</script>

<template>
  <div class="container">
    <h1>Учет расходов</h1>
    
    <div class="balance-container" v-if="history.length">
      <div class="balance-item">
        <h3 style="color: black;">Доходы:</h3>
        <span class="income">{{ incomeBalance }}</span>
      </div>
      <div class="balance-item">
        <h3 style="color: black;">Расходы:</h3>
        <span class="outcome">{{ outcomeBalance }}</span>
      </div>
      <div class="balance-item">
        <h3 style="color: black;">Итого:</h3>
        <span :class="totalBalance >= 0 ? 'income' : 'outcome'">
          {{ totalBalance }}
        </span>
      </div>
    </div>
    <p v-else>Вы не совершали финансовых операций</p>
    
    <form @submit.prevent="addTransaction">
      <div class="form-group">
        <label>Название операции:</label>
        <input 
          type="text" 
          v-model.trim="title" 
          placeholder="Например: Зарплата" 
          required
        >
      </div>
      <div class="form-group">
        <label>Сумма:</label>
        <input 
          type="number" 
          v-model.number="amount" 
          placeholder="Например: 1000 или -500" 
          required
        >
      </div>
      <button type="submit">Добавить операцию</button>
    </form>
    
    <div class="history" v-if="history.length">
      <h2>История операций</h2>
      <ul>
        <li 
          v-for="item in history" 
          :key="item.id"
          :class="item.amount > 0 ? 'income' : 'outcome'"
        >
          {{ item.text }}: {{ item.amount }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.balance-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.balance-item {
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.history {
  margin-top: 30px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  position: relative;
  border: 1px solid #ddd;
}

.income {
  color: green;
  border-left: 4px solid green;
}

.outcome {
  color: red;
  border-left: 4px solid red;
}
</style>