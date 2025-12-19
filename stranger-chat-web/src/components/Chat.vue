<template>
  <div class="chat">
    <p>Connected as {{ username }} with {{ partnerUsername }}</p>
    <button @click="$emit('skip')" class="skip-btn">Skip & Find New</button>
    <div class="message-input">
      <input v-model="localMessage" @keyup.enter="handleSend" placeholder="Type a message" class="message-field" />
      <button @click="handleSend" class="send-btn">Send</button>
    </div>
    <div class="messages" ref="messagesContainer">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong :class="msg.sender === 'me' ? 'my-username' : 'partner-username'">{{ msg.sender === 'me' ? 'You' : (msg.senderUsername || partnerUsername) }}:</strong> {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'

export default {
  name: 'Chat',
  props: {
    username: String,
    partnerUsername: String,
    messages: Array
  },
  emits: ['send-message', 'skip'],
  data() {
    return {
      localMessage: '',
      messagesContainer: null
    }
  },
  methods: {
    handleSend() {
      if (this.localMessage) {
        this.$emit('send-message', this.localMessage)
        this.localMessage = ''
        this.scrollToBottom()
      }
    },
    scrollToBottom() {
      nextTick(() => {
        if (this.$refs.messagesContainer) {
          this.$refs.messagesContainer.scrollTop = this.$refs.messagesContainer.scrollHeight
        }
      })
    }
  },
  watch: {
    messages: 'scrollToBottom'
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.message-input {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.message-field {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #4ecdc4;
  border-radius: 25px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: #333;
}

.send-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4ecdc4;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #45b7aa;
}

.messages {
  flex: 1;
  overflow-y: auto;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 1rem;
  background-color: #f5f5f5;
  max-height: 400px;
}

.dark .messages {
  background-color: #2a2a2a;
}

.message {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  text-align: left;
}

.my-username {
  color: #4ecdc4;
}

.partner-username {
  color: #ff6b6b;
}

.skip-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4ecdc4;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 1rem;
  transition: background-color 0.3s;
  width: 100%;
  max-width: 200px;
}

.skip-btn:hover {
  background-color: #45b7aa;
}
</style>