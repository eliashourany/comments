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
    upvotes: { type: Array as PropType<number[]>, default: () => [] },
    downvotes: { type: Array as PropType<number[]>, default: () => [] },
  },
  data() {
    return {
      collapsedIds: new Set<number>(),
    };
  },
  methods: {
    onCollapse(collapsed: boolean, commentId: number) {
      if (collapsed) {
        this.collapsedIds.add(commentId);
      } else {
        this.collapsedIds.delete(commentId);
      }
    },
    isCollapsed(commentId: number) {
      return this.collapsedIds.has(commentId);
    },
    onDelete(commentId: number) {
      this.$emit("onDelete", commentId);
    },
  },
  emits: ["onDelete", "onEdit", "onReply", "onUpvote", "onDownvote"],
});
</script>

<template>
  <transition-group tag="div" name="list" appear>
    <template v-for="comment in comments" :key="comment.id">
      <comment-item
        :comment="comment"
        :username="username"
        :level="level"
        @onDelete="onDelete"
        @onCollapse="(collapsed) => onCollapse(collapsed, comment.id)"
        @onDownvote="(commentId) => $emit('onDownvote', commentId)"
        @onUpvote="(commentId) => $emit('onUpvote', commentId)"
        :upvoting="upvotes.includes(comment.id)"
        :downvoting="downvotes.includes(comment.id)"
      ></comment-item>
      <comment-list
        v-if="comment.replies.length > 0 && !isCollapsed(comment.id)"
        :comments="comment.replies"
        :username="username"
        :level="level + 1"
        @onDelete="onDelete"
        @onDownvote="(commentId) => $emit('onDownvote', commentId)"
        @onUpvote="(commentId) => $emit('onUpvote', commentId)"
        :upvotes="upvotes"
        :downvotes="downvotes"
      ></comment-list>
    </template>
  </transition-group>
</template>

<style scoped lang="scss">
/* list transitions */
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute; /* for move transition after item leaves */
}
.list-move {
  transition: all 0.4s ease;
}
</style>
