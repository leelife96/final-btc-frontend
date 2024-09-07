/* const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static", //Build Directory
  devServer: {
    proxy: "http://localhost:8787", // Spring Boot Server
  },
}); */

const target = "http://localhost:8787";
module.exports = {
  devServer: {
    port: 9000, // Vue.js를 9000에서 실행
    proxy: {
      "/api": {
        target: "http://localhost:8787", // Spring Boot 서버
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // 경로에서 /api 제거
      },
    },
  },
};
