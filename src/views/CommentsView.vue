<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
import { Mode } from "@/types";
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
    ...mapGetters(["uniqueUsernames"]),
  },
  methods: {
    ...mapMutations(["addComment"]),
    ...mapActions(["fetchData", "deleteComment", "vote", "setModeAndComment"]),
    onEdit(comment: Comment) {
      this.setModeAndComment({ mode: Mode.Edit, comment });
    },
    onReply(comment: Comment) {
      this.setModeAndComment({ mode: Mode.Reply, comment });
    },
  },
  mounted() {
    this.fetchData();
  },
});
</script>

<template>
  <div class="page">
    <comment-list
      @onDelete="deleteComment"
      :comments="comments"
      :username="user.username"
      @onUpvote="(commentId) => vote({ commentId, isUpvote: true })"
      @onDownvote="(commentId) => vote({ commentId, isUpvote: false })"
      :upvotes="upvotes"
      :downvotes="downvotes"
      @onEdit="onEdit"
      @onReply="onReply"
      :usernames="uniqueUsernames"
    ></comment-list>
    <comment-form :user="user"></comment-form>
  </div>
</template>

<style scoped lang="scss">
.page {
  margin: 50px auto;
  padding: 0 30px;
  max-width: 768px;
  padding-bottom: 200px;
}
</style>
