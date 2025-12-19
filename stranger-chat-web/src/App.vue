<template>
  <div id="app" :class="theme">
    <Header :is-dark="theme === 'dark'" @toggle-theme="toggleTheme" />
    <div class="layout">
      <AdSpace v-if="!isMobile" class="left-ad">Ad Space</AdSpace>
      <main class="chat-container">
        <LoginForm v-if="!connected" @connect="handleConnect" />
        <Chat v-else :username="username" :partner-username="partnerUsername" :messages="messages" @send-message="sendMessage" @skip="skipChat" />
      </main>
      <AdSpace v-if="!isMobile" class="right-ad">Ad Space</AdSpace>
    </div>
    <footer class="mobile-ad" v-if="isMobile">Ad Space</footer>
    <AgeVerificationModal :visible="showModal" @confirm="doConnect" @close="cancelConnect" />
  </div>
</template>

<script>
import { ref } from 'vue'
import io from 'socket.io-client'
import Header from './components/Header.vue'
import LoginForm from './components/LoginForm.vue'
import Chat from './components/Chat.vue'
import AdSpace from './components/AdSpace.vue'
import AgeVerificationModal from './components/AgeVerificationModal.vue'

export default {
  name: 'App',
  components: {
    Header,
    LoginForm,
    Chat,
    AdSpace,
    AgeVerificationModal
  },
  setup() {
    const username = ref('')
    const connected = ref(false)
    const socket = ref(null)
    const message = ref('')
    const messages = ref([])
    const theme = ref('dark')
    const partnerUsername = ref('')
    const isMobile = ref(window.innerWidth < 768)
    const showModal = ref(false)
    const pendingUsername = ref('')
    let messageId = 0

    window.addEventListener('resize', () => {
      isMobile.value = window.innerWidth < 768
    })

    const toggleTheme = () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark'
    }

    const handleConnect = (user) => {
      pendingUsername.value = user
      showModal.value = true
    }

    const doConnect = () => {
      showModal.value = false
      username.value = pendingUsername.value
      connect()
    }

    const cancelConnect = () => {
      showModal.value = false
      pendingUsername.value = ''
    }

    const connect = () => {
      socket.value = io(import.meta.env.VITE_SOCKET_URL)
      socket.value.on('connect', () => {
        connected.value = true
        socket.value.emit('join', { username: username.value })
      })
      socket.value.on('waiting', () => {
        messages.value.push({ id: messageId++, text: 'Waiting for a partner...', sender: 'system' })
      })
      socket.value.on('matched', (data) => {
        partnerUsername.value = data.partnerUsername || (data.partnerId ? 'User' + data.partnerId.slice(-4) : 'Stranger')
        messages.value.push({ id: messageId++, text: `Connected with ${partnerUsername.value}`, sender: 'system' })
      })
      socket.value.on('message', (data) => {
        const text = typeof data === 'string' ? data : data.text;
        const senderUsername = typeof data === 'string' ? partnerUsername.value : (data.senderUsername || partnerUsername.value);
        messages.value.push({ id: messageId++, text, sender: 'partner', senderUsername })
      })
      socket.value.on('partnerDisconnected', () => {
        messages.value.push({ id: messageId++, text: 'Partner disconnected', sender: 'system' })
        connected.value = false
        partnerUsername.value = ''
      })
      socket.value.on('disconnect', () => {
        connected.value = false
        partnerUsername.value = ''
      })
    }

    const skipChat = () => {
      if (socket.value) {
        socket.value.disconnect()
      }
      connected.value = false
      partnerUsername.value = ''
      messages.value = []
      messageId = 0
      // Reconnect after a short delay
      setTimeout(() => {
        connect()
      }, 1000)
    }

    const sendMessage = (msg) => {
      if (msg && socket.value) {
        socket.value.emit('message', msg)
        messages.value.push({ id: messageId++, text: msg, sender: 'me' })
      }
    }

    return {
      username,
      connected,
      message,
      messages,
      theme,
      partnerUsername,
      isMobile,
      showModal,
      toggleTheme,
      handleConnect,
      doConnect,
      cancelConnect,
      connect,
      sendMessage,
      skipChat
    }
  }
}
</script>

<style>
/* Global Styles */
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s, color 0.3s;
}

/* Themes */
#app.dark {
  background-color: #1a1a1a;
  color: #ffffff;
}

#app.light {
  background-color: #f0f0f0;
  color: #333333;
}

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
}

.chat-container {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Mobile Ad */
.mobile-ad {
  text-align: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: #888;
}

@media (max-width: 768px) {
  .chat-container {
    padding: 0.5rem;
  }
}
</style>