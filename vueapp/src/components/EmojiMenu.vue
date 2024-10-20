<template>
  <div class="emoji-container">
    <div class="emoji-icons">
      <EmojiItem v-for="(icon, index) in icons" :key="index" :icon="icon.src" :count="icon.count"
        :hoverColor="icon.hoverColor" @toggleCount="toggleCount(index)" />
    </div>
  </div>
</template>

<script>
import EmojiItem from './EmojiItem.vue';

export default {
  components: {
    EmojiItem,
  },
  data() {
    return {
      icons: [
        { src: require('@/assets/empty-heart.svg'), count: 0, hoverColor: 'rgba(255, 0, 0, 0.3)' }, // Replace with your icon file paths
        { src: require('@/assets/question.png'), count: 0, hoverColor: 'rgba(0, 255, 0, 0.3)' },
        { src: require('@/assets/exclamation.png'), count: 0, hoverColor: 'rgba(0, 0, 255, 0.3)' }],
    };
  },
  methods: {
    toggleCount(index) {
      this.icons[index].count = this.icons[index].count === 0 ? 1 : 0;
    },
  },
};
</script>

<style>
.emoji-container {
  display: flex;
  padding: 10px;
}

.emoji-icons {
  display: flex;
  gap: 10px;
  /* Space between icons */
}

.emoji-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.emoji-icon:hover {
  background-color: rgba(100, 100, 255, 0.2);
  border-radius: 50%;
}

.icon {
  width: 15px;
  /* Adjust size as needed */
  height: 15px;
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
}
</style>
