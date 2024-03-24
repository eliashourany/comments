<script lang="ts">
import { defineComponent } from "vue";
import UserIcon from "@/assets/icons/user.svg";
export default defineComponent({
  name: "Avatar",
  data() {
    return {
      userIcon: UserIcon,
    };
  },
  props: {
    imageUrl: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
});
</script>

<template>
  <div class="container">
    <figure class="avatar" :aria-labelledby="username">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="username + ' avatar'"
        class="avatar__image"
      />
      <div v-else class="avatar__default" aria-hidden="true">
        <img :src="userIcon" class="avatar__default-image" />
      </div>
      <span v-if="isOnline" class="avatar__status" aria-label="Online"></span>
    </figure>
    <figcaption :id="username" class="caption">
      {{ username }}
    </figcaption>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: inline-flex;
  gap: 15px;
  align-items: center;
}

.avatar {
  position: relative;
  color: #344054;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  &__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: #4caf50; /* Online status color */
    border-radius: 50%;
  }

  &__default {
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9f5ff;
  }
}

.caption {
  font-weight: 500;
  font-size: 16px;
}
</style>
