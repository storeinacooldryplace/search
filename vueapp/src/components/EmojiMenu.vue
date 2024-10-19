<template>
  <div class="emoji-container" @mouseover="showMenu = true" @mouseleave="showMenu = false">
    <img id="trigger" src="@/assets/magnifying.svg" />
    <div class="emoji-trigger" @click="toggleMenu">


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
        { symbol: '😢', count: 0 },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    toggleCount(index) {
      this.emojis[index].count = this.emojis[index].count === 0 ? 1 : 0;
    },
  },
};
</script>

<style>
.emoji-container {
  position: relative;
  padding: 10px;
}

#trigger {
  width: 20px;
  /* Adjust size as needed */
  height: 20px;
  /* Adjust size as needed */
  cursor: pointer;
  filter: brightness(2%)
}

.emoji-menu {
  display: flex;
  flex-direction: row;
  position: absolute;
  transform: translateX(-50%);
  background-color: #f2f1f1;
  align-items: center;
  padding: 10px;
  padding-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  gap: 10px;
  font-family: 'Helvetica';
}

.menu-icons .symbol {
  cursor: pointer;
  display: flex;
}
</style>
