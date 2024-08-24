<!-- PageHeader.vue -->
<template>
  <header>
    <!-- 헤더부분  -->
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <!-- 링크  router-link -->
      <router-link to="/about">About</router-link> |
      <router-link to="/board/list">게시판</router-link>
    </div>
  </header>
  <hr />
</template>

<script>
export default {};
</script>

<style scoped>
/* 전체 헤더 스타일 */
header {
  background-color: #4caf50; /* 배경색 */
  padding: 10px; /* 내부 여백 */
  color: white; /* 글자 색상 */
  text-align: center; /* 중앙 정렬 */
}

/* 네비게이션 바 스타일 */
#nav {
  display: flex;
  justify-content: center; /* 가운데 정렬 */
  gap: 15px; /* 링크 사이의 간격 */
}

/* 링크 스타일 */
#nav a {
  color: white; /* 링크 글자 색상 */
  text-decoration: none; /* 밑줄 제거 */
  font-weight: bold; /* 글자 굵게 */
  padding: 5px 10px; /* 내부 여백 */
  border-radius: 5px; /* 모서리 둥글게 */
  transition: background-color 0.3s ease; /* 배경색 전환 효과 */
}

/* 링크에 마우스를 올렸을 때 */
#nav a:hover {
  background-color: #3e8e41; /* 배경색 변경 */
}

/* 구분선 스타일 */
hr {
  border: none;
  height: 2px;
  background-color: #ddd;
  margin-top: 10px;
}
</style>
