<template>
  <div class="user-stats">
    <span class="stat"> 2 hours since last search </span>
    <span class="stat"> 2.6k visitors</span>
    <span class="stat"> 33 followers</span>

  </div>
</template>

<script>
export default {
  name: 'UserDisplay',
  data() {
    return {};
  }
}
</script>

<style>
.user-stats {
  display: flex;
  gap: 10px;
  /* Space between the two stats */
  font-size: 16px;
  /* Adjust the font size as needed */
  position: absolute;
  right: 20px
}

.stat {
  color: #333;
  font-weight: bold;
}
</style>