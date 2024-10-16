<template>
  <div class="user-stats">
    <span class="stat">@psychobath</span>
    <span class="stat"> <b>2 hours </b> since last search </span>
    <span class="stat"><b>2.6k </b>visitors</span>
    <span class="stat"><b>33</b> followers</span>
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
}
</style>