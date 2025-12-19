<template>
  <header>
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
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.1);
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: inherit;
}
</style>