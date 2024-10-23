<template>
  <div class="trend-container">
    <img src="@/assets/magnifying.svg">
    <div class="trend">
      <div id="trend-text">{{ title }}</div>
      <div id="likes">{{ totalReactions }} reactions</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'TrendingSearch',
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    totalReactions: {
      type: Number,
      required: true,
    },
  },
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
  gap: 10px;
}

.trend-container img {
  width: 10px;
}

.trend {
  margin-top: 20px;
  gap: 15px;
}

#trend-text {
  font-weight: bold;
  font-size: 18px;
}

#likes {
  color: grey;
}
</style>