<template>
  <aside class="ad-sidebar">
    <slot>Ad Space</slot>
  </aside>
</template>

<script>
export default {
  name: 'AdSpace'
}
</script>

<style scoped>
.ad-sidebar {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #888;
  background-image: url('/chat-background.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 200px;
}
</style>