<template>
  <aside id="right-sidebar">
    <div id="trending-searches">
      <TrendingSearches />
    </div>
    <div id="user-display">
      <UserDisplay />
    </div>
  </aside>
</template>

<script>
import TrendingSearches from './TrendingSearches.vue';
import UserDisplay from './UserDisplay.vue';

export default {
  name: 'RightSidebar',
  components: {
    TrendingSearches,
    UserDisplay,
  },
};
</script>

<style scoped>
/* Right Sidebar styles */
#right-sidebar {
  padding: 20px;
  border-left: 0.5px solid #e6e5e5;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

#right-sidebar>div {
  min-height: 50px;
}

#user-display {
  background-color: rgb(238, 237, 235);
}

/* other styles */
</style>
