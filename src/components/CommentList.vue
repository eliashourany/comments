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
    comments: { type: Array as PropType<Comment[]>, required: true },
    username: { type: String },
    level: { type: Number, default: 1 },
  },
});
</script>

<template>
  <template v-for="comment in comments" :key="comment.id">
    <comment-item
      :comment="comment"
      :username="username"
      :level="level"
    ></comment-item>
    <comment-list
      v-if="comment.replies.length > 0"
      :comments="comment.replies"
      :username="username"
      :level="level + 1"
    ></comment-list>
  </template>
</template>

<style scoped lang="scss"></style>
