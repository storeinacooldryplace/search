<template>
  <div class="user-profile">

    <div class="user-banner"></div>
    <img class="user-pfp" src="@/assets/headshot2.jpg">
    <div class="user-text">
      <div class="user-ID">
        <span id="name"><b>Justine Jung</b></span>
        <span id="username">@psychobath</span>
      </div>
      <div class="user-stats">
        <span class="stat"><b>2 people</b> here right now</span>
        <span class="stat"> <b>{{ timeSinceLastSearch }} </b> since last search </span>
        <span class="stat"><b>2.6k </b>visitors</span>
        <span class="stat"><b>33</b> followers</span>
        <span class="stat"><b>{{ totalReactions }}</b> likes</span>
        <span class="stat"><b>{{ totalSearches }} searches</b> since beginning</span>
        <span class="stat"><b>323 days</b> until the website goes down</span>
        <span class="stat"><a href="http://storeinacooldryplace.cargo.site">portfolio</a> or <a
            href="http://instagram.com/psychobath">IG</a></span>

      </div>

    </div>
  </div>

  <div id="about">

    <div class="tweet">

      <img class="user-pfp" src="@/assets/headshot2.jpg">

      <div id="tweet-main-column">

        <div class="user-ID">
          <span id="name"><b>Justine Jung</b></span>
          <span id="username">@psychobath</span>
        </div>

        <div id="tweet-content">

          Search History is a conceptual web performance by Justine Jung. Between November 7, 2024 to November 7, 2025,
          she publishes her Google searches in real-time here for anyone with an Internet connection to see. A critical
          examination of the boundaries of privacy, surveillance, and exhibitionism in the digital age, Jung confronts the
          absurdity of voluntarily exposing one's most private thoughts to the public. Using techniques of satire and
          parody, the piece mimics the familiar grammar and interface of social media while amplifying the unsettling act
          of surrendering privacy in exchange for attention.
        </div>

      </div>

      <div id="time">3 days ago</div>
    </div>

  </div>
</template>

<script>
import { db } from '@/firebase';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';

export default {
  name: 'AboutPage',
  data() {
    return {
      totalReactions: 0,
      totalSearches: 0,
      timeSinceLastSearch: ''
    };
  },
  mounted() {
    this.getTotalStats();
    this.getTimeSinceLastSearch();
  },
  methods: {
    getTotalStats() {
      const postsCollection = collection(db, 'posts');

      // Listen to real-time updates for all documents in the "posts" collection
      onSnapshot(postsCollection, (snapshot) => {
        let totalReactionsCount = 0;
        let totalDocsCount = snapshot.size; // Get the total number of documents

        // Loop through each document in the collection
        snapshot.forEach((doc) => {
          const data = doc.data();
          const emojiReactions = data.emojiReactions;

          // Sum the emoji reactions (heart, question, surprise)
          if (emojiReactions) {
            totalReactionsCount += emojiReactions.heart || 0;
            totalReactionsCount += emojiReactions.question || 0;
            totalReactionsCount += emojiReactions.surprise || 0;
          }
        });

        // Update the totalReactions and totalSearches variables in real-time
        this.totalReactions = totalReactionsCount;
        this.totalSearches = totalDocsCount; // Update total searches (docs)
      });
    },
    getTimeSinceLastSearch() {
      const postsCollection = collection(db, 'posts');
      const q = query(postsCollection, orderBy('visitTime', 'desc'), limit(1)); // Query the most recent search

      onSnapshot(q, (snapshot) => {

        console.log("here's snapshot first docs: ", snapshot.docs[0])

        if (!snapshot.empty) {
          const mostRecentDoc = snapshot.docs[0];
          const visitTime = mostRecentDoc.data().visitTime;

          // Get the current timestamp and compute the difference
          const currentTime = Date.now();
          const timeDifference = currentTime - visitTime;

          this.timeSinceLastSearch = this.formatTimeSince(timeDifference);
        } else {
          this.timeSinceLastSearch = 'No searches yet';
        }
      });
    },

    formatTimeSince(milliseconds) {
      const seconds = Math.floor(milliseconds / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} days ago`;
      } else if (hours > 0) {
        return `${hours} hours ago`;
      } else if (minutes > 0) {
        return `${minutes} minutes ago`;
      } else {
        return `${seconds} seconds ago`;
      }
    },
  },
};
</script>

<style scoped>
#about {
  margin: 20px
}

p {
  font-size: 40px;
  width: 70%;
}

.user-profile {
  margin: 0px;
  /* Center the content inside the user-profile */
  border-bottom: 0.5px solid #e6e5e5;
}

.user-ID {
  display: flex;
  flex-direction: column;
}

#name {
  font-size: 20px;
}

#username {
  color: grey
}

.user-banner {
  width: 100%;
  height: 150px;
  background-color: #e1e8ed;
  border-radius: 0%
}

.user-pfp {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid white;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  object-fit: cover;
  /* Changed to "contain" for better fit without distortion */
  margin-left: 20px;
  margin-top: -50px;
  aspect-ratio: 1 / 1;
}

.user-text {
  display: flex;
  gap: 10px;
  flex-direction: column;
  font-size: 16px;
  color: #333;
  margin-left: 20px;
  flex-wrap: wrap;
}

.user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: row
}



.tweet img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 0;
  align-items: flex-start;
}


.tweet #name {
  font-size: 16px;
}

.tweet #username {
  font-size: 14px;
  margin: 0;
}

#tweet-main-column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tweet {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 10px;
  align-items: flex-start;
}

#tweet-content {
  font-size: 25px;
  margin: 0;
  padding-top: 5px;
  width: 100%;
  line-height: 1.5;
}

#time {
  font-size: 14px;
  color: grey;
  align-self: flex-start;
  white-space: nowrap;
  margin-left: 10px;
}
</style>