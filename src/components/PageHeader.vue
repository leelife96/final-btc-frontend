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
          <router-link to="/login">
            <button class="nav-button">로그인</button>
          </router-link>
          <router-link to="/signup">
            <button class="nav-button signup">회원가입</button>
          </router-link>
        </span>
        <span v-if="isLoggedIn">
          <button class="nav-button logout" @click="logout">Logout</button>
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
  gap: 15px;
  flex-grow: 1;
  position: relative;
  margin-left: -340px;
}

.coin-title {
  color: #f0b90b;
  font-weight: bold;
  font-size: 40px;
}

.nav-right {
  display: flex;
  gap: 10px; /* 메뉴 간 간격 */
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
}

/* 버튼 스타일 */
.nav-button {
  color: white;
  background-color: #f0b90b; /* 바이낸스 스타일의 노란색 */
  border: none;
  font-weight: bold;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-button.signup {
  background-color: #ffffff;
  color: #f0b90b;
}

.nav-button.logout {
  background-color: #e74c3c; /* 로그아웃 버튼은 빨간색으로 설정 */
  color: white;
}

.nav-button:hover {
  background-color: #ffffff;
  color: #f0b90b;
}

.nav-button.signup:hover {
  background-color: #f0b90b;
  color: white;
}

.nav-button.logout:hover {
  background-color: #c0392b; /* 로그아웃 버튼의 호버 상태 */
  color: white;
}
</style>
