<script setup>
import { ref, reactive } from 'vue'

const user = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  password: '',
  confirmPassword: ''
})

const showPassword = ref(false)

const register = () => {
  console.log('Данные пользователя:', JSON.parse(JSON.stringify(user)))
}

const isPasswordsMatch = () => {
  return user.password === user.confirmPassword && user.password !== ''
}
</script>

<template>
  <form @submit.prevent="register">
    <div>
      <label>Имя пользователя:</label>
      <input type="text" v-model="user.firstName" />
    </div>
    
    <div>
      <label>Фамилия пользователя:</label>
      <input type="text" v-model="user.lastName" />
    </div>
    
    <div>
      <label>Пол:</label>
      <label>
        <input type="radio" v-model="user.gender" value="male" /> Мужской
      </label>
      <label>
        <input type="radio" v-model="user.gender" value="female" /> Женский
      </label>
    </div>
    
    <div>
      <label>Пароль:</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="user.password" />
    </div>
    
    <div>
      <label>Подтверждение пароля:</label>
      <input :type="showPassword ? 'text' : 'password'" v-model="user.confirmPassword" />
    </div>
    
    <button
      type="button"
      @mousedown="showPassword = true"
      @mouseup="showPassword = false"
      @mouseleave="showPassword = false"
    >
      Показать пароль
    </button>
    
    <button type="submit" :disabled="!isPasswordsMatch()">
      Зарегистрироваться
    </button>
  </form>
  
  <p v-if="user.firstName || user.lastName || user.gender">
    Пользователь: {{ user.firstName }} {{ user.lastName }}. 
    {{ user.gender === 'male' ? 'Мужского' : 'Женского' }} пола.
  </p>
</template>

<style scoped>
form div {
  margin-bottom: 10px;
}

label {
  display: inline-block;
  width: 200px;
}

button {
  margin: 5px;
}
</style>