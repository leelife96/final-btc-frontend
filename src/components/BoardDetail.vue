<template>
  <div v-if="open" class="popup-overlay" @click="closeDetail">
    <div class="popup-content" @click.stop>
      <h2>글 상세 보기</h2>
      <div class="detail-info">
        <p><strong>제목:</strong> {{ boardDetail.title }}</p>
        <p><strong>등록일:</strong> {{ formatDate(boardDetail.regDate) }}</p>
        <p><strong>내용:</strong></p>
        <p class="content">{{ boardDetail.content }}</p>
      </div>
      <div class="button-group">
        <button @click="clickEditButton">수정</button>
        <button @click="clickDeleteButton">삭제</button>
        <button @click="closeDetail" class="close-button">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "BoardDetail",
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    boardDetail: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    closeDetail() {
      this.$emit("close");
    },
    clickEditButton() {
      this.$emit("edit", {
        bno: this.boardDetail.bno,
        title: this.boardDetail.title,
        content: this.boardDetail.content,
      });
      this.closeDetail();
    },
    clickDeleteButton() {
      const params = {
        bno: this.boardDetail.bno,
      };
      axios
        .post("/api/board/delete-board.do", params)
        .then(() => {
          this.$emit("reload");
          this.closeDetail();
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
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
  width: 90%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: left;
  color: #ffffff;
}

h2 {
  margin: 0 0 20px;
  color: #f0b90b;
}

.detail-info {
  margin-bottom: 20px;
}

.detail-info p {
  margin: 5px 0;
}

.detail-info .content {
  white-space: pre-wrap; /* Preserve line breaks and whitespace */
}

.button-group {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.button-group button {
  background-color: #f0b90b;
  color: #1e1e2f;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #d7a309;
}

.close-button {
  background-color: #444;
  color: #ffffff;
}
</style>
