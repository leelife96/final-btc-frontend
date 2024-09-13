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
      const serverURL = "http://3.34.231.185/ws"; // 실제 EC2 서버 IP 주소
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
  background-color: #2c2c3c;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.chat-toggle {
  padding: 10px;
  background-color: #f0b90b;
  color: #1e1e2f;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 2px solid #f0b90b;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  background-color: #1e1e2f;
  padding: 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  text-align: center;
  border-bottom: 2px solid #444;
}

.chat-header h2 {
  margin: 0;
  color: #ffffff;
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
  background-color: #2c2c3c;
  overflow-y: auto;
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #373737;
}

.message-user {
  font-weight: bold;
  color: #f0b90b;
  margin-right: 10px;
  font-size: 15px;
  flex-shrink: 0;
}

.message-content {
  color: #ffffff;
  background-color: #1e1e2f;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;
  overflow-wrap: break-word;
  flex: 1;
  padding: 10px;
}

.chat-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #1e1e2f;
  border-top: 1px solid #444;
}

.input-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 100px;
  margin-right: 10px;
  font-weight: bold;
  color: #f0b90b;
  font-size: 14px;
}

.input-field {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  color: #ffffff;
  background-color: #333;
  border: 2px solid #444;
  border-radius: 8px;
}

.input-field:focus {
  border-color: #f0b90b;
  outline: none;
}
</style>
