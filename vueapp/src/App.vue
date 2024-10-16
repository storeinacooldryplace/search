<template>
  <img id="title-logo" src="./assets/peeple.png">
  <h1 id="username">Justine Jung</h1>
  <div id="user-display">
    <UserDisplay class="userinfo" />
  </div>
  <div id="app">
    <TimelineComponent class="timeline" :history="history" />
  </div>
</template>

<script>
import TimelineComponent from './components/TimelineComponent.vue';

import UserDisplay from './components/UserDisplay.vue';

export default {
  name: 'App',
  components: {
    TimelineComponent,
    UserDisplay
  },
  data() {
    return {
      history: [], // Initialize an empty history array
    };
  },
  mounted() {
    this.fetchData(); // Fetch data on component mount
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://165.227.86.130:1000/api'); // Replace with your API endpoint
        const data = await response.json();
        this.history = data; // Assuming data is directly assigned to history
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  },
};
</script>

<style>
@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/Inter-VariableFont_opsz,wght.ttf') format('opentype');
}

* {
  font-family: 'Inter';
}

.timeline {
  margin-top: 0.5%
}

#title-logo {
  width: 400px;
}

#username {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 100px
}
</style>