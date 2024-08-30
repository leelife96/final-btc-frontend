<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <form @submit.prevent="signup" class="signup-form">
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
      <div class="input-group">
        <input v-model="userName" placeholder="User Name" class="input-field" />
      </div>
      <div class="input-group">
        <input v-model="email" placeholder="Email" class="input-field" />
      </div>
      <button type="submit" class="signup-button">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userId: "",
      password: "",
      userName: "",
      email: "",
    };
  },
  methods: {
    signup() {
      axios
        .post("/api/users/signup", {
          userId: this.userId,
          password: this.password,
          userName: this.userName,
          email: this.email,
        })
        .then((response) => {
          alert(response.data);
          if (response.data === "User registered successfully") {
            this.$router.push("/"); // 회원가입 성공 후 홈화면으로 리다이렉트
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.signup-container {
  min-width: 660px;
  min-height: 400px;
  margin: 60px auto;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.signup-form {
  display: flex;
  flex-direction: column;
}

.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px 20px;
  font-size: 14px;
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

.signup-button {
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.signup-button:hover {
  background-color: #0056b3;
}

h2 {
  margin-bottom: 30px;
  color: #ffffff;
  font-size: 24px;
}
</style>
