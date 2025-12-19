<template>
  <header>
    <div class="slogan">Chat with random strangers anonymously</div>
    <h1>Stranger Chat</h1>
    <button @click="$emit('toggle-theme')" class="theme-toggle">{{ isDark ? '☀️' : '🌙' }}</button>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isDark: Boolean
  },
  emits: ['toggle-theme']
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
}

.slogan {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.theme-toggle {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}
</style>