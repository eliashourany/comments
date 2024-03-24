<template><router-view /></template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {};
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");
@import "normalize.css";

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  background-color: #f0f0f0;
}
</style>
