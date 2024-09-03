<template>
  <div v-if="open" class="popup-overlay" @click="closeDetail">
    <div class="popup-content" @click.stop>
      <h2>글 상세 보기</h2>
      <p>글 번호 : {{ boardDetail.bno }}</p>
      <p>제목 : {{ boardDetail.title }}</p>
      <p>등록일 : {{ formatDate(boardDetail.regDate) }}</p>
      <p>내용 : {{ boardDetail.content }}</p>
      <p>작성자 : {{ boardDetail.writer }}</p>
      <button @click="closeDetail">닫기</button>
      <div class="button-group">
        <button @click="clickEditButton()">수정</button>
        <button @click="clickDeleteButton()">삭제</button>
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
      this.$emit("close"); // Emit close event to parent
    },
    clickEditButton() {
      // RegistBoard 컴포넌트의 ref를 통해서 수정 모드로 전환
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
        .post("http://localhost:8787/api/board/delete-board.do", params)
        .then(() => {
          // 'response' 변수 제거
          this.$emit("reload"); // reload 이벤트를 부모에게 emit
          this.closeDetail(); // 상세 보기 닫기
          window.location.reload(); // 페이지 새로고침
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
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  text-align: left;
  color: #ffffff;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.popup-content button {
  background-color: #f0b90b;
  color: #1e1e2f;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.popup-content button:hover {
  background-color: #d7a309;
}
</style>
