<template>
  <img id="title-logo" src="./assets/searchhistorybanner.png">

  <nav class="nav">
    <a href="#" v-if="currentPage === 'home'" @click.prevent="currentPage = 'about'">Info</a>
    <a href="#" v-else @click.prevent="currentPage = 'home'">Back</a>
  </nav>

  <!-- <div id="user-display">
    <h1 id="username">Justine Jung</h1>
    <UserDisplay class="userinfo" />
  </div> -->

  <div v-if="currentPage === 'home'">
    <div id="app">
      <TimelineComponent class="timeline" :history="history" />
    </div>
  </div>

  <div v-else-if="currentPage === 'about'">
    <AboutPage />
  </div>
</template>

<script>
import TimelineComponent from './components/TimelineComponent.vue';

import UserDisplay from './components/UserDisplay.vue';

import AboutPage from './components/AboutPage.vue';

export default {
  name: 'App',
  components: {
    TimelineComponent,
    UserDisplay,
    AboutPage
  },
  data() {
    return {
      history: [],
      currentPage: 'home',
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
  margin-top: 600px
}

#title-logo {
  display: block;
  /* Make the image a block element */
  width: 1200px;
  /* Your specified width */
  height: auto;
  /* Maintain aspect ratio */
  margin: 0 auto;
  /* Center the image horizontally */
  position: fixed;
  /* Fix the logo to the viewport */
  top: 0;
  /* Aligns it to the top of the viewport */
  left: 50%;
  /* Position it to the middle of the viewport */
  transform: translateX(-50%);
  /* Offset to center it */
  z-index: 0;
  /* Ensure it stays above other content */
}

#username {
  position: absolute;
  top: 0px;
  right: 20px;
  font-size: 100px
}

.nav {
  position: absolute;
  right: 5px;
  top: 5px;
  font-size: 40px;
}
</style>
