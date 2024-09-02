<template>
  <div class="chat-container-wrapper">
    <div class="chat-toggle" @click="toggleChat">
      <span v-if="isChatOpen">채팅방 닫기</span>
      <span v-else>채팅창 열기</span>
    </div>
    <!-- v-if로 채팅창을 조건부 렌더링 -->
    <div v-if="isChatOpen" class="chat-content">
      <div class="chat-header">
        <h2>실시간 채팅방</h2>
      </div>
      <div class="chat-container">
        <div class="chat-box">
          <div class="messages">
            <div v-for="(item, idx) in recvList" :key="idx" class="message">
              <h4 class="message-user">{{ item.userName }}</h4>
              <p class="message-content">{{ item.content }}</p>
            </div>
          </div>
          <div class="chat-input">
            <div class="input-box">
              <label class="input-label">사용자 닉네임</label>
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
  top: 80px;
  right: 15px;
  width: 400px;
  background-color: #020000;
  border-radius: 10px; /* 모서리 둥글게 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 외곽 그림자 */
  overflow: hidden; /* 자식 요소가 테두리 바깥으로 나가지 않도록 설정 */
}

.chat-toggle {
  padding: 10px;
  background-color: #f0b90b;
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 2px solid #f0b90b; /* 테두리 추가 */
}

.chat-content {
  transition: max-height 0.3s ease;
  border-top: 2px solid #f0b90b; /* 상단 테두리 추가 */
}

.chat-header {
  background-color: #020000;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  border-bottom: 2px solid #3b3b3b; /* 하단 테두리 추가 */
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
  overflow: hidden;
}

.chat-box {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #020000;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
}

.messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto; /* 스크롤바 생성 */
}

.message {
  margin-bottom: 5px;
  padding: 1px;
  border-radius: 8px;
  text-align: left;
}

.message-user {
  font-weight: bold;
  color: #fcfe7f;
  margin-bottom: 5px;
  padding: 1px;
  font-size: 15px;
  border-radius: 4px;
}

.message-content {
  margin: 0;
  padding: 10px;
  background-color: #373737;
  color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-word;
}

.chat-input {
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: #020000;
  border-top: 1px solid #3b3b3b;
}

.input-box {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.input-label {
  width: 100px; /* 고정 너비 설정 */
  margin-right: 10px;
  font-weight: bold;
  color: #fcfe7f;
  font-size: 14px;
}

.input-field {
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
  color: #ffffff;
  background-color: #333333;
}

.input-field[type="text"] {
  height: 40px;
}

.input-field[type="textarea"] {
  height: 100px;
}

.input-field:focus {
  border-color: #42b983;
  outline: none;
}
</style>
