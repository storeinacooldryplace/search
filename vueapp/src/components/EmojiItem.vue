<template>
  <div class="emoji-item" @click="toggleCount">
    <span>{{ emoji }}</span>
    <span v-if="countVisible">{{ count }}</span>
  </div>
</template>

<script>
export default {
  props: {
    emoji: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      countVisible: false,
    };
  },
  methods: {
    toggleCount() {
      this.countVisible = !this.countVisible; // Toggle visibility of the count
      this.$emit('toggleCount'); // Emit event to update count in EmojiMenu
    },
  },
};
</script>

<style>
.emoji-container {
  display: flex;
  /* Align emojis horizontally */
  position: relative;
  /* Allow absolute positioning of emoji menu */
}

.emoji-trigger {
  margin-right: 20px;
  /* Space between emoji triggers */
  cursor: pointer;
  /* Change cursor to pointer */
  font-size: 24px;
  /* Adjust font size of emojis */
}

.emoji-menu {
  display: flex;
  /* Horizontal layout for emoji menu */
  position: absolute;
  /* Position relative to emoji trigger */
  top: 30px;
  /* Distance from the main emoji */
  left: 50%;
  /* Center the menu horizontally */
  transform: translateX(-50%);
  /* Center align based on left position */
  background-color: #f2f1f1;
  /* Background color of the menu */
  padding: 15px;
  /* Ample padding inside the menu */
  border-radius: 5px;
  /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  /* Shadow effect */
  z-index: 1000;
  /* Ensure menu appears above other elements */
}

.menu-icons .symbol {
  margin: 0 15px;
  /* Space between symbols */
  cursor: pointer;
  /* Change cursor to pointer */
  display: flex;
  /* Align items in a row */
  align-items: center;
  /* Vertically center items */
  padding: 10px;
  /* Padding around each symbol */
}

.symbol-text {
  margin-left: 10px;
  /* Space between icon and text */
  font-size: 16px;
  /* Font size for counts */
}

.symbol.active {
  color: red;
  /* Change color when active */
}

.likes-count,
.exclaims-count {
  margin-left: 10px;
  /* Space between icon and count text */
  font-size: 14px;
  /* Font size for count texts */
  color: #555;
  /* Color for count texts */
}</style>
