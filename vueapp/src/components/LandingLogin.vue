<template>
  <div id="total-container">

    <div id="left-col">
      <img id="title-logo" src="../assets/bliss.webp" />
    </div>
    <div id="right-col">
      <input>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LandingLogin',
  data() {
    return {
      totalReactions: 0,
    };
  },
  mounted() {
    this.getTotalStats();
  },
  methods: {

  },
};
</script>

<style scoped></style>