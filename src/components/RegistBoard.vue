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
        <button @click="registboard">확인</button>
        <button @click="closePopup">취소</button>
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
      const apiUrl = this.editMode
        ? "http://localhost:8787/api/board/edit-board.do"
        : "http://localhost:8787/api/board/regist-board.do";

      axios
        .post(apiUrl, this.getParams())
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
</style>
