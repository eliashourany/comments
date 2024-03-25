<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Comment } from "@/types";
import Avatar from "@/components/Base/Avatar.vue";
import { timeAgo } from "@/utils/timeUtils";
import Button from "@/components/Base/Button.vue";
import BackIcon from "@/assets/icons/back.svg";
import EditIcon from "@/assets/icons/edit.svg";
import TrashIcon from "@/assets/icons/trash.svg";
import Vote from "@/components/Base/Vote.vue";
import Container from "@/components/Base/Container.vue";
import Badge from "@/components/Base/Badge.vue";
import { countReplies } from "@/utils/commentsUtil";

export default defineComponent({
  name: "CommentItem",
  computed: {
    indentation(): string {
      return this.level * (this.shouldCollapse ? 30 : 60) + "px";
    },
    numberOfRepliesText(): string {
      const totalReplies = countReplies(this.comment);

      if (totalReplies === 0) {
        return "0 Replies";
      } else {
        return `+${totalReplies} Repl${totalReplies === 1 ? "y" : "ies"}`;
      }
    },
    shouldCollapse(): boolean {
      return this.windowWidth <= 700;
    },
  },
  components: { Badge, Container, Vote, Button, Avatar },
  props: {
    comment: { type: Object as PropType<Comment>, required: true },
    username: String,
    level: { type: Number, default: 1 },
    upvoting: { type: Boolean, default: false },
    downvoting: { type: Boolean, default: false },
  },
  methods: {
    timeAgo,
    isAuthor(comment: Comment) {
      return this.username === comment.user.username;
    },
    onCollapse(collapsed: boolean) {
      this.collapsed = collapsed;
      this.$emit("onCollapse", collapsed);
    },
    onDelete() {
      this.$emit("onDelete", this.comment.id);
    },
    onEdit() {
      this.$emit("onEdit", this.comment);
    },
    onReply() {
      this.$emit("onReply", this.comment);
    },
    setWindowWidth() {
      this.windowWidth = window.innerWidth;
    },
  },
  emits: [
    "onCollapse",
    "onDelete",
    "onEdit",
    "onReply",
    "onUpvote",
    "onDownvote",
  ],
  data() {
    return {
      backIcon: BackIcon,
      editIcon: EditIcon,
      trashIcon: TrashIcon,
      collapsed: false,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    window.addEventListener("resize", this.setWindowWidth);
  },
});
</script>

<template>
  <Container
    collapsable
    @onCollapse="onCollapse"
    :classes="{
      container: 'comment',
      content: 'comment__content',
      header: 'comment__header',
    }"
  >
    <template #header>
      <Avatar
        :username="comment.user.username"
        :is-online="comment.user.isOnline"
        :image-url="comment.user.avatar"
        className="comment__avatar"
      />
      <transition name="badge">
        <Badge v-show="collapsed" theme="success">{{
          numberOfRepliesText
        }}</Badge>
      </transition>
      <Badge v-if="isAuthor(comment)"> You </Badge>
      <time class="comment__date" :datetime="comment.createdAt">
        {{ timeAgo(comment.createdAt) }}
      </time>
      <div class="comment__actions">
        <template v-if="isAuthor(comment)">
          <Button outlined theme="secondary" @onClick="onDelete">
            <img :src="trashIcon" class="comment__icon" /> Delete
          </Button>
          <Button outlined @onClick="onEdit">
            <img :src="editIcon" class="comment__icon" /> Edit
          </Button>
        </template>
        <Button @onClick="onReply" v-else outlined
          ><img :src="backIcon" class="comment__icon" /> Reply</Button
        >
      </div>
    </template>
    <template #content>
      <Vote
        @onDownvote="() => $emit('onDownvote', comment.id)"
        @onUpvote="() => $emit('onUpvote', comment.id)"
        :upvoting="upvoting"
        :downvoting="downvoting"
        :score="comment.score"
        :horizontal="shouldCollapse"
      ></Vote>
      {{ comment.content }}
    </template>
  </Container>
</template>

<style lang="scss">
.comment {
  margin-left: v-bind(indentation);

  &__header {
    align-items: center;
    gap: 16px;
    align-items: center;
    @media (max-width: 700px) {
      flex-wrap: wrap;
      gap: 8px;
      row-gap: 0;
    }
  }
  @media (max-width: 700px) {
    &__avatar {
      flex-basis: 100%;
    }
  }

  &__date {
    color: #667085;
    font-size: 1rem;
    margin: 0;
    flex-shrink: 0;
  }

  &__actions {
    margin-left: auto;
    display: flex;
    gap: 5px;
  }

  &__icon {
    width: 18px;
    height: 18px;
  }

  &__content {
    color: #667085;
    font-size: 0.9rem;
    line-height: 20px;
    display: flex;
    gap: 15px;

    @media (max-width: 700px) {
      flex-direction: column-reverse;
      align-items: start;
    }
  }

  &__header,
  &__content {
    @media (max-width: 700px) {
      padding: 10px !important;
    }
  }
}

@media (min-width: 700px) {
  .badge-enter-from {
    opacity: 0;
    max-width: 0;
  }

  .badge-enter-to {
    max-width: 600px;
  }
  .badge-enter-active,
  .badge-leave-active {
    transition: all 0.4s ease;
  }

  .badge-leave-from {
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: 600px;
  }

  .badge-leave-to {
    opacity: 0;
    max-width: 0;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-right: -16px;
  }
}
</style>
