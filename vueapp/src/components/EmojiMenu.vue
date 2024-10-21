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
          src: require('@/assets/empty-heart.svg'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(255, 0, 0, 0.2)',
          emojiType: 'heart',
        },
        {
          src: require('@/assets/question.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(0, 255, 0, 0.2)',
          emojiType: 'question',
        },
        {
          src: require('@/assets/exclamation.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(0, 0, 255, 0.2)',
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

      onSnapshot(postRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          console.log("Real-time update from Firestore: ", data); // Log real-time updates
          this.updateEmojiCounts(data.emojiReactions);
        }
      });
    },
    updateEmojiCounts(emojiReactions) {
      // Update emoji counts from Firestore
      this.icons.forEach((icon) => {
        icon.count = emojiReactions[icon.emojiType] || 0; // Ensure count defaults to 0 if undefined
      });
    },
    async toggleCount(index) {
      const icon = this.icons[index];
      const postRef = doc(db, 'posts', this.postId);

      try {
        const incrementValue = icon.voted ? -1 : 1; // Increment if not voted, decrement if voted

        // Update Firestore with the new emoji count and set the updatedAt timestamp
        await updateDoc(postRef, {
          [`emojiReactions.${icon.emojiType}`]: increment(incrementValue),
          updatedAt: serverTimestamp(), // Update the updatedAt field with server timestamp
        });

        console.log(`Emoji '${icon.emojiType}' updated by ${incrementValue}`);

        // Toggle the vote state locally
        icon.voted = !icon.voted;

      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
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
  gap: 100px;
  /* Space between icons */
  align-items: center;
  /* Align items vertically centered */
  justify-content: space-around;
  /* Align items to the start (left) */
  width: 100%;
}
</style>
