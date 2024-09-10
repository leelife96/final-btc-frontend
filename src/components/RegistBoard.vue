<template>
  <div v-if="openPopup" class="popup-overlay">
    <div class="popup-content">
      <h2>{{ editMode ? "글 수정" : "글 등록" }}</h2>
      <input type="text" v-model="title" placeholder="제목을 입력해 주세요" />
      <textarea
        v-model="content"
        rows="10"
        placeholder="내용을 입력해 주세요."
      ></textarea>
      <div class="button-group">
        <button @click="registboard" class="confirm-button">확인</button>
        <button @click="closePopup" class="cancel-button">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "RegistBoard",
  data() {
    return {
      openPopup: false,
      bno: "",
      editMode: false,
      title: "",
      content: "",
    };
  },
  methods: {
    registboard() {
      const loggedInUser = localStorage.getItem("loggedInUser"); // Store logged-in user info in localStorage

      const apiUrl = this.editMode
        ? "/api/board/edit-board.do"
        : "/api/board/regist-board.do";

      axios
        .post(apiUrl, {
          ...this.getParams(),
          writer: loggedInUser, // Add writer info
        })
        .then((response) => {
          if (response.data.success) {
            this.resetForm();
            this.$emit("reload");
            this.closePopup();
          } else {
            console.error("Failed to process the request.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getParams() {
      return {
        bno: this.bno,
        title: this.title,
        content: this.content,
      };
    },
    resetForm() {
      this.bno = "";
      this.title = "";
      this.content = "";
      this.editMode = false;
    },
    closePopup() {
      this.openPopup = false;
      this.resetForm();
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #2c2c3c;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.popup-content h2 {
  color: #f0b90b;
  margin-bottom: 20px;
}

.popup-content input,
.popup-content textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: none;
  background-color: #1e1e2f;
  color: #ffffff;
  font-size: 14px;
}

.popup-content input::placeholder,
.popup-content textarea::placeholder {
  color: #888;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.confirm-button {
  background-color: #f0b90b;
  color: #1e1e2f;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #d7a309;
}

.cancel-button {
  background-color: #444;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
}

.cancel-button:hover {
  background-color: #555;
}
</style>
