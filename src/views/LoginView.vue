<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="userId" placeholder="User ID" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
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
