<template>
  <div class="UserProfile">
    <div class="user-stats">
      <span class="stat"><b>Justine Jung</b></span>
      <span class="stat">@psychobath</span>
      <span class="stat"> <b>2 hours </b> since last search </span>
      <span class="stat"><b>2.6k </b>visitors</span>
      <span class="stat"><b>33</b> followers</span>
    </div>
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
.user-profile {
  background-color: rgb(191, 191, 191);
}

.user-stats {
  display: flex;
  gap: 10px;
  flex-direction: column;
  font-size: 16px;
  right: 20px
}

.stat {
  color: #333;
}
</style>