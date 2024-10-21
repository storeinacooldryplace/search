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
import { doc, updateDoc, increment, onSnapshot, getDoc } from 'firebase/firestore';

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
      required: true, // Expecting postId to be passed as a prop
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
          this.updateEmojiCounts(data.emojiReactions);
        }
      });
    },
    updateEmojiCounts(emojiReactions) {
      // Update emoji counts from Firestore
      this.icons.forEach((icon) => {
        icon.count = emojiReactions[icon.emojiType] || 0;
      });
    },
    async toggleCount(index) {
      const icon = this.icons[index];
      const postRef = doc(db, 'posts', this.postId);

      // Fetch the current state of the document to ensure you're in sync with Firestore
      const postDoc = await getDoc(postRef);
      const emojiReactions = postDoc.data().emojiReactions;

      if (!icon.voted) {
        // Increment the Firestore count
        await updateDoc(postRef, {
          [`emojiReactions.${icon.emojiType}`]: increment(1),
        });
        // Update the local count and voted state
        icon.count = emojiReactions[icon.emojiType] + 1;
        icon.voted = true;
      } else {
        // Decrement the Firestore count
        await updateDoc(postRef, {
          [`emojiReactions.${icon.emojiType}`]: increment(-1),
        });
        // Update the local count and voted state
        icon.count = emojiReactions[icon.emojiType] - 1;
        icon.voted = false;
      }
    }
  },
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
