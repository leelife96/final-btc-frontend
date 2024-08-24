<template>
  <PageHeader />
  <router-link to="/user">UserList</router-link> |
  <router-link to="/user/findById">UserSelect</router-link> |
  <router-link to="/user/editById">UserUpdate</router-link> |
  <router-link to="/user/save">UserCreate</router-link>
  // 헤더 컴포넌트
  <router-view />
  // 페이지 이동이 표시될 곳
  <PageFooter />
  // 푸터 컴포넌트
</template>

<script>
// 헤더 페이지 경로
import PageHeader from "@/components/PageHeader";

// 푸터 페이지 경로
import PageFooter from "@/components/PageFooter";

export default {
  name: "App",
  components: {
    PageFooter, // 푸터 페이지 컴포넌트 선언
    PageHeader, // 헤더 페이지 컴포넌트 선언
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
