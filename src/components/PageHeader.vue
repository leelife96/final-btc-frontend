<template>
  <header>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/board/list">게시판</router-link> |
      <span v-if="!isLoggedIn">
        | <router-link to="/login">Login</router-link> |
        <router-link to="/signup">Sign Up</router-link>
      </span>
      <span v-if="isLoggedIn"> | <button @click="logout">Logout</button> </span>
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
  background-color: #2c3e50;
  padding: 10px;
  color: white;
  text-align: center;
}

#nav {
  display: flex;
  justify-content: center;
  gap: 15px;
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

hr {
  border: none;
  height: 2px;
  background-color: #ddd;
  margin-top: 10px;
}
</style>
