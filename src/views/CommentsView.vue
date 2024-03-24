<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
export default defineComponent({
  name: "CommentsView",
  components: { CommentList, CommentForm },
  computed: {
    ...mapState(["comments", "loading", "error", "user"]),
  },
  methods: {
    ...mapMutations(["addComment"]),
    ...mapActions(["fetchData"]),
  },
  mounted() {
    this.fetchData();
  },
});
</script>

<template>
  <div class="container">
    <comment-list :comments="comments" :username="user.username"></comment-list>
    <comment-form></comment-form>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin: 50px auto;
  padding: 0 30px;
  max-width: 768px;
  display: flex;
  flex-direction: column;
}
</style>
