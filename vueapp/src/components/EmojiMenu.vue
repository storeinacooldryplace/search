<template>
  <div class="emoji-container">
    <div class="emoji-icons">
      <EmojiItem v-for="(icon, index) in icons" :key="index" :icon="icon.src" :count="icon.count"
        :hoverColor="icon.hoverColor" :voted="icon.voted" @toggleCount="toggleCount(index)" />
    </div>
  </div>
</template>

<script>
import EmojiItem from './EmojiItem.vue';
import { db } from '@/firebase';
import { doc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { serverTimestamp } from "firebase/firestore";


export default {
  components: {
    EmojiItem,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
      default: "1",
    },
  },
  data() {
    return {
      icons: [
        {
          src: require('@/assets/laugh.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(249,207,47, 0.2)',
          emojiType: 'laugh',
        },
        {
          src: require('@/assets/question.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(0, 255, 0, 0.2)',
          emojiType: 'question',
        },
        {
          src: require('@/assets/empty-heart.svg'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(255, 0, 0, 0.2)',
          emojiType: 'heart',
        },
        {
          src: require('@/assets/exclamation.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgb(29, 161, 242, 0.2)',
          emojiType: 'surprise',
        },
      ],
    };
  },
  mounted() {
    this.setupListener();
  },
  methods: {
    setupListener() {
      const postRef = doc(db, 'posts', this.postId);

      // Real-time listener to sync with Firestore
      onSnapshot(postRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log("Real-time update from Firestore: ", data.emojiReactions);
          this.updateEmojiCounts(data.emojiReactions); // Sync emoji counts from Firestore
        }
      });
    },
    updateEmojiCounts(emojiReactions) {
      this.icons.forEach((icon) => {
        // Only update the count if emoji reaction exists in Firestore
        icon.count = emojiReactions[icon.emojiType] || 0;
      });
    },

    async toggleCount(index) {
      const icon = this.icons[index];
      const postRef = doc(db, 'posts', this.postId);

      try {
        // Fetch the most recent state of the document

        if (!icon.voted) {
          // Increment in Firestore
          await updateDoc(postRef, {
            [`emojiReactions.${icon.emojiType}`]: increment(1),
            updatedAt: serverTimestamp(),
          });
          console.log(`Incremented reaction for ${icon.emojiType}.`);
        } else {
          // Decrement in Firestore
          await updateDoc(postRef, {
            [`emojiReactions.${icon.emojiType}`]: increment(-1),
            updatedAt: serverTimestamp(),
          });
          console.log(`Decremented reaction for ${icon.emojiType}.`);
        }

        // No manual update to icon.count here, let the onSnapshot handle it

        // Toggle local voted state
        icon.voted = !icon.voted;

      } catch (error) {
        console.error("Error updating Firestore document: ", error);
      }
    }
  }
};
</script>

<style>
.emoji-container {
  display: flex;
  /* padding: 10px; */
}

.emoji-icons {
  display: flex;

  margin-left: -15px;
  /* Space between icons */
  align-items: center;
  /* Align items vertically centered */
  justify-content: space-around;
  /* Align items to the start (left) */
  width: 80%;
}
</style>