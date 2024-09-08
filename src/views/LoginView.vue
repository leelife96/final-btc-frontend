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
        const response = await axios.post("/api/users/login", {
          userId: this.userId,
          password: this.password,
        });
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
  background-color: #2c2c3c;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  min-height: 400px;
}

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
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
  background-color: #1e1e2f;
  border: 2px solid #444;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #f0b90b;
}

.login-button {
  padding: 15px 25px;
  background-color: #f0b90b;
  color: #1e1e2f;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #d7a309; /* 살짝 어두운 노란색 */
}

h2 {
  margin-bottom: 40px;
  color: #ffffff;
  font-size: 28px;
}
</style>
