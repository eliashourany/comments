import { createStore } from "vuex";
import { Comment } from "@/types";
import {
  deleteCommentById,
  findComment,
  updateCommentById,
} from "@/utils/commentsUtil";

export default createStore({
  state: {
    comments: [] as Comment[],
    loading: false,
    error: null as string | null,
    user: {
      avatar: null as string | null,
      username: null as string | null,
    },
    upvotes: [] as number[],
    downvotes: [] as number[],
  },
  getters: {},
  mutations: {
    SET_USER(state, user: { avatar: string | null; username: string }) {
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
  },
  actions: {
    async fetchData({ commit }) {
      try {
        commit("SET_LOADING", true);
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
  },
  modules: {},
});
