<template>
  <div class="login">
    <div class="input-container">
      <input v-model="localUsername" type="text" maxlength="12" placeholder="Enter username" class="username-input" />
      <button @click="handleConnect" :disabled="!localUsername" class="connect-btn">Connect</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  emits: ['connect'],
  data() {
    return {
      localUsername: localStorage.getItem('strangerChatUsername') || ''
    }
  },
  methods: {
    handleConnect() {
      if (this.localUsername) {
        localStorage.setItem('strangerChatUsername', this.localUsername)
        this.$emit('connect', this.localUsername)
      }
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23ff6b6b" opacity="0.1"/></svg>') no-repeat center;
  background-size: cover;
  border-radius: 12px;
}

.username-input {
  padding: 0.75rem;
  border: 2px solid #ff6b6b;
  border-radius: 25px;
  font-size: 1rem;
  width: 100%;
  max-width: 300px;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

.connect-btn {
  padding: 0.75rem 1.5rem;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.connect-btn:hover {
  background-color: #ff5252;
}

.connect-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>