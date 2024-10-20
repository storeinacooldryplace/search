import { createApp } from 'vue'
import App from './App.vue'
import { db } from './firebase'
// Import the functions you need from the SDKs you need

console.log('Firestore db:', db);
createApp(App).mount('#app')
