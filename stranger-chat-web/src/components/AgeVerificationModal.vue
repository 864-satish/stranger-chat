<template>
  <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Terms of Use & Age Verification</h2>
      <div class="terms-summary">
        <p>By using Stranger Chat, you agree to our <a href="/terms.html">Terms of Use</a>. Key points:</p>
        <ul>
          <li>You must be at least 18 years old</li>
          <li>No harassment, illegal content, or exploitation</li>
          <li>Respect others and follow community guidelines</li>
          <li>Stranger Chat is for anonymous, respectful conversations</li>
        </ul>
      </div>
      <div class="checkbox-group">
        <label>
          <input type="checkbox" v-model="acceptedTerms" />
          I have read and agree to the Terms of Use
        </label>
        <label>
          <input type="checkbox" v-model="confirmedAge" />
          I am 18 years or older
        </label>
      </div>
      <div class="modal-buttons">
        <button @click="confirm" :disabled="!acceptedTerms || !confirmedAge" class="yes-btn">Enter Chat</button>
        <button @click="close" class="no-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AgeVerificationModal',
  props: {
    visible: Boolean
  },
  emits: ['confirm', 'close'],
  data() {
    return {
      acceptedTerms: false,
      confirmedAge: false
    }
  },
  methods: {
    confirm() {
      if (this.acceptedTerms && this.confirmedAge) {
        this.$emit('confirm')
        this.reset()
      }
    },
    close() {
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.acceptedTerms = false
      this.confirmedAge = false
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.dark .modal-content {
  background-color: #333;
  color: white;
}

.terms-summary {
  text-align: left;
  margin-bottom: 1rem;
}

.terms-summary ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.terms-summary a {
  color: #4ecdc4;
  text-decoration: none;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.yes-btn, .no-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.yes-btn {
  background-color: #4ecdc4;
  color: white;
}

.yes-btn:hover:not(:disabled) {
  background-color: #45b7aa;
}

.yes-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.no-btn {
  background-color: #ff6b6b;
  color: white;
}

.no-btn:hover {
  background-color: #ff5252;
}
</style>