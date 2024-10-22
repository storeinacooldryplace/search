<template>
  <div class="trending-container">
    <h1>Trending Searches</h1>
    <div class="trending-list">
      <!-- Loop through trending searches and render the TrendingSearch component for each -->
      <TrendingSearch v-for="(post, index) in trendingSearches" :key="index" :title="post.title" :url="post.url"
        :totalReactions="post.totalReactions" />
    </div>
  </div>
</template>

<script>
import TrendingSearch from './TrendingSearch.vue';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase'; // Importing Firestore instance

export default {
  name: 'TrendingSearches',
  components: {
    TrendingSearch,
  },
  data() {
    return {
      trendingSearches: [], // Array to store trending posts
    };
  },
  async mounted() {
    // Fetch trending searches when the component is mounted
    await this.fetchTrendingSearches();
  },
  methods: {
    // Method to fetch trending searches from Firestore
    async fetchTrendingSearches() {
      try {
        const postsRef = collection(db, 'posts');
        const q = query(
          postsRef,
          orderBy('updatedAt', 'desc'), // Order by the most recently updated posts
          limit(4) // Limit the number of posts to 4 for trending searches
        );

        const querySnapshot = await getDocs(q);

        const trending = [];
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          const totalReactions = Object.values(postData.emojiReactions || {}).reduce(
            (acc, count) => acc + count, 0
          );

          trending.push({
            ...postData,
            totalReactions,
            postId: doc.id, // Add postId in case it's needed later
          });
        });

        // Sort by total reactions (in case further sorting is needed after recency)
        trending.sort((a, b) => b.totalReactions - a.totalReactions);

        // Update the trendingSearches data
        this.trendingSearches = trending;
      } catch (error) {
        console.error('Error fetching trending searches:', error);
      }
    },
  }
}
</script>

<style scoped>
.trending-container {
  margin: 10px;
  margin-top: 50px;
  gap: 0px;
}

.trending-container h1 {
  font-size: 30px;
  font-weight: normal;
  color: grey;
}

.trending-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
