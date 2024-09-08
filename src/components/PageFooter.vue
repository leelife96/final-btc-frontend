<!-- PageFooter.vue -->
<template>
  <footer class="footer">
    <p>여기는 footer 자리입니다.</p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: white;
  padding: 20px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.footer hr {
  margin: 0 0 10px 0;
  border-color: white;
}

.footer p {
  margin: 0;
  font-size: 14px;
  letter-spacing: 0.5px;
}
</style>
