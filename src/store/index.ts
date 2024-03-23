import { createStore } from "vuex";
import { Comment } from "@/types";

export default createStore({
  state: {
    comments: [] as Comment[],
    loading: false,
    error: null as string | null,
  },
  getters: {},
  mutations: {
    SET_COMMENTS(state, comments: Comment[]) {
      state.comments = comments;
    },
    SET_LOADING(state, status: boolean) {
      state.loading = status;
    },
    SET_ERROR(state, error: string) {
      state.error = error;
    },
  },
  actions: {
    async fetchComments({ commit }) {
      try {
        commit("SET_LOADING", true);
        const response = await fetch("/data.json");
        const comments = await response.json();
        commit("SET_COMMENTS", comments);
      } catch (error: any) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  modules: {},
});
