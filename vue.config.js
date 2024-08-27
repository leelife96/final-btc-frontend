const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static", //Build Directory
  /*   devServer: {
    proxy: "http://localhost:8787", // Spring Boot Server
  }, */
});

/* const target = "http://localhost:8787";
module.exports = {
  devServer: {
    port: 8787,
    proxy: {
      "/api": {
        target,
        changOrigin: true,
      },
    },
  },
};
 */
