<template>
  <div id="app-container">
    <LeftSidebar @changePage="currentPage = $event" />

    <main id="main-content">
      <div v-if="currentPage === 'home'">
        <header id="timeline-header">
          <span @click="toggleView('top')" :class="{ active: currentView === 'top' }">For you</span>
          <span @click="toggleView('recent')" :class="{ active: currentView === 'recent' }">Following</span>
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
import { doc, setDoc, getDoc } from 'firebase/firestore';
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
        const response = await fetch(APIURL); // Fetch data from the API
        const data = await response.json(); // Parse the JSON response
        const updatedData = []; // Array to store updated data
        // Flag to check if a document exists


        for (const d of data) {
          // Use d.visitItem.id as the unique ID for Firestore documents
          if (!d.visitItem || !d.visitItem[0] || !d.visitItem[0].id) {
            console.error(`Missing visitItem[0] or visitItem[0].id for entry:`, d);
            continue; // Skip this entry if visitItem[0] or id is missing
          }

          // Clean up the title by removing " - Google Search"
          const cleanedTitle = d.title.replace(' - Google Search', '');
          let postId = d.visitItem[0].id; // Use visitItem[0].id as the doc ID
          d.postId = postId;
          d.title = cleanedTitle;
          d.visitTime = d.visitItem[0].visitTime;

          updatedData.push(d); // Push the updated object to the updatedData array

        }
        for (const d of data) {
          const cleanedTitle = d.title.replace(' - Google Search', '');
          let postId = d.visitItem[0].id;
          // **Only check Firebase documents until we find one that exists**

          const postRef = doc(db, 'posts', postId);
          const docSnap = await getDoc(postRef); // Check if the document already exists

          if (!docSnap.exists()) {
            // If the document doesn't exist, create it using setDoc
            const newDocData = {
              title: cleanedTitle,
              url: d.url,
              date: d.date,
              visitTime: d.visitItem[0].visitTime,
              postId: postId,
              createdAt: new Date(),
              updatedAt: new Date(),
              emojiReactions: {
                heart: 0,
                question: 0,
                surprise: 0,
              },
            };

            // Set the document with the unique visitItem.id
            await setDoc(postRef, newDocData);
            console.log(`Document created with ID: `, postId);
          } else {
            // Document already exists, mark that we found a document and break the loop
            console.log('Document already exists with ID: ', postId);
            break; // Exit early since the remaining items should already exist
          }

        }

        // **Update the local state for ALL data** (whether or not the Firebase check ran fully)
        this.history = updatedData;

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
@font-face {
  font-family: 'Mukta';
  src: url('@/assets/fonts/Mukta-Regular.ttf') format('truetype');
}

/* Your existing styles remain unchanged */
#app-container {
  display: grid;
  grid-template-columns: 20% 50% 30%;
  grid-template-areas: "left-sidebar main-content right-sidebar";
  height: 100vh;
  font-family: 'Inter';
  margin: 0 auto;
  max-width: 1200px;
}

#main-content {}

#timeline-header {
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #f7f6f6;
  font-size: 12px;
  align-items: center;
  gap: 20%;
  font-family: 'Mukta';
}

#timeline-header span {
  cursor: pointer;
  color: grey;
  padding-left: 10px;
  padding-right: 10px;
  /* Adjust this value as needed to shift the text up */
  position: relative;
  /* Necessary for the ::before pseudo-element */
  line-height: 1.2;
  /* Adjust to control text spacing */
}

#timeline-header span.active {
  color: black;
}

#timeline-header span.active::before {
  content: '';
  display: block;
  height: 3px;
  background-color: rgb(23, 170, 20);
  width: 100px;
  /* Width of the highlight bar */
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  /* Centers the highlight bar relative to the text */
  border-radius: 5px;
}

#timeline-header span:hover {
  background-color: rgba(198, 197, 197, 0.1);
  border-radius: 50px;
}
</style>
