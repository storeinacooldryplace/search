<template>
  <div>
    <h2>{{ formatDate(items[0].date) }}</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <span class="like-icon" @click="toggleLike(index)">
          <span v-if="item.liked" class="heart liked">❤️</span>
          <span v-else class="heart">🤍</span>
        </span>
        <span class="exclaim-icon" @click="toggleExclaims(index)">
          <span v-if="item.exclaimed" class="exclaim liked">﹗</span>
          <span v-else class="exclaim">❕</span>
        </span>
        <span class="time">{{ item.time }}</span>
        <a :href="item.url" @click.prevent="openLink(item.url)">
          {{ item.title }}
        </a>
        <span class="likes-count">({{ item.likes }} likes)</span>
        <span class="exclaims-count">({{ item.exclaims }} !s)</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const now = new Date();
      const inputDate = new Date(date);

      const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const inputFormattedDate = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

      const timeDiff = nowDate - inputFormattedDate;
      const daysDiff = Math.floor(timeDiff / (24 * 60 * 60 * 1000));

      if (daysDiff === 0) {
        return `Today, ${inputDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })}`;
      } else if (daysDiff === 1) {
        return `Yesterday, ${inputDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })}`;
      } else if (daysDiff === 2) {
        return `2 days ago, ${inputDate.toLocaleString('en-US', { month: 'long', day: 'numeric' })}`;
      } else {
        return inputDate.toLocaleString('en-US', { month: 'long', day: 'numeric' });
      }
    },
    openLink(url) {
      window.open(url, '_blank');
    },
    toggleLike(index) {
      const item = this.items[index];
      if (!item.liked) {
        item.liked = true;
        item.likes += 1;
      } else {
        item.liked = false;
        item.likes -= 1;
      }
    },
    toggleExclaims(index) {
      const item = this.items[index];
      if (!item.exclaimed) {
        item.exclaimed = true;
        item.exclaims += 1;
      } else {
        item.exclaimed = false;
        item.exclaims -= 1;
      }
    }
  }
};
</script>

<style scoped>
/* Remove bullet points and default list padding */

@font-face {
  font-family: 'Product-Sans';
  src: url('@/assets/fonts/Product Sans Regular.ttf') format('opentype');
}

* {
  font-family: 'Helvetica';
}

ul {
  list-style-type: none;
}

li {
  padding: 70px 10;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.time {
  font-weight: none;
  color: #bababa;
  width: 100px;
  display: inline-block;
  /* Ensures alignment with the title */
}

/* Style the title (link) */
a.title {
  color: #1a73e8;
  text-decoration: none;
}

/* Date styling */
.date {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #5f6368;
}

.like-icon {
  margin-right: 10px;
  cursor: pointer;
  font-size: 24px;
  /* Adjust the size of the heart icon */
}

.exclaim-icon {
  margin-right: 10px;
  cursor: pointer;
  font-size: 24px;
  /* Adjust the size of the heart icon */
}

.heart {
  transition: color 0.3s ease;
  /* Smooth transition for color change */
}

.exclaim {
  transition: color 0.3s ease;
}

.liked {
  color: red;
}

.exclaimed {
  color: red;
}

.likes-count {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}

.exclaims-count {
  margin-left: 10px;
  font-size: 14px;
  color: #555;
}
</style>