<script lang="ts">
import { defineComponent, PropType } from "vue";
import CommentItem from "@/components/CommentItem.vue";
import { Comment } from "@/types";

export default defineComponent({
  name: "CommentList",
  components: {
    CommentItem,
  },
  props: {
    comments: Array as PropType<Comment[]>,
  },
});
</script>

<template>
  <template v-for="comment in comments" :key="comment.id">
    <comment-item></comment-item>
    <comment-list
      v-if="comment.replies.length > 0"
      :comments="comment.replies"
    ></comment-list>
  </template>
</template>

<style scoped lang="scss"></style>
