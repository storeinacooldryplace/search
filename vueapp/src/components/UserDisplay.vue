<template>
  <div class="user-profile">
    <img class="user-banner" src="@/assets/bliss.webp">
    <img class="user-pfp" src="@/assets/headshot2.jpg">
    <div class="user-stats">

      <div class="user-ID">
        <span id="name"><b>Justine Jung</b></span>
        <span id="username">@psychobath</span>

      </div>
      <span class="stat"><b>2 people</b> here right now</span>
      <span class="stat"> <b>6 hours </b> since last search </span>
      <span class="stat"><b>2.6k </b>visitors</span>
      <span class="stat"><b>33</b> followers</span>
      <span class="stat"><b>323 days</b> until the website goes down</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserDisplay',
  data() {
    return {};
  }
}
</script>

<style>
.user-profile {
  margin: 20px;
  /* Center the content inside the user-profile */

}

.user-ID {
  display: flex;
  flex-direction: column;
}

#username {
  color: grey
}

.user-banner {
  width: 100%;
  height: 150px;
  background-color: #e1e8ed;
  border-radius: 10px;
}

.user-pfp {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid white;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  object-fit: cover;
  margin-top: -25%
}

.user-stats {
  display: flex;
  gap: 10px;
  flex-direction: column;
  font-size: 16px;
  color: #333;
  /* Text color for stats */
  margin-bottom: 35px
}
</style>