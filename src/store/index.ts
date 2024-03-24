import { createStore } from "vuex";
import { Comment } from "@/types";

export default createStore({
  state: {
    comments: [] as Comment[],
    loading: false,
    error: null as string | null,
    user: {
      avatar: null as string | null,
      username: null as string | null,
    },
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
  },
  actions: {
    async fetchData({ commit }) {
      try {
        commit("SET_LOADING", true);
        const response = await fetch("/data.json");
        const data = await response.json();
        commit("SET_COMMENTS", data.comments);
        commit("SET_USER", data.user);
      } catch (error: any) {
        commit("SET_ERROR", error.message);
      } finally {
        commit("SET_LOADING", false);
      }
    },
  },
  modules: {},
});
