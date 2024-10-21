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
import { doc, updateDoc, increment, collection, onSnapshot, addDoc } from 'firebase/firestore';

export default {
  components: {
    EmojiItem,
  },
  props: {
    title: {
      type: String,
      required: true,
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
      postId: null,
    };
  },
  mounted() {
    this.initializePost();
  },
  methods: {
    async initializePost() {
      if (!this.postId) {
        const newDocData = {
          emojiReactions: {
            heart: 0,
            question: 0,
            surprise: 0,
          },
          content: this.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const docRef = await addDoc(collection(db, 'posts'), newDocData);
        this.postId = docRef.id;

        // Set up real-time listener
        this.setupListener();
      }
    },
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

      if (!icon.voted) {
        await updateDoc(postRef, {
          [`emojiReactions.${icon.emojiType}`]: increment(1),
        });
        icon.count += 1;
        icon.voted = true;
      } else {
        await updateDoc(postRef, {
          [`emojiReactions.${icon.emojiType}`]: increment(-1),
        });
        icon.count -= 1;
        icon.voted = false;
      }
    },
  },
};
</script>

<style>
.emoji-container {
  display: flex;
  /* padding: 10px; */
  /* Set flex direction to column if needed, depending on your layout */
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
