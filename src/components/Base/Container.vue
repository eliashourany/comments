<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Container",
  props: {
    classes: {
      type: Object as PropType<{
        container?: string;
        header?: string;
        content?: string;
      }>,
      default: () => ({}),
    },
    collapsable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    collapse() {
      if (this.collapsable) {
        this.collapsed = !this.collapsed;
        this.$emit("onCollapse", this.collapsed);
      }
    },
  },
  emits: ["onCollapse"],
});
</script>

<template>
  <div
    :class="[
      'container',
      classes.container,
      { 'container--collapsed': collapsed },
    ]"
  >
    <div
      :class="[
        'container__header',
        classes.header,
        { 'container__header--collapsable': collapsable },
      ]"
      @click="collapse"
    >
      <slot name="header"></slot>
    </div>
    <transition name="collapse">
      <div
        v-if="!collapsed || !collapsable"
        :class="['container__content', classes.content]"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.container {
  background-color: white;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: border-color 0.3s ease;
  border: 1px solid transparent;

  &--collapsed {
    border-color: #d6bbfb;
  }

  &__header,
  &__content {
    padding: 16px;
    overflow: auto;
  }

  &__header {
    border-bottom: 1px solid #eaecf0;
    display: flex;
    align-items: center;
    gap: 16px;

    &--collapsable {
      cursor: pointer;
    }
  }

  &__content {
  }
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 1000px;
  padding: 16px;
  overflow: hidden;
}

.collapse-leave-active,
.collapse-enter-active {
  transition: all 0.4s ease;
}

.collapse-move {
  transition: all 0.3s ease;
}
</style>
