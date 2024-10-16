<template>
  <div class="emoji-container" @mouseover="showMenu = true" @mouseleave="showMenu = false">
    <img id="face" src="@/assets/react.png" />
    <div class="emoji-trigger" @click="toggleMenu">
      <!-- Trigger emoji -->
    </div>
    <div v-if="showMenu" class="emoji-menu">
      <EmojiItem v-for="(emoji, index) in emojis" :key="index" :emoji="emoji.symbol" :count="emoji.count"
        @toggleCount="toggleCount(index)" />
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
      showMenu: false,
      emojis: [
        { symbol: '🤍', count: 0 }, // Example emojis
        { symbol: '❓', count: 0 },
        { symbol: '❗', count: 0 },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleCount(index) {
      this.emojis[index].count++;
    },
  },
};
</script>

<style>
.emoji-container {
  position: relative;
}

#face {
  width: 25px;
  /* Adjust size as needed */
  height: 25px;
  /* Adjust size as needed */
  cursor: pointer;
  /* Show pointer on hover */
}

.emoji-menu {
  display: flex;
  flex-direction: row;
  position: absolute;
  /* Distance from the main circle icon */

  /* Center the menu horizontally */
  transform: translateX(-50%);
  /* Center align based on left position */
  background-color: #f2f1f1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.menu-icons .symbol {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
