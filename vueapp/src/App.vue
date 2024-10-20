<template>
  <div id="app-container">

    <aside id="left-sidebar">
      <img id="title-logo" src="./assets/search-logo.png">
      <div class="icon-container">
        <div class="icon-link" @click.prevent="currentPage = 'home'">
          <img src="./assets/home-icon.svg" alt="Home" />
          <span class="icon-label">Home</span>
        </div>
        <div class="icon-link" @click.prevent="currentPage = 'about'">
          <img src="./assets/profile.webp" alt="Info" />
          <span class="icon-label">Info</span>
        </div>
      </div>
    </aside>

    <main id="main-content">

      <div v-if="currentPage === 'home'">
        <header id="timeline-header">
          <span @click="toggleView('top')" :class="{ active: currentView === 'top' }">Top</span>

          <span @click="toggleView('recent')" :class="{ active: currentView === 'recent' }">Recent</span>

        </header>


        <TimelineComponent class="timeline" :history="history" />

      </div>

      <div v-else-if="currentPage === 'about'">
        <AboutPage />
      </div>
    </main>

    <!-- Right sidebar -->
    <aside id="right-sidebar">
      <div id="trending-searches">
        <TrendingSearches />
      </div>
      <div id="user-display">
        <UserDisplay />
      </div>
    </aside>
  </div>
</template>

<script>
import TimelineComponent from './components/TimelineComponent.vue';

import UserDisplay from './components/UserDisplay.vue';

import AboutPage from './components/AboutPage.vue';

import TrendingSearches from './components/TrendingSearches.vue'

export default {
  name: 'App',
  components: {
    TimelineComponent,
    UserDisplay,
    AboutPage,
    TrendingSearches
  },
  data() {
    return {
      history: [],
      currentPage: 'home',
      currentView: 'recent'
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
    toggleView(view) {
      this.currentView = view;
    },
  },
};
</script>

<style>
#app-container {
  display: grid;
  grid-template-columns: 200px 800px 400px;
  /* Left Sidebar | Main Content | Right Sidebar */
  grid-template-areas:
    "left-sidebar main-content right-sidebar";
  height: 100vh;
  font-family: 'Inter';
  margin: 0 auto;
  max-width: 1200px;
}

#title-logo {
  display: block;
  width: 100px;
  height: auto;

}

#left-sidebar {
  grid-area: left-sidebar;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  border-right: 0.5px solid #e6e5e5;
}

.icon-container {
  flex-direction: column;
  display: flex;
  margin-top: 90px;
  gap: 10px;
  margin-right: 15px;
  align-items: flex-start;
}

.icon-container img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

#right-sidebar {
  grid-area: right-sidebar;
  padding: 20px;
  border-left: 0.5px solid #e6e5e5;
  /* Border to separate from main content */
  display: flex;
  /* Flexbox for layout */
  flex-direction: column;
  /* Stack items vertically */
  gap: 30px;
  /* Space between items */
}

#right-sidebar>div {
  min-height: 50px;
  /* Ensures a minimum height for each item */
}

#user-display {
  background-color: rgb(238, 237, 235);
  /* Background color for visibility */
}

.icon-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 50px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  gap: 10px;
  height: auto;
  padding: 10px 15px;
  border-radius: 30px;
}

.icon-link:hover {
  background-color: rgba(128, 128, 128, 0.2);
  border-radius: 30px;
}

.icon-label {
  display: inline-block;
}

/* On larger screens, show the text and adjust hover effect */

#main-content {
  /* Optional: set a max-width for main content */
  /* Center main content within its grid area */
}

#timeline-header {
  display: flex;
  justify-content: center;
  gap: 220px;
  /* Evenly space the links */
  padding: 50px 0 0 0;
  /* Add padding for visual spacing */
  border-bottom: 1px solid #f7f6f6;
  /* Optional: Add a bottom border */
  font-size: 20px;
}

#timeline-header span {
  cursor: pointer;
  color: grey;
  font-size: 30px;
}

#timeline-header span.active {
  color: black;
  /* Color for the selected view */

  /* Optionally make it bold */
}

#timeline-header span.active::after {
  content: '';
  display: block;
  height: 7px;
  background-color: rgb(23, 170, 20);
  bottom: -20px;
  border-radius: 5px;
}

#timeline-header span:hover {
  background-color: rgba(128, 128, 128, 0.1);
  border-radius: 80%;
  /* Light grey highlight on hover */
}
</style>
