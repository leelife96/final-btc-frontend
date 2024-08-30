<template>
  <div id="app">
    <PageHeader />

    <nav>
      <router-link to="/user">UserList</router-link> |
      <router-link to="/user/findById">UserSelect</router-link> |
      <router-link to="/user/editById">UserUpdate</router-link> |
      <router-link to="/user/save">UserCreate</router-link> |
      <router-link to="/signup">Sign Up</router-link> |
    </nav>

    <CoinComponent />

    <!-- 채팅 컴포넌트 사용 -->
    <ChatComponent />

    <router-view />
    <!-- 페이지 이동이 표시될 곳 -->

    <PageFooter />
    <!-- 푸터 컴포넌트 -->
  </div>
</template>

<script>
// 헤더와 푸터 컴포넌트
import PageHeader from "@/components/PageHeader";
import PageFooter from "@/components/PageFooter";

// 채팅 컴포넌트
import ChatComponent from "@/components/ChatComponent";

import CoinComponent from "@/components/CoinComponent.vue";

export default {
  name: "App",
  components: {
    PageFooter,
    PageHeader,
    CoinComponent,
    ChatComponent, // 채팅 컴포넌트 등록
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
  background-color: #1c1c1c;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Viewport height to ensure it occupies full height */
  margin: 0; /* Remove default margin */
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

.content {
  flex: 1; /* Allow content to grow and fill the available space */
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align content at the top */
  padding: 20px;
  overflow-y: auto; /* Allow scrolling if content overflows */
}

#app > footer {
  margin-top: auto; /* Push footer to the bottom */
}
</style>
