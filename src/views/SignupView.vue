<template>
  <div>
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
      <input v-model="userId" placeholder="User ID" />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="userName" placeholder="User Name" />
      <input v-model="email" placeholder="Email" />
      <button type="submit">Sign Up</button>
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
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
