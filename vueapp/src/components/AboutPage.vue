<template>
  <div class="user-profile">

    <div class="user-banner"></div>
    <img class="user-pfp" src="@/assets/headshot2.jpg">
    <div class="user-text">
      <div class="user-ID">
        <span id="name"><b>Justine Jung</b></span>
        <span id="username">@psychobath</span>
      </div>
      <div class="user-stats">
        <span class="stat"><b>2 people</b> here right now</span>
        <span class="stat"> <b>6 hours </b> since last search </span>
        <span class="stat"><b>2.6k </b>visitors</span>
        <span class="stat"><b>33</b> followers</span>
        <span class="stat"><b>42</b> likes</span>
        <span class="stat"><b>412 searches</b> since beginning</span>
        <span class="stat"><b>323 days</b> until the website goes down</span>
        <span class="stat"><a href="http://storeinacooldryplace.cargo.site">portfolio</a> or <a
            href="http://instagram.com/psychobath">IG</a></span>

      </div>

    </div>
  </div>

  <div id="about">

    <div class="tweet">

      <img class="user-pfp" src="@/assets/headshot2.jpg">

      <div id="tweet-main-column">

        <div class="user-ID">
          <span id="name"><b>Justine Jung</b></span>
          <span id="username">@psychobath</span>
        </div>

        <div id="tweet-content">

          Search History is a conceptual web performance by Justine Jung. Between November 7, 2024 to November 7, 2025,
          she publishes her Google searches in real-time here for anyone with an Internet connection to see. A critical
          examination of the boundaries of privacy, surveillance, and exhibitionism in the digital age, Jung confronts the
          absurdity of voluntarily exposing one's most private thoughts to the public. Using techniques of satire and
          parody, the piece mimics the familiar grammar and interface of social media while amplifying the unsettling act
          of surrendering privacy in exchange for attention.
        </div>

      </div>

      <div id="time">3 days ago</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'AboutPage',
};
</script>

<style scoped>
#about {
  margin: 20px
}

p {
  font-size: 40px;
  width: 70%;
}

.user-profile {
  margin: 0px;
  /* Center the content inside the user-profile */
  border-bottom: 0.5px solid #e6e5e5;
}

.user-ID {
  display: flex;
  flex-direction: column;
}

#name {
  font-size: 20px;
}

#username {
  color: grey
}

.user-banner {
  width: 100%;
  height: 150px;
  background-color: #e1e8ed;
  border-radius: 0%
}

.user-pfp {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid white;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  object-fit: cover;
  /* Changed to "contain" for better fit without distortion */
  margin-left: 20px;
  margin-top: -50px;
  aspect-ratio: 1 / 1;
}

.user-text {
  display: flex;
  gap: 10px;
  flex-direction: column;
  font-size: 16px;
  color: #333;
  margin-left: 20px;
  flex-wrap: wrap;
}

.user-stats {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: row
}



.tweet img {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 0;
  align-items: flex-start;
}


.tweet #name {
  font-size: 16px;
}

.tweet #username {
  font-size: 14px;
  margin: 0;
}

#tweet-main-column {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.tweet {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 10px;
  align-items: flex-start;
}

#tweet-content {
  font-size: 25px;
  margin: 0;
  padding-top: 5px;
  width: 100%;
  line-height: 1.5;
}

#time {
  font-size: 14px;
  color: grey;
  align-self: flex-start;
  white-space: nowrap;
  margin-left: 10px;
}
</style>