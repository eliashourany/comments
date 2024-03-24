<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
export default defineComponent({
  name: "CommentsView",
  components: { CommentList, CommentForm },
  computed: {
    ...mapState([
      "comments",
      "loading",
      "error",
      "user",
      "upvotes",
      "downvotes",
    ]),
  },
  methods: {
    ...mapMutations(["addComment"]),
    ...mapActions(["fetchData", "deleteComment", "vote"]),
  },
  mounted() {
    this.fetchData();
  },
});
</script>

<template>
  <div class="container">
    <comment-list
      @onDelete="deleteComment"
      :comments="comments"
      :username="user.username"
      @onUpvote="(commentId) => vote({ commentId, isUpvote: true })"
      @onDownvote="(commentId) => vote({ commentId, isUpvote: false })"
      :upvotes="upvotes"
      :downvotes="downvotes"
    ></comment-list>
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
  padding-bottom: 200px;
}
</style>
