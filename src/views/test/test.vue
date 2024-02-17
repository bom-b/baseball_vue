<template>
  <div class="chat-container">
    <ul>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </ul>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from "webstomp-client";
export default {
  data() {
    return {
      newMessage: '',
      messages: [],
      socket: null,
    };
  },
  mounted() {
    this.socket = new SockJS('ws://localhost:80/game');
    this.socket.onmessage = (event) => {
      this.messages.push(event.data);
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage !== '') {
        this.socket.send(this.newMessage);
        this.newMessage = '';
      }
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.close();
    }
  },
};
</script>

<style scoped>
.chat-container {
  width: 400px;
  height: 300px;
  border: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
}
</style>
