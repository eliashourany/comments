<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Comment } from "@/types";
import Avatar from "@/components/Avatar.vue";
import { timeAgo } from "@/utils/timeUtils";
import Button from "@/components/Button.vue";
import BackIcon from "@/assets/icons/back.svg";
import EditIcon from "@/assets/icons/edit.svg";
import TrashIcon from "@/assets/icons/trash.svg";

export default defineComponent({
  name: "CommentItem",
  computed: {
    indentation(): string {
      return this.level * 60 + "px";
    },
  },
  components: { Button, Avatar },
  props: {
    comment: { type: Object as PropType<Comment>, required: true },
    username: String,
    level: { type: Number, default: 1 },
  },
  methods: {
    timeAgo,
    isAuthor(comment: Comment) {
      return this.username === comment.user.username;
    },
  },
  data() {
    return {
      backIcon: BackIcon,
      editIcon: EditIcon,
      trashIcon: TrashIcon,
    };
  },
});
</script>

<template>
  <div class="comment">
    <div class="comment__header">
      <Avatar
        :username="comment.user.username"
        :is-online="comment.user.isOnline"
        :image-url="comment.user.avatar"
      />
      <p class="comment__date">{{ timeAgo(comment.createdAt) }}</p>
      <div class="comment__actions">
        <template v-if="isAuthor(comment)">
          <Button outlined theme="secondary">
            <img :src="trashIcon" class="comment__icon" /> Delete
          </Button>
          <Button outlined>
            <img :src="editIcon" class="comment__icon" /> Edit
          </Button>
        </template>
        <Button v-else outlined
          ><img :src="backIcon" class="comment__icon" /> Reply</Button
        >
      </div>
    </div>
    <div class="comment__content">
      {{ comment.content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment {
  background-color: white;
  margin-bottom: 20px;
  border-radius: 8px;
  margin-left: v-bind(indentation);
  &__header,
  &__content {
    padding: 16px;
  }

  &__header {
    border-bottom: 1px solid #eaecf0;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  &__date {
    color: #667085;
    font-size: 16px;
    margin: 0;
  }

  &__actions {
    margin-left: auto;
    display: flex;
    gap: 5px;
  }

  &__content {
    color: #667085;
    font-size: 14px;
    line-height: 20px;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }
}
</style>
