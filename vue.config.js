/* const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static", //Build Directory
  devServer: {
    proxy: "http://localhost:8787", // Spring Boot Server
  },
}); */

/* module.exports = {
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
 */

/* const target = "http://3.34.231.185:8787";
module.exports = {
  devServer: {
    port: 9000, // Vue.js를 9000에서 실행
    proxy: {
      "/api": {
        target: target, // Spring Boot 서버
        changeOrigin: true,
        pathRewrite: { "^/api": "" }, // 경로에서 /api 제거
      },
    },
  },
};
 */

/* const target = "http://localhost:8787";
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
}; */

const target = "http://3.34.231.185"; // EC2 인스턴스의 IP 주소와 포트.. Nginx 설정 참고

module.exports = {
  devServer: {
    port: 9000, // Vue.js의 port 9000 으로 지정
    proxy: {
      "/api": {
        target: target,
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
    },
  },
};
