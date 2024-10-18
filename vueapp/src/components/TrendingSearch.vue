<template>
  <div class="trend-container">
    <img src="@/assets/magnifying.svg">
    <div class="trend">
      <div id="trend-text">mark wahlberg</div>
      <div id="likes">6 likes</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TrendingSearch',
  data() {
    return {};
  }
}
</script>

<style>
.trend-container {
  padding: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px
}

.trend-container img {
  width: 10px;
}

.trend {
  margin-top: 20px;
  gap: 5px;
}

#trend-text {
  font-weight: bold;
  font-size: 18px;
}

#likes {
  color: grey;
}
</style>