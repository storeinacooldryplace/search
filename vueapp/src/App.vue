<template>
  <div id="app-container">
    <LeftSidebar @changePage="currentPage = $event" />

    <main id="main-content">
      <div v-if="currentPage === 'home'">
        <header id="timeline-header">
          <span @click="toggleView('top')" :class="{ active: currentView === 'top' }">Top</span>
          <span @click="toggleView('recent')" :class="{ active: currentView === 'recent' }">Recent</span>
        </header>

        <TimelineComponent v-if="history.every(entry => entry.postId !== '0')" class="timeline" :history="history" />
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
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import LeftSidebar from './components/LeftSidebar.vue';
import RightSidebar from './components/RightSidebar.vue';

const APIURL = "http://165.227.86.130:1000/api"

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
  mounted() {
    this.fetchData(); // Fetch API data on component mount
  },
  methods: {
    async fetchData() {
      try {
        const response = await fetch(APIURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const updatedData = []; // Array to store updated data

        for (const d of data) {
          // Check if a document with this postId already exists in Firebase
          const postRef = doc(db, 'posts', d.postId || '0');
          const docSnap = await getDoc(postRef);

          if (!docSnap.exists()) {
            const newDocData = {
              title: d.title,
              url: d.url,
              date: d.date,
              emojiReactions: {
                heart: 0,
                question: 0,
                surprise: 0,
              },
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            try {
              const docRef = await addDoc(collection(db, 'posts'), newDocData);
              console.log('Document written with ID: ', docRef.id);
              d.postId = docRef.id; // Assign the ID to the local data
            } catch (error) {
              console.error('Error adding document: ', error);
            }
          } else {
            d.postId = docSnap.id; // Use the existing document ID
          }

          updatedData.push(d); // Push the updated data to the array
        }

        this.history = updatedData; // Update the local state once
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
