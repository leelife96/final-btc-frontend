<template>
  <div id="app">
    <PageHeader />

    <!-- 채팅 컴포넌트 -->
    <ChatComponent />

    <router-view />
    <!-- 페이지 이동이 표시될 곳 -->
  </div>
</template>

<script>
// 헤더와 푸터 컴포넌트
import PageHeader from "@/components/PageHeader";

// 채팅 컴포넌트
import ChatComponent from "@/components/ChatComponent";

export default {
  name: "App",
  components: {
    PageHeader,
    ChatComponent,
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
  background-color: #181a20;
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: 100vh;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 20px;
  overflow-y: auto;
}

#app > footer {
  margin-top: auto;
}
</style>
