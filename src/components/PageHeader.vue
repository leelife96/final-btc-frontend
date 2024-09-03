<template>
  <header>
    <div id="nav">
      <div class="nav-center">
        <span class="coin-title">기웅이의 코인거래소</span>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/board/list">게시판</router-link>
      </div>
      <div class="nav-right">
        <span v-if="!isLoggedIn">
          <router-link to="/login">로그인</router-link> |
          <router-link to="/signup">회원가입</router-link>
        </span>
        <span v-if="isLoggedIn">
          <button @click="logout">Logout</button>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";

export default {
  computed: {
    ...mapState(["isLoggedIn"]),
  },
  methods: {
    ...mapActions(["logout"]),
    async logout() {
      try {
        const response = await axios.post(
          "http://localhost:8787/api/users/logout"
        );
        if (response.data === "Logout successful") {
          localStorage.removeItem("isLoggedIn");
          this.$store.dispatch("logout");
          this.$router.push("/login");
        }
      } catch (error) {
        console.error("Logout failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 헤더 및 네비게이션 스타일 */
header {
  background-color: #181a20;
  padding: 10px;
  color: white;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px; /* 메뉴 간 간격 */
  flex-grow: 1; /* 중앙 정렬을 위해 flex-grow 사용 */
  position: relative; /* 자식 요소의 위치를 조정하기 위해 사용 */
  margin-left: -650px; /* 왼쪽으로 옮길 값 설정 */
}

.coin-title {
  color: #f0b90b;
  font-weight: bold;
  font-size: 40px;
}

.nav-right {
  display: flex;
  gap: 15px; /* 메뉴 간 간격 */
}

#nav a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

#nav a:hover {
  background-color: #3e8e41;
}

button {
  color: white;
  background-color: transparent;
  border: none;
  font-weight: bold;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #c0392b;
}
</style>
