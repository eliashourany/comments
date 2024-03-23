<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapMutations, mapState } from "vuex";
import CommentList from "@/components/CommentList.vue";
import CommentForm from "@/components/CommentForm.vue";
export default defineComponent({
  name: "CommentsView",
  components: { CommentList, CommentForm },
  computed: {
    ...mapState(["comments", "loading", "error"]),
  },
  methods: {
    ...mapMutations(["addComment"]),
    ...mapActions(["fetchComments"]),
  },
  mounted() {
    this.fetchComments();
  },
});
</script>

<template>
  <comment-list :comments="comments"></comment-list>
  <comment-form></comment-form>
</template>

<style scoped lang="scss"></style>
