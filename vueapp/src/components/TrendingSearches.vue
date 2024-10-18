<template>
  <div class="trending-container">
    <h1>Trending Searches</h1>
    <TrendingSearch />
    <TrendingSearch />
  </div>
</template>

<script>
import TrendingSearch from './TrendingSearch.vue'

export default {
  name: 'TrendingSearches',
  components: {
    TrendingSearch,
  },
  data() {
    return {};
  }
}
</script>

<style>
.trending-container {
  margin: 10px;
  margin-top: 20px;
  gap: 0px
}

.trending-container h1 {
  font-size: 30px;
  font-weight: normal;
  color: grey
}
</style>