<template>
  <div id="timeline">
    <DateItem v-for="(dateArr, index) in groupedHistory" :key="index" :date="dateArr[0].date" :items="dateArr" />
  </div>
</template>

<script>
import DateItem from './DateItem.vue';

export default {
  name: 'TimelineComponent',
  components: {
    DateItem,
  },
  props: {
    history: {
      type: Array,
      required: true,
    },
  },
  computed: {
    groupedHistory() {
      const dateWise = [];
      let lastIndex = 0;

      console.log("before TL works. this is TL's history: ", this.history)

      for (let i = 0; i < this.history.length; i++) {
        const currentItem = this.history[i];
        if (i === 0) {
          dateWise.push([currentItem]);
        } else {
          const prevDate = this.history[i - 1].date;

          if (currentItem.date === prevDate) {
            dateWise[lastIndex].push(currentItem);
          } else {
            lastIndex++;
            dateWise.push([currentItem]);
          }
        }
      }
      console.log("after the restructure, here's TLs dateWise: ", dateWise)
      return dateWise;
    },
  },
};
</script>

<style>
#timeline {
  margin-left: 20px;
}
</style>