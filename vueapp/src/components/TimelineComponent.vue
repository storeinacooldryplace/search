<template>
  <div>
    <h2>{{ formatDate(items[0].date) }}</h2>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <div class="icon-container" @mouseover="menuVisible[index] = true" @mouseleave="menuVisible[index] = false">
          <img src="@/assets/react.png" alt="icon" class="circle-icon">

          <div v-if="menuVisible[index]" class="menu-icons">
            <span v-for="(symbol, idx) in symbols" :key="idx" class="symbol" @click="toggleSymbol(symbol.type)">
              <span :class="{ active: actions[symbol.type].isActive }">
                {{ actions[symbol.type].isActive ? symbol.activeSymbol : symbol.inactiveSymbol }}
              </span>
              <span v-if="actions[symbol.type].isActive" class="symbol-text">{{ actions[symbol.type].count }}</span>
            </span>
          </div>
        </div>

        <span class="time">{{ item.time }}</span>
        <a :href="item.url" @click.prevent="openLink(item.url)">
          {{ item.title }}
        </a>
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
  data() {
    return {
      // Reactive properties for counts and active states
      actions: {
        liked: { count: 0, isActive: false },
        flagged: { count: 0, isActive: false },
        questioned: { count: 0, isActive: false }
      },
      menuVisible: [], // Array to control visibility of menus for each item
      // Static symbol data
      symbols: [
        {
          type: 'liked',
          inactiveSymbol: '🤍', // Outline heart emoji
          activeSymbol: '❤️',   // Filled heart emoji
        },
        {
          type: 'flagged',
          inactiveSymbol: '❗',  // Exclamation mark
          activeSymbol: '❗',    // (This could change visually on activation)
        },
        {
          type: 'questioned',
          inactiveSymbol: '❓',  // Question mark
          activeSymbol: '❓',    // (This could change visually on activation)
        }
      ]
    };
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
    },
    toggleSymbol(type) {
      const action = this.actions[type];
      action.isActive = !action.isActive; // Toggle active state
      action.count += action.isActive ? 1 : -1; // Increment or decrement count
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

@font-face {
  font-family: 'Inter';
  src: url('@/assets/fonts/Inter-VariableFont_opsz,wght.ttf') format('opentype');
}

* {
  font-family: 'Inter';
}

ul {
  list-style-type: none;
}

li {
  padding: 10px 10px 10px 5px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  /* Align items in a row */
  align-items: center;
  /* Vertically center items */
}

a {
  padding-left: 10px
}

.icon-container {
  position: relative;
  /* Position for the menu */
  margin-right: 10px;
  /* Space between the icon and the text */
}

/* Circle icon styling */
.circle-icon {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  filter: hue-rotate(180deg) brightness(0) saturate(1000%);
}

/* Menu styling */
.menu-icons {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 20px;
  /* Distance from the main circle icon */
  left: 50%;
  /* Center the menu horizontally */
  transform: translateX(-50%);
  /* Center align based on left position */
  background-color: #f2f1f1;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  /* Ensures menu appears above other elements */
}

.menu-icons .symbol {
  margin: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.symbol-text {
  margin-left: 5px;
  /* Space between icon and text */
  font-size: 16px;
  /* Font size for counts */
}

.menu-icons .symbol.active {
  color: red;
  /* Change color when active */
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
