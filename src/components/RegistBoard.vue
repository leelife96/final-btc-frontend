<template>
  <div>
    <!-- 글쓰기 버튼 -->
    <button @click="openPopup = true">글쓰기</button>

    <!-- 팝업 내용 -->
    <div v-if="openPopup" class="popup">
      <div class="popup-content">
        <h2>글쓰기</h2>

        <!-- 본문 영역 -->
        <input
          type="text"
          v-model="title"
          class="input-title"
          placeholder="제목을 입력해 주세요"
        />
        <textarea
          v-model="content"
          class="input-content"
          rows="10"
          placeholder="내용을 입력해 주세요."
        ></textarea>

        <!-- dialog footer 영역 -->
        <div class="popup-footer">
          <button @click="registboard()">확인</button>
          <button @click="closePopup">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"; // axios를 추가합니다.
export default {
  data() {
    return {
      openPopup: false,
      title: "",
      content: "",
    };
  },
  computed: {
    setParams() {
      const params = {
        title: this.title,
        content: this.content,
      };
      return params;
    },
  },
  methods: {
    closePopup() {
      this.openPopup = false;
    },
    registboard() {
      axios
        .post(
          "http://localhost:8787/api/board/get-board-list.do",
          this.setParams
        )
        .then((response) => {
          if (response.data.success || response.data.result) {
            this.openPopup = false; // 창의 화면 변수 false로 창 닫기
            this.title = ""; // 입력되어 있는 변수들의 값을 초기화
            this.content = "";
            this.$emit("reload");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
/* 팝업 배경 스타일 */
.popup {
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

/* 팝업 콘텐츠 스타일 */
.popup-content {
  background-color: white;
  padding: 20px;
  width: 30%;
  border-radius: 8px;
  text-align: left;
}

/* 제목 입력 필드 스타일 */
.input-title {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 내용 입력 필드 스타일 */
.input-content {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none; /* textarea의 크기 조정 방지 */
}

/* 버튼 영역 스타일 */
.popup-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.popup-footer button {
  margin-left: 10px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup-footer button:first-child {
  background-color: #007bff;
  color: white;
}

.popup-footer button:last-child {
  background-color: #f0f0f0;
  color: #333;
}
</style>
