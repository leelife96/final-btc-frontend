<template>
  <div>
    <button @click="goToHome">Go to Home</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>
