<template>
  <div class="player">
    <div class="title">
      <img
        v-if="chosenAlbum != null"
        :src="
          'https://webplayer-server.herokuapp.com/songs/' +
          chosenAlbum +
          '/cover.jpg'
        "
      />
      <span :change="returnTimeFormat(this.$store.getters.getSongDuration)">{{
        playerSongs == null ? "" : playerSongs[chosenSong]
      }}</span>
      <span>{{ chosenAlbum == null ? "" : chosenAlbum }}</span>
    </div>
    <div class="audioPlayers">
      <div class="ranges">
        <span :change="newSong()">{{
          returnTimeFormat(this.$store.getters.getSongTime)
        }}</span>
        <input
          v-model="temp"
          id="input"
          type="range"
          min="0"
          :max="this.$store.getters.getSongDuration"
          @input="changeValue(temp)"
        />
        <span>{{ returnTimeFormat(this.$store.getters.getSongDuration) }}</span>
      </div>
      <div class="buttons">
        <button @click="prev"><font-awesome-icon icon="backward" /></button>
        <button @click="pause">
          <font-awesome-icon v-if="this.$store.getters.getPaused" icon="play" />
          <font-awesome-icon
            v-if="!this.$store.getters.getPaused"
            icon="pause"
          />
        </button>
        <button @click="next">
          <font-awesome-icon icon="forward" />
        </button>
      </div>
    </div>
    <div></div>
    <!-- PLIK AUDIO -->
    <audio id="audioSrc">
      <source
        id="audio"
        v-if="chosenAlbum != null"
        :src="
          'https://webplayer-server.herokuapp.com/songs/' +
          chosenAlbum +
          '/' +
          playerSongs[chosenSong]
        "
        type="audio/mp3"
      />
    </audio>
  </div>
</template>
<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  data() {
    return {};
  },
  props: ["playerSongs", "chosenSong", "chosenAlbum", "isPaused"],
  methods: {
    listPlayerSongs() {
      console.log(this.playerSongs);
    },
    prev() {
      if (
        document.getElementById("audioSrc").currentTime < 3 &&
        this.chosenSong > 0
      ) {
        this.chosenSong--;
        document.getElementById("audioSrc").load();
        document.getElementById("audioSrc").play();
        this.changedSong();
      } else {
        document.getElementById("audioSrc").load();
        document.getElementById("audioSrc").play();
        this.changedSong();
      }
    },
    pause() {
      if (!this.$store.getters.getPaused) {
        document.getElementById("audioSrc").pause();
        this.$store.commit("SetPaused", true);
      } else {
        document.getElementById("audioSrc").play();
        this.$store.commit("SetPaused", false);
      }
    },
    next() {
      if (this.chosenSong + 1 < this.playerSongs.length) {
        this.chosenSong++;
        document.getElementById("audioSrc").load();
        document.getElementById("audioSrc").play();
      } else {
        this.chosenSong = 0;
        document.getElementById("audioSrc").load();
        document.getElementById("audioSrc").play();
      }
    },
    getValue() {
      /*console.log(this.$store.getters.getSongTime);*/
      return this.$store.getters.getSongTime;
    },
    returnTimeFormat(time) {
      //console.log(this.$store.getters.getSongDuration);
      let minutes = Math.floor(time / 60);
      let seconds;
      if (Math.round(time % 60) < 10) seconds = "0" + Math.round(time % 60);
      else seconds = Math.round(time % 60);
      return minutes + ":" + seconds;
    },
    newSong() {
      this.time = this.$store.getters.getSongTime;
      /*console.log(this.time);*/
      if (
        this.$store.getters.getSongTime >=
          this.$store.getters.getSongDuration &&
        this.$store.getters.getSongDuration != 0
      ) {
        document.getElementById("audioSrc").pause();
        this.next();
      }
    },
    /*checkValue(value) {
      console.log(value);
    },*/
    changeValue() {
      if (this.$store.getters.getSongTime > 0) {
        this.$store.commit(
          "SetSongTime",
          document.getElementById("input").value
        );
        document.getElementById("audioSrc").currentTime =
          document.getElementById("input").value;
      }
    },
  },
  computed: {
    temp() {
      return this.$store.getters.getSongTime;
    },
  },
};
</script>
<style scoped>
.player {
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: #404040;
  height: 200px;
  width: calc(100% - 20vw);
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 20px;
}
.title * {
  margin: 5px;
}
.ranges {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ranges span {
  color: white;
  font-size: 25px;
  margin: 20px;
}
.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid #202020;
  color: black;
  font-size: 30px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons button:hover {
  width: 55px;
  height: 55px;
  margin-top: 15px;
  background-color: #303030;
}
img {
  width: 100px;
  height: 100px;
}
.audioPlayers {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
