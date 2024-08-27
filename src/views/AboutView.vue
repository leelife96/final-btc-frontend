<template>
  <div class="about">
    <h1>{{ connectData }}</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AboutView",
  data() {
    return {
      connectData: "",
    };
  },
  methods: {
    get() {
      axios
        .get("/connectTest")
        .then((response) => {
          this.connectData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  mounted() {
    this.get(); // 'this'는 Vue 인스턴스를 가리키고 있어야 합니다.
  },
};
</script>
