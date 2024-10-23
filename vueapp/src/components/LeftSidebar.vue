<template>
  <aside id="left-sidebar">
    <div id="sidebar-stuff">
      <img id="title-logo" src="../assets/bliss.webp" />
      <div class="icon-container">
        <div class="icon-link" @click.prevent="$emit('changePage', 'home')">
          <img src="../assets/home-icon.svg" alt="Home" />
          <span class="icon-label">Home</span>
        </div>
        <div class="icon-link" @click.prevent="$emit('changePage', 'about')">
          <img src="../assets/profile.webp" alt="Info" />
          <span class="icon-label">Info</span>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'LeftSidebar',
};
</script>

<style scoped>
/* Left Sidebar styles */
#left-sidebar {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  border-right: 0.5px solid #e6e5e5;
}

#sidebar-stuff {
  margin-right: -50%;
}

#title-logo {
  width: 100px;
  height: auto;
}

.icon-container {
  flex-direction: column;
  display: flex;
  margin-top: 90px;
  gap: 20px;
  margin-right: 15px;
  align-items: flex-start;
}

.icon-container img {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: auto;
  border-radius: 50px;
  transition: background-color 0.2s ease;
  gap: 10px;
  padding: 10px 15px;
}

.icon-link:hover {
  background-color: rgba(171, 170, 170, 0.2);
}

.icon-label {
  display: inline-block;
  font-size: 20px;
}

@media (max-width: 1024px) {
  #left-sidebar {
    width: 80px;
    /* Optional: reduce width */
  }

  .icon-label {
    display: none;
    /* Hide icon labels */
  }
}
</style>
