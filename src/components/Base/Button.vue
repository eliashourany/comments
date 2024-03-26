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
  emits: ["onClick"],
  methods: {
    onClick(event: MouseEvent) {
      this.$emit("onClick", event);
    },
  },
});
</script>

<template>
  <button
    @click.stop="onClick"
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
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
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
    background-color: clr(primary);
  }

  &--primary:not(&--outlined):hover {
    background-color: clr(primary, light);
  }

  &--primary#{&}--outlined {
    color: clr(primary);
  }

  &--secondary:not(&--outlined) {
    background-color: clr(error);
  }

  &--secondary:not(&--outlined):hover {
    background-color: clr(error, light);
  }

  &--secondary#{&}--outlined {
    color: clr(error);
  }
}
</style>
