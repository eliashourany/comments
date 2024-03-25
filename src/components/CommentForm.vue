<script lang="ts">
import { defineComponent, PropType } from "vue";
import Container from "@/components/Base/Container.vue";
import Avatar from "@/components/Base/Avatar.vue";
import Button from "@/components/Base/Button.vue";
import { Comment, Mode, User } from "@/types";
import { mapActions, mapState } from "vuex";

export default defineComponent({
  name: "CommentForm",
  components: { Button, Avatar, Container },
  computed: {
    ...mapState(["mode", "activeComment", "commentForm"]),
    value: {
      get(): string {
        return this.commentForm;
      },
      set(value: string) {
        this.updateForm(value);
      },
    },
    placeholder() {
      switch (this.mode) {
        case Mode.Edit:
          return "Edit your comment";
        case Mode.Reply:
          return `Reply to ${
            (this.activeComment as unknown as Comment).user.username
          }`;
        default:
          return "Enter a comment";
      }
    },
  },
  methods: {
    ...mapActions(["updateForm", "submitForm"]),
  },
  props: {
    user: {
      type: Object as PropType<User>,
      required: true,
    },
  },
});
</script>

<template>
  <Container>
    <template #header>
      <Avatar
        :username="user.username"
        :is-online="user.isOnline"
        :image-url="user.avatar"
        :handle="user.handle"
        :title="user.title"
      />
    </template>
    <template #content>
      <textarea
        v-model="value"
        class="form"
        :placeholder="placeholder"
      ></textarea>
      <Button @click="submitForm">Send</Button>
    </template>
  </Container>
</template>

<style scoped lang="scss">
.form {
  height: 100px;
  width: 100%;
  border: 1px solid #d0d5dd;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  color: #667085;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
}
</style>
