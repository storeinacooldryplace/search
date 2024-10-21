<template>
  <li class="list-item">


    <div id="search-info">
      <img id="search-icon" src="@/assets/magnifying.svg">
      <a :href="url" class="linked-title">{{ title }}</a>
      <span class="time">{{ formattedTime }}</span>
    </div>

    <!-- Move EmojiMenu below search-info -->
    <div id="search-react">
      <EmojiMenu :title="title" />
    </div>

  </li>
</template>

<script>
import EmojiMenu from './EmojiMenu.vue';

export default {
  name: 'ListItem',
  components: {
    EmojiMenu,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      // Format the time as needed
      return new Date(this.time).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase(); // Example formatting
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
}

li {
  padding: 10px;
  margin-bottom: 0px;
  border-bottom: 0.5px solid #ececec;
  display: flex;
  align-items: left;
  gap: 5px;
  flex-direction: column;
}

.linked-title {
  padding: 10px
}

#search-icon {
  width: 15px;
  height: 15px
}

a {
  font-size: larger;
}

.time {
  margin: 0;
  color: rgb(152, 151, 151);
}
</style>