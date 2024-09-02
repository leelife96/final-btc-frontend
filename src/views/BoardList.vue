<template>
  <div>
    <h3>게시판 목록</h3>
    <RegistBoard @reload="reload" />
    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>내용</th>
          <th>작성자</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(board, index) in boardList"
          :key="index"
          @click="getBoardDetail(board)"
        >
          <td>{{ board.bno }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.content }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ formatDate(board.regDate) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- 글 상세 보기 팝업창 -->
    <div v-if="openDetail" class="popup-overlay" @click="closeDetail">
      <div class="popup-content" @click.stop>
        <h2>글 상세 보기</h2>
        <p>글 번호 : {{ boardDetail.bno }}</p>
        <p>제목 : {{ boardDetail.title }}</p>
        <p>등록일 : {{ formatDate(boardDetail.regDate) }}</p>
        <p>내용 : {{ boardDetail.content }}</p>
        <p>작성자 : {{ boardDetail.writer }}</p>
        <button @click="closeDetail">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import RegistBoard from "@/components/RegistBoard.vue";

export default {
  name: "BoardList",
  components: {
    RegistBoard,
  },
  data() {
    return {
      boardList: [],
      openDetail: false, // 여기에 추가
      boardDetail: {}, // 글 상세 정보를 저장할 변수
    };
  },
  created() {
    this.getBoardList();
  },
  methods: {
    reload() {
      this.getBoardList(); // $refs를 사용하지 않고 직접 호출
    },
    getBoardList() {
      axios
        .get("http://localhost:8787/api/board/get-board-list.do")
        .then((response) => {
          if (response.data.success) {
            this.boardList = response.data.result;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    getBoardDetail(board) {
      const params = {
        bno: board.bno,
      };
      axios
        .post("http://localhost:8787/api/board/get-board-detail.do", params)
        .then((response) => {
          if (response.data.success) {
            this.boardDetail = response.data.result;
            this.openDetail = true;
          } else {
            console.error("Failed to load board detail.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDetail() {
      this.openDetail = false;
    },
  },
};
</script>

<style scoped>
.board-table {
  width: 100%;
  max-width: 800px; /* 최대 너비 설정 */
  margin: 0 auto; /* 테이블을 중앙에 배치 */
  border-collapse: collapse;
  margin-top: 20px;
}

.board-table th,
.board-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.board-table th {
  background-color: #f4f4f4;
  color: #333;
}

.board-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.board-table tr:hover {
  background-color: #f1f1f1;
}

h3 {
  text-align: center;
}

/* 팝업창 배경 스타일 */
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

/* 팝업창 내용 스타일 */
.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: left;
}

/* 팝업창 닫기 버튼 스타일 */
.popup-content button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
}
</style>
