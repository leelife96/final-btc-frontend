<template>
  <div>
    <h3>Bitcoin Communication</h3>
    <!-- Show only if logged in -->
    <button
      v-if="isLoggedIn"
      style="background-color: #d7a309"
      @click="openRegistPopup"
    >
      글쓰기
    </button>

    <table class="board-table">
      <thead>
        <tr class="table-header">
          <th>제목</th>
          <th>작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(board, index) in boardList"
          :key="index"
          @click="getBoardDetail(board)"
        >
          <td>{{ board.title }}</td>
          <!-- Writer will be the logged-in user -->
          <td>{{ formatDate(board.regDate) }}</td>
        </tr>
      </tbody>
    </table>
    <BoardDetail
      :open="openDetail"
      :boardDetail="boardDetail"
      @close="closeDetail"
      @edit="handleEdit"
    />
    <RegistBoard ref="registPopup" @reload="reload" />
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import RegistBoard from "@/components/RegistBoard.vue";
import BoardDetail from "@/components/BoardDetail.vue";

export default {
  name: "BoardList",
  components: {
    RegistBoard,
    BoardDetail,
  },
  data() {
    return {
      boardList: [],
      openDetail: false,
      boardDetail: {},
      isLoggedIn: localStorage.getItem("isLoggedIn") === "true", // Check login state
    };
  },
  created() {
    this.getBoardList();
  },
  methods: {
    reload() {
      this.getBoardList();
    },
    getBoardList() {
      axios
        .get("/api/board/get-board-list.do") // 수정된 경로
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
        .post("/api/board/get-board-detail.do", params) // 수정된 경로
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
    handleEdit(data) {
      const registPopup = this.$refs.registPopup;
      registPopup.bno = data.bno;
      registPopup.title = data.title;
      registPopup.content = data.content;
      registPopup.editMode = true;
      registPopup.openPopup = true;
    },
    openRegistPopup() {
      const registPopup = this.$refs.registPopup;
      registPopup.openPopup = true;
    },
  },
};
</script>

<style scoped>
.board-table {
  width: 100%;
  margin: 0 auto;
  max-width: 1080px;
  border-collapse: collapse;
  margin-top: 20px;
}

.board-table th,
.board-table td {
  border: 1px solid #3c3c4e;
  padding: 8px;
  text-align: center;
  color: #ffffff; /* 글자색을 하얀색으로 설정 */
}

.board-table th {
  background-color: #2c2c3c;
  color: #ffffff;
}

.board-table tr:nth-child(even) {
  background-color: #2b2b3b;
}

.board-table tr:hover {
  background-color: #33334d;
}

h3 {
  text-align: center;
  color: #ffffff;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
  margin-left: 970px;
}

button:hover {
  background-color: #0056b3;
}
</style>
