<template>
  <div id="app-container">
    <aside id="left-sidebar">
      <img id="title-logo" src="./assets/search-logo.png" />
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

        <TimelineComponent class="timeline" :history="mergedHistory" @vote="handleVote" />
      </div>

      <div v-else-if="currentPage === 'about'">
        <AboutPage />
      </div>
    </main>

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
import TrendingSearches from './components/TrendingSearches.vue';
import { db } from '@/firebase'; // Import your Firebase configuration
import { setDoc, increment, doc, getDoc } from 'firebase/firestore';

export default {
  name: 'App',
  components: {
    TimelineComponent,
    UserDisplay,
    AboutPage,
    TrendingSearches,
  },
  data() {
    return {
      history: [],
      currentPage: 'home',
      currentView: 'recent',
    };
  },
  computed: {
    mergedHistory() {
      return this.history.map(entry => ({
        ...entry,
        voteCount: entry.voteCount || 0 // Default vote count to 0
      }));
    },
  },
  mounted() {
    this.fetchData(); // Fetch API data on component mount
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch('http://165.227.86.130:1000/api'); // Replace with your API endpoint
        const data = await response.json();
        this.history = data; // Assign data to history
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },

    toggleView(view) {
      this.currentView = view;
    },

    async handleVote(entryId) {
      // Get the current vote count for the entry from Firestore
      const entryRef = doc(db, 'entries', entryId);
      const entrySnapshot = await getDoc(entryRef);

      if (entrySnapshot.exists()) {
        // If document exists, increment the vote count
        await setDoc(entryRef, {
          voteCount: increment(1) // Increment vote count
        }, { merge: true });
      } else {
        // If document doesn't exist, create it with an initial vote count of 1
        await setDoc(entryRef, {
          voteCount: 1 // Set initial vote count
        });
      }

      // Update local state for immediate feedback
      const entry = this.history.find(e => e.id === entryId);
      if (entry) {
        entry.voteCount = entry.voteCount ? entry.voteCount + 1 : 1; // Update local vote count
      }
    },
  },
};
</script>

<style>
/* Your existing styles remain unchanged */
#app-container {
  display: grid;
  grid-template-columns: 200px 800px 400px;
  grid-template-areas: "left-sidebar main-content right-sidebar";
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

.icon-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  height: 50px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  gap: 10px;
  padding: 10px 15px;
}

.icon-link:hover {
  background-color: rgba(128, 128, 128, 0.2);
}

.icon-label {
  display: inline-block;
}

#main-content {}

#timeline-header {
  display: flex;
  justify-content: center;
  gap: 220px;
  padding: 50px 0 0 0;
  border-bottom: 1px solid #f7f6f6;
  font-size: 20px;
}

#timeline-header span {
  cursor: pointer;
  color: grey;
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
}

#timeline-header span.active {
  color: black;
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
  background-color: rgba(198, 197, 197, 0.1);
}
</style>
