<script lang="ts">
import { defineComponent, PropType } from "vue";

export enum BadgeTheme {
  info = "info",
  success = "success",
}

export default defineComponent({
  name: "Badge",
  props: {
    customClass: {
      type: String,
      default: "",
    },
    theme: {
      type: String as PropType<BadgeTheme>,
      default: BadgeTheme.info,
    },
  },
});
</script>

<template>
  <span :class="['badge', customClass, `badge--${theme}`]">
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.badge {
  font-size: 0.75rem;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  padding: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;

  &--info {
    color: #344054;
    background: #f2f4f7;
  }

  &--success {
    color: #027a48;
    background: #ecfdf3;
  }
}
</style>
