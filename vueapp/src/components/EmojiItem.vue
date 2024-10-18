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
.emoji-item {
  cursor: pointer;
}


</style>
