const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static", //Build Directory
  devServer: {
    proxy: "http://localhost:8787", // Spring Boot Server
  },
});
