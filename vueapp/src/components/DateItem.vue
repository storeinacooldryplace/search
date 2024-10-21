<template>
  <div id="date-container">
    <div @click="toggleItems" class="date-header">
      <img :src="showItems ? downArrow : rightArrow" alt="Toggle" class="toggle-icon" />
      {{ formattedDate }}
    </div>
    <ul v-if="showItems">
      <ListItem v-for="(item, index) in items" :key="index" :title="item.title" :url="item.url"
        :time="item.visitItem[0].visitTime" :postId="item.postId || 'default-postId'" />
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  name: 'DateItem',
  components: {
    ListItem,
  },
  props: {
    date: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      showItems: true,
      downArrow: require('@/assets/down-arrow.png'),
      rightArrow: require('@/assets/right-arrow.png'),
    };
  },
  computed: {
    formattedDate() {
      return this.date;
    },
  },
  mounted() {
    console.log("herej's Date logging items: ", this.items)
  },
  methods: {
    toggleItems() {
      this.showItems = !this.showItems; // Toggle visibility on click
    },
  },
};
</script>

<style>
.date-header {
  display: flex;
  /* Align the image and text in a row */
  align-items: center;
  /* Center vertically */
  cursor: pointer;
  /* Show pointer on hover */
  font-size: 25px;
}

.toggle-icon {
  width: 20px;
  /* Adjust size as needed */
  height: auto;
  /* Maintain aspect ratio */
  margin-right: 8px;
  /* Spacing between icon and text */
}

.date-header {
  padding-top: 10px
}

#date-container {
  margin-top: 40px;
  margin-left: 15px
}
</style>