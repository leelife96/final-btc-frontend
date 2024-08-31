<template>
  <div>
    <h3>게시판 목록</h3>
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
        <tr v-for="(board, index) in boardList" :key="index">
          <td>{{ board.bno }}</td>
          <td>{{ board.title }}</td>
          <td>{{ board.content }}</td>
          <td>{{ board.writer }}</td>
          <td>{{ formatDate(board.regDate) }}</td>
          <!-- 날짜 포맷팅 -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "BoardList",
  data() {
    return {
      boardList: [],
    };
  },
  created() {
    this.getBoardList();
  },
  methods: {
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
      return moment(date).format("YYYY-MM-DD"); // 날짜를 YYYY-MM-DD 형식으로 포맷팅
    },
  },
};
</script>

<style scoped>
.board-table {
  width: 100%;
  max-width: 1150px; /* 최대 너비 설정 */
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
</style>
