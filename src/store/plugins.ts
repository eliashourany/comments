import createPersistedState from "vuex-persistedstate";

export const persistPlugin = createPersistedState({
  key: "comments",
  paths: ["comments", "user", "upvotes", "downvotes"],
});
