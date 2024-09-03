<template>
  <div class="chat-container-wrapper">
    <div class="chat-toggle" @click="toggleChat">
      <span v-if="isChatOpen">Close Chat</span>
      <span v-else>Open Chat</span>
    </div>
    <!-- v-if로 채팅창을 조건부 렌더링 -->
    <div v-if="isChatOpen" class="chat-content">
      <div class="chat-header">
        <h2>Chat Room</h2>
      </div>
      <div class="chat-container">
        <div class="chat-box">
          <div class="messages">
            <div v-for="(item, idx) in recvList" :key="idx" class="message">
              <span class="message-user">{{ item.userName }}</span>
              <span class="message-content">{{ item.content }}</span>
            </div>
          </div>
          <div class="chat-input">
            <div class="input-box">
              <label class="input-label">닉네임</label>
              <input
                v-model="userName"
                type="text"
                placeholder="Enter your name"
                class="input-field"
              />
            </div>
            <div class="input-box">
              <textarea
                v-model="message"
                @keyup.enter="sendMessage"
                placeholder="Type a message..."
                class="input-field"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Stomp from "webstomp-client";
import SockJS from "sockjs-client";

export default {
  name: "ChatComponent",
  data() {
    return {
      isChatOpen: false, // 채팅창 열림/닫힘 상태를 제어
      userName: "",
      message: "",
      recvList: [],
    };
  },
  created() {
    this.connect();
  },
  methods: {
    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
    },
    sendMessage() {
      if (this.userName !== "" && this.message !== "") {
        this.send();
        this.message = "";
      }
    },
    send() {
      if (this.stompClient && this.stompClient.connected) {
        const msg = {
          userName: this.userName,
          content: this.message,
        };
        this.stompClient.send("/receive", JSON.stringify(msg), {});
      }
    },
    connect() {
      const serverURL = "http://localhost:8787";
      let socket = new SockJS(serverURL);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        () => {
          this.connected = true;
          this.stompClient.subscribe("/send", (res) => {
            this.recvList.push(JSON.parse(res.body));
          });
        },
        (error) => {
          this.connected = false;
          console.error("Connection failed", error);
        }
      );
    },
  },
};
</script>

<style scoped>
.chat-container-wrapper {
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 400px;
  background-color: #2c2c3c; /* Dark background for container */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow */
  overflow: hidden; /* Ensure child elements do not overflow */
}

.chat-toggle {
  padding: 10px;
  background-color: #f0b90b; /* Binance yellow */
  color: #1e1e2f; /* Dark text for contrast */
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 2px solid #f0b90b; /* Bottom border in yellow */
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  background-color: #1e1e2f; /* Darker background for header */
  padding: 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  text-align: center;
  border-bottom: 2px solid #444; /* Subtle border */
}

.chat-header h2 {
  margin: 0;
  color: #ffffff; /* White text */
}

.chat-container {
  display: flex;
  flex-direction: column;
  height: 700px;
  width: 100%;
}

.chat-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #2c2c3c; /* Dark background for chat area */
  overflow-y: auto; /* Enable vertical scrolling */
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto; /* Scrollable message area */
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #373737; /* Darker background for messages */
}

.message-user {
  font-weight: bold;
  color: #f0b90b; /* Yellow text for usernames */
  margin-right: 10px; /* Space between username and content */
  font-size: 15px;
  flex-shrink: 0; /* Prevent user name from shrinking */
}

.message-content {
  color: #ffffff; /* White text */
  background-color: #1e1e2f; /* Even darker background for message content */
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word; /* Break long words */
  overflow-wrap: break-word; /* Ensure long words are wrapped */
  flex: 1; /* Allow message content to take remaining space */
  padding: 10px;
}

.chat-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #1e1e2f; /* Dark background for input area */
  border-top: 1px solid #444; /* Top border in dark gray */
}

.input-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 100px; /* Fixed width for labels */
  margin-right: 10px;
  font-weight: bold;
  color: #f0b90b; /* Yellow label text */
  font-size: 14px;
}

.input-field {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  color: #ffffff; /* White text */
  background-color: #333; /* Dark input background */
  border: 2px solid #444; /* Dark border */
  border-radius: 8px;
}

.input-field:focus {
  border-color: #f0b90b; /* Yellow border on focus */
  outline: none;
}
</style>
