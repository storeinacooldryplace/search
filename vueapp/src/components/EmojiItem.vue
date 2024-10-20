<template>
  <div class="emoji-icon" @click="toggleCount" :style="{ backgroundColor: isHovered ? hoverColor : 'transparent' }"
    @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <img :src="icon" class="icon" />
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
  },
  data() {
    return {
      isHovered: false, // Track hover state
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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  border-radius: 50%;
  /* Optional for rounded corners */
}

.icon {
  width: 30px;
  /* Adjust size as needed */
  height: 30px;
  /* Adjust size as needed */
}

.count {
  position: absolute;
  bottom: -15px;
  /* Adjust position as needed */
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  /* Adjust font size as needed */
  color: #333;
  /* Change color as needed */
}</style>
