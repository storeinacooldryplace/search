<template>
  <li class="list-item">
    <EmojiMenu />
    <img id="search-icon" src="@/assets/magnifying.svg">

    <a :href="url" class="linked-title">{{ title }}</a>
    <span class="time">{{ formattedTime }}</span>
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
  padding: 0px;
  margin-bottom: 0px;
  border-bottom: 0.5px solid #ececec;
  display: flex;
  align-items: center;
  gap: 10px;
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
  margin: 0
}
</style>