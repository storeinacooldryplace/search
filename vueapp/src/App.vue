<template>
  <div id="app">
    <div id="searchresults">
      <!-- Iterate over dateWise array and pass each date block to the Timeline component -->
      <TimelineComponent v-for="(items, index) in dateWise" :key="index" :items="items" />
    </div>
  </div>
</template>

<script>
import TimelineComponent from './components/TimelineComponent.vue';

export default {
  components: {
    TimelineComponent
  },
  data() {
    return {
      history: [],
      dateWise: []
    };
  },
  methods: {
    sortHistory() {
      let dateWise = [];
      let lastIndex = 0;

      for (let i = 0; i <= this.history.length - 1; i++) {
        if (i === 0) { // exception for the 1st item
          let dateArr = [];
          dateArr.push(this.history[i]);
          dateWise.push(dateArr);
          lastIndex = dateWise.length - 1;
        } else {
          let date = this.history[i].date;
          let prevDate = this.history[i - 1].date;

          if (date === prevDate) {
            dateWise[lastIndex].push(this.history[i]);
          } else {
            let dateArr = [];
            dateArr.push(this.history[i]);
            dateWise.push(dateArr);
            lastIndex = dateWise.length - 1;
          }
        }
      }

      this.dateWise = dateWise; // Update dateWise state with sorted data
    },

    fetchHistory() {
      fetch('http://165.227.86.130:1000/api')
        .then(response => {
          if (!response.ok) {
            throw new Error('Couldn’t get data from server');
          }
          return response.json(); // Parse the JSON response
        })
        .then(data => {
          this.history = data; // Assign fetched data to history array
          this.sortHistory();   // Sort the data into dateWise format
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  },
  mounted() {
    this.fetchHistory(); // Fetch history when the component mounts
  }
};
</script>

<style scoped>
#app {
  font-family: 'Afacad Flux', sans-serif;
  color: #202124;
  padding: 40px;
}

#searchresults {
  margin-top: 20px;
}
</style>