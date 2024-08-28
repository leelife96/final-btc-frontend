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
  background-color: #2c3e50; /* 다크 배경색 */
  color: white; /* 텍스트 색상 */
  padding: 20px 0; /* 위아래 패딩 */
  text-align: center; /* 텍스트 중앙 정렬 */
  position: fixed; /* 화면 하단에 고정 */
  bottom: 0;
  width: 100%; /* 화면 너비에 맞게 확장 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 상단 그림자 효과 */
}

.footer hr {
  margin: 0 0 10px 0; /* hr 태그와 텍스트 사이의 간격 조절 */
  border-color: white; /* hr 태그의 색상 변경 */
}

.footer p {
  margin: 0; /* 텍스트 여백 제거 */
  font-size: 14px; /* 텍스트 크기 조절 */
  letter-spacing: 0.5px; /* 글자 간격 조절 */
}
</style>
