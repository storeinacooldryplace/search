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
<<<<<<< HEAD
import { doc, setDoc, getDoc } from 'firebase/firestore';
=======
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
>>>>>>> light-ux-improv
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

        for (const d of data) {
          // Use d.visitItem.id as the unique ID for Firestore documents
<<<<<<< HEAD



=======
>>>>>>> light-ux-improv
          if (!d.visitItem || !d.visitItem[0] || !d.visitItem[0].id) {
            console.error(`Missing visitItem[0] or visitItem[0].id for entry:`, d);
            continue; // Skip this entry if visitItem[0] or id is missing
          }

<<<<<<< HEAD
          console.log("here's the unique ID: ", d.visitItem[0].id)

          let postId = d.visitItem[0].id; // Use visitItem[0].id as the doc ID
          let visitTime = d.visitItem[0].visitTime;
          console.log(postId)
          const postRef = doc(db, 'posts', postId);

          const docSnap = await getDoc(postRef); // Check if the document already exists
=======
          console.log("here's the unique ID: ", d.visitItem[0].id);

          let postId = d.visitItem[0].id; // Use visitItem[0].id as the doc ID
          let visitTime = d.visitItem[0].visitTime;

          const postRef = doc(db, 'posts', postId);

          const docSnap = await getDoc(postRef); // Check if the document already exists

          // Clean up the title by removing " - Google Search"
          const cleanedTitle = d.title.replace(' - Google Search', '');
>>>>>>> light-ux-improv

          if (!docSnap.exists()) {
            // If the document doesn't exist, create it using setDoc
            const newDocData = {
<<<<<<< HEAD
              title: d.title, // Assuming d.title exists
=======
              title: cleanedTitle, // Use the cleaned title here
>>>>>>> light-ux-improv
              url: d.url, // Assuming d.url exists
              date: d.date, // Assuming d.date exists
              emojiReactions: {
                heart: 0,
                question: 0,
                surprise: 0,
              },
              visitTime: d.visitItem[0].visitTime,
              postId: postId, // Adding postId to the document
              createdAt: new Date(),
              updatedAt: new Date(),
            };

            // Set the document with the unique visitItem.id
            await setDoc(postRef, newDocData);
            console.log(`Document created with ID: `, postId);
          } else {
            // Document already exists, log this or take other necessary actions
            console.log('Document already exists with ID: ', postId);
          }

<<<<<<< HEAD
          // Assign the postId in the local object (for use in Vue app)
          d.postId = d.visitItem[0].id;
          d.visitTime = d.visitItem[0].visitTime;
          console.log("console logging d.postId for local vue use: ", d.postId)
=======
          // Assign the postId and cleaned title in the local object (for use in Vue app)
          d.postId = d.visitItem[0].id;
          d.title = cleanedTitle; // Update the local title with the cleaned version
          d.visitTime = d.visitItem[0].visitTime;
>>>>>>> light-ux-improv

          // Push the updated object to the updatedData array
          updatedData.push(d);
        }

        // Update the local state with the updated data
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
  padding: 100px 0 0 0;
  border-bottom: 1px solid #f7f6f6;
  font-size: 20px;
  align-items: center;
}

#timeline-header span {
  cursor: pointer;
  color: grey;
  font-size: 30px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: -100px;
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
  height: 6px;
  background-color: rgb(23, 170, 20);
  width: 100px;
  /* Width of the highlight bar */
  position: absolute;
  bottom: -20px;
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
