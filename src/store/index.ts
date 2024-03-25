import { createStore } from "vuex";
import { Comment, Mode, User } from "@/types";
import {
  deleteCommentById,
  findComment,
  generateComment,
  updateCommentById,
} from "@/utils/commentsUtil";
import { persistPlugin } from "@/store/plugins";

export default createStore({
  state: {
    comments: [] as Comment[],
    loading: false,
    error: null as string | null,
    user: {
      avatar: "",
      username: "",
      title: "",
      handle: "",
      isOnline: false,
    },
    upvotes: [] as number[],
    downvotes: [] as number[],
    mode: Mode.New as Mode,
    activeComment: null as Comment | null | undefined,
    commentForm: "",
  },
  getters: {},
  mutations: {
    SET_USER(state, user: User) {
      state.user = user;
    },
    SET_COMMENTS(state, comments: Comment[]) {
      state.comments = comments;
    },
    SET_LOADING(state, status: boolean) {
      state.loading = status;
    },
    SET_ERROR(state, error: string) {
      state.error = error;
    },
    SET_UPVOTES(state, upvotes: number[]) {
      state.upvotes = upvotes;
    },
    SET_DOWNVOTES(state, downvotes: number[]) {
      state.downvotes = downvotes;
    },
    SET_MODE(state, mode: Mode) {
      state.mode = mode;
    },
    SET_ACTIVE_COMMENT(state, comment: Comment) {
      state.activeComment = comment;
    },
    SET_FORM(state, value: string) {
      state.commentForm = value;
    },
  },
  actions: {
    async fetchData({ commit, state }) {
      try {
        commit("SET_LOADING", true);

        if (
          state.comments.length > 0 ||
          state.upvotes.length > 0 ||
          state.downvotes.length > 0
        ) {
          return;
        }

        const response = await fetch("/data.json");
        const data = await response.json();
        commit("SET_COMMENTS", data.comments);
        commit("SET_USER", data.user);
        commit("SET_UPVOTES", data.upvotes);
        commit("SET_DOWNVOTES", data.downvotes);
      } catch (error: any) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
    vote(
      { commit, state },
      { commentId, isUpvote }: { commentId: number; isUpvote: boolean }
    ) {
      let votes = isUpvote ? state.upvotes : state.downvotes;
      let otherVotes = isUpvote ? state.downvotes : state.upvotes;
      const comment = findComment(state.comments, commentId);

      if (comment) {
        const adjustment = isUpvote ? 1 : -1;

        if (votes.includes(commentId)) {
          votes = votes.filter((id) => id !== commentId);
          comment.score -= adjustment;
        } else {
          if (otherVotes.includes(commentId)) {
            otherVotes = otherVotes.filter((id) => id !== commentId);
            comment.score += adjustment * 2;
          } else {
            comment.score += adjustment;
          }
          votes = [...votes, commentId];
        }

        commit("SET_COMMENTS", state.comments);
        commit(isUpvote ? "SET_UPVOTES" : "SET_DOWNVOTES", votes);
        commit(isUpvote ? "SET_DOWNVOTES" : "SET_UPVOTES", otherVotes);
      }
    },
    deleteComment({ commit, state }, commentId: number) {
      const deleted = deleteCommentById(state.comments, commentId);
      if (deleted) {
        commit("SET_COMMENTS", state.comments);
      }
    },
    setModeAndComment(
      { commit },
      { comment, mode }: { comment: Comment | null; mode: Mode }
    ) {
      commit("SET_MODE", mode);
      commit("SET_ACTIVE_COMMENT", comment);
      if (mode === Mode.Edit && comment) {
        commit("SET_FORM", comment.content);
      } else {
        commit("SET_FORM", "");
      }
    },
    updateForm({ commit }, value: string) {
      commit("SET_FORM", value);
    },
    submitForm({ commit, state, dispatch }) {
      const { mode, activeComment, commentForm, comments, user } = state;

      if (!commentForm.length) {
        return false;
      }

      const newComment = generateComment(commentForm, user);

      if (mode === Mode.Edit && activeComment) {
        updateCommentById(comments, activeComment.id, { content: commentForm });
      } else if (mode === Mode.Reply && activeComment) {
        const replyToComment = findComment(comments, activeComment.id);
        if (replyToComment) {
          replyToComment.replies.push(newComment);
        }
      } else {
        comments.push(newComment);
      }

      commit("SET_COMMENTS", comments);
      commit("SET_FORM", "");
      dispatch("setModeAndComment", { mode: Mode.New, comment: null });
      return true;
    },
  },
  modules: {},
  plugins: [persistPlugin],
});
