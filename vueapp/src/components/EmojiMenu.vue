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
import { doc, addDoc, updateDoc, increment, collection } from 'firebase/firestore';

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
          hoverColor: 'rgba(255, 0, 0, 0.3)',
          emojiType: 'heart',
        },
        {
          src: require('@/assets/question.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(0, 255, 0, 0.3)',
          emojiType: 'question',
        },
        {
          src: require('@/assets/exclamation.png'),
          count: 0,
          voted: false,
          hoverColor: 'rgba(0, 0, 255, 0.3)',
          emojiType: 'surprise',
        },
      ],
      postId: null,
    };
  },
  methods: {
    async toggleCount(index) {
      const icon = this.icons[index];

      // If the postId is not defined, create a new document
      if (!this.postId) {
        const newDocData = {
          emojiReactions: {
            [icon.emojiType]: 1, // Set initial count for the first emoji
          },
          content: this.title,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        const docRef = await addDoc(collection(db, 'posts'), newDocData);
        console.log("Document written with ID: ", docRef.id);
        this.postId = docRef.id;

        // Update the local state for the icon
        icon.count += 1;
        icon.voted = true;

      } else {
        const postRef = doc(db, 'posts', this.postId);

        if (!icon.voted) {
          // If the icon was not voted on before, increment the count
          await updateDoc(postRef, {
            [`emojiReactions.${icon.emojiType}`]: increment(1),
          });

          // Update the local state for the icon
          icon.count += 1;
          icon.voted = true;

        } else {
          // If the icon was already voted on, decrement the count
          await updateDoc(postRef, {
            [`emojiReactions.${icon.emojiType}`]: increment(-1),
          });

          // Update the local state for the icon
          icon.count -= 1;
          icon.voted = false;
        }
      }
    }
  }
}
</script>

<style>
.emoji-container {
  display: flex;
  padding: 10px;
}

.emoji-icons {
  display: flex;
  gap: 10px;
}

.emoji-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.emoji-icon:hover {
  background-color: rgba(100, 100, 255, 0.2);
  border-radius: 50%;
}

.icon {
  width: 24px;
  height: 24px;
}

.count {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #333;
}
</style>
