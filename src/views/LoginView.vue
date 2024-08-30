<template>
  <div class="login-container">
    <h2>로그인</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="input-group">
        <input v-model="userId" placeholder="User ID" class="input-field" />
      </div>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="input-field"
        />
      </div>
      <button type="submit" class="login-button">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]),
    async login() {
      try {
        const response = await axios.post(
          "http://localhost:8787/api/users/login",
          {
            userId: this.userId,
            password: this.password,
          }
        );
        if (response.data === "Login successful") {
          localStorage.setItem("isLoggedIn", "true");
          this.$store.dispatch("login");
          this.$router.push("/");
        } else {
          alert(response.data);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  min-width: 680px;
  margin: 60px auto;
  padding: 30px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-height: 400px; /* 최소 높이를 늘림 */
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center; /* 폼을 컨테이너 중앙에 수직 정렬 */
  height: 100%; /* 폼이 컨테이너 전체 높이를 차지하게 설정 */
}

.input-group {
  position: relative;
  margin-bottom: 25px;
}

.input-field {
  width: 100%;
  padding: 15px 25px;
  font-size: 16px;
  color: #ffffff;
  background-color: #333;
  border: 2px solid #444;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #007bff;
}

.login-button {
  padding: 15px 25px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}

h2 {
  margin-bottom: 40px;
  color: #ffffff;
  font-size: 28px;
}
</style>
