<script lang="ts">
import { defineComponent, PropType } from "vue";

export enum ButtonTheme {
  primary = "primary",
  secondary = "secondary",
}

export default defineComponent({
  name: "Button",
  props: {
    theme: {
      type: String as PropType<ButtonTheme>,
      default: ButtonTheme.primary,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "",
    },
  },
});
</script>

<template>
  <button
    :class="[
      'button',
      `button--${theme}`,
      { 'button--outlined': outlined },
      customClass,
    ]"
    :disabled="disabled"
    role="button"
    :aria-disabled="disabled"
  >
    <span class="button__ripple"></span>
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  appearance: none;
  border: none;
  padding: 9px 14px;
  font: inherit;
  cursor: pointer;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease-in-out;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--outlined {
    background-color: transparent;

    &:hover {
      background-color: rgba(#667085, 0.3);
    }
  }

  &:not(&--outlined) {
    box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
    color: white;
  }

  &--primary:not(&--outlined) {
    background-color: #7f56d9;
  }

  &--primary#{&}--outlined {
    color: #6941c6;
  }

  &--secondary:not(&--outlined) {
    background-color: #b42318;
  }

  &--secondary#{&}--outlined {
    color: #b42318;
  }

  &__ripple {
  }
}
</style>
