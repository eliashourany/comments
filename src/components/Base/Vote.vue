<script lang="ts">
import { defineComponent } from "vue";
import UpArrowIcon from "@/assets/icons/upArrow.svg";
import DownArrowIcon from "@/assets/icons/downArrow.svg";

export default defineComponent({
  name: "Vote",
  data() {
    return {
      upArrow: UpArrowIcon,
      downArrow: DownArrowIcon,
    };
  },
  props: {
    score: {
      type: Number,
      default: 0,
    },
    upvoting: { type: Boolean, default: false },
    downvoting: { type: Boolean, default: false },
  },
  emits: ["onUpvote", "onDownvote"],
});
</script>

<template>
  <fieldset class="vote">
    <button
      @click="() => $emit('onUpvote')"
      type="button"
      aria-label="Upvote"
      :class="['vote__up', { 'vote__up--active': upvoting }]"
    >
      <img :src="upArrow" />
    </button>
    <span class="vote__score" aria-live="polite">{{ score }}</span>
    <button
      @click="() => $emit('onDownvote')"
      type="button"
      aria-label="Downvote"
      :class="['vote__down', { 'vote__down--active': downvoting }]"
    >
      <img :src="downArrow" />
    </button>
  </fieldset>
</template>

<style scoped lang="scss">
.vote {
  margin: 0;
  display: flex;
  flex-direction: column;
  padding: 0;
  height: fit-content;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  &__up,
  &__down {
    appearance: none;
    background-color: transparent;
    padding: 0;
    font: inherit;
    cursor: pointer;
    transition: border-color 0.3s ease;
    border: 1px solid transparent;
    img {
      transition: transform 0.2s ease-in-out;
    }

    &--active {
      border: 1px solid #d6bbfb;
    }
  }

  &__up {
    border-radius: 8px 8px 0 0;
  }

  &__down {
    border-radius: 0 0 8px 8px;
  }

  &__up,
  &__down,
  &__score {
    width: 40px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__up:hover {
    img {
      transform: translateY(-5px);
    }
  }

  &__down:hover {
    img {
      transform: translateY(5px);
    }
  }

  &__score {
    border-top: 1px solid #d0d5dd;
    border-bottom: 1px solid #d0d5dd;
  }
}
</style>
