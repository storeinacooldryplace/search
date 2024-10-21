<template>
  <div id="app-container">
    <LeftSidebar @changePage="currentPage = $event" />

    <main id="main-content">
      <div v-if="currentPage === 'home'">
        <header id="timeline-header">
          <span @click="toggleView('top')" :class="{ active: currentView === 'top' }">Top</span>
          <span @click="toggleView('recent')" :class="{ active: currentView === 'recent' }">Recent</span>
        </header>

        <TimelineComponent class="timeline" :history="mergedHistory" />
      </div>

      <div v-else-if="currentPage === 'about'">
        <AboutPage />
      </div>
    </main>

    <RightSidebar />
  </div>
</template>

<script>
import TimelineComponent from './components/TimelineComponent.vue';
import AboutPage from './components/AboutPage.vue';
import { db } from '@/firebase'; // Import your Firebase configuration
import { addDoc, doc, getDoc, collection } from 'firebase/firestore';
import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';

export default {
  name: 'App',
  components: {
    TimelineComponent,
    LeftSidebar,
    RightSidebar,
    AboutPage,
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
        ...entry // Default vote count to 0
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

        for (const entry of data) {
          const postRef = doc(db, 'posts', entry.postId); // Using postId for Firestore document reference

          const docSnap = await getDoc(postRef); // Check if the document exists

          if (!docSnap.exists()) {
            const newDocData = {
              emojiReactions: {
                heart: 0,
                question: 0,
                surprise: 0,
              },
              content: entry.content, // Assuming 'entry.content' is what you want to store
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            // Create a new document and get the generated postId
            const docRef = await addDoc(collection(db, 'posts'), newDocData);
            entry.postId = docRef.id; // Store the ID of the newly created document in the entry
          }
        }

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
  border-radius: 50px;
}
</style>
