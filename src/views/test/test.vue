<template>
  <div class="chat-container">
    <ul>
      <li v-for="(message, index) in messages" :key="index" :class="{ 'my-msg' : message.sender === 'me' }">
        {{ message.content }} (ID: {{ message.id }})
      </li>
    </ul>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage">
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';

export default {
  data() {
    return {
      userId: '',
      newMessage: '',
      messages: [],
      stompClient: null,
    };
  },
  mounted() {
    this.userId = JSON.parse(window.localStorage.getItem("user")).id;
    this.connect();
  },
  methods: {
    connect() {
      const token = localStorage.getItem("jwtToken");
      const socket = new SockJS(`http://localhost/baseball/game?token=${token}`);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe('/topic/messages', tick => {
          let message = JSON.parse(tick.body);
          this.messages.push({
            content: message.content,
            id: message.id,
            sender: message.id == this.userId ? 'me' : 'other'
          })
        });
      });
    },
    sendMessage() {
      if (this.newMessage !== '' && this.stompClient) {
        const chatMessage = {
          content: this.newMessage,
          type: 'CHAT'
        };
        this.stompClient.send("/app/chat.sendMessage", JSON.stringify(chatMessage), {});
        this.newMessage = '';
      }
    },
  },
  beforeDestroy() {
    if (this.stompClient) {
      this.stompClient.disconnect();
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

.my-msg {
  color: darkred;
}
</style>
