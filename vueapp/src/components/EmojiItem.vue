<template>
  <div class="emoji-icon">
    <img :src="icon" class="icon" @click="toggleCount"
      :style="{ backgroundColor: voted ? hoverColor : (isHovered ? hoverColor : 'transparent') }"
      @mouseenter="isHovered = true" @mouseleave="isHovered = false" />
    <span class="count">{{ count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    hoverColor: {
      type: String,
      required: true,
    },
    voted: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isHovered: false,
    };
  },
  methods: {
    toggleCount() {
      this.$emit('toggleCount');
    },
  },
};
</script>

<style>
.emoji-icon {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-direction: row;
  cursor: pointer;
  transition: background-color 0.3s;
}

.emoji-icon:hover {}

.icon {
  width: 12px;
  height: 12px;
  padding: 5px;
  border-radius: 50%;
}

.count {
  font-size: 14px;
  color: #717070;
}
</style>
