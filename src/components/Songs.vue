<template>
  <div>
    <div class="SongLists">
      <div class="singleSong" v-for="(song, i) in songs" :key="i">
        <span>{{ song }}</span>
        <button
          v-if="!isThisPlayed(songs[i])"
          @click="getCurrentSong(i, false)"
        >
          <font-awesome-icon icon="play" />
        </button>
        <button v-if="isThisPlayed(songs[i])" @click="getCurrentSong(i, true)">
          <font-awesome-icon v-if="$store.getters.getPaused" icon="play" />
          <font-awesome-icon v-if="!$store.getters.getPaused" icon="pause" />
        </button>
      </div>
    </div>
    <SongPlayer
      :chosenAlbum="
        chosenAlbum != null ? chosenAlbum : this.$store.getters.getAlbums[0]
      "
      :playerSongs="playerSongs"
      :chosenSong="chosenSong"
    />
  </div>
</template>

<script>
import SongPlayer from "./SongPlayer.vue";

export default {
  components: {
    SongPlayer,
  },
  data() {
    return {
      chosenAlbum: null,
      playerSongs: null,
      chosenSong: null,
      paused: this.$store.getters.getPaused,
      length: this.$store.getters.getSongDuration,
    };
  },
  props: ["currentAlbum"],
  methods: {
    /* this.$store.commit(
          "SetSongDuration",
          document.getElementById("audioSrc").duration
        ),*/
    getCurrentSong(id, current) {
      let song = document.getElementById("audioSrc");
      let store = this.$store;
      if (current == false || this.$store.getters.getPaused) {
        this.chosenAlbum = this.currentAlbum;
        this.playerSongs = this.songs;
        this.chosenSong = id;
        song.load();
        song.play();
        song.onloadedmetadata = function () {
          store.commit("SetSongDuration", song.duration);
        };
        song.ontimeupdate = function (e) {
          store.commit("SetSongTime", e.target.currentTime);
          console.log("zmieniam");
          console.log(store.getters.getSongTime);
        };
        store.commit("SetPaused", false);
      } else {
        song.pause();
        store.commit("SetPaused", true);
      }
    },
    isThisPlayed(song) {
      if (this.playerSongs != null && this.playerSongs[this.chosenSong] == song)
        return true;
      else return false;
    },
  },
  computed: {
    songs() {
      return this.$store.getters.getSongList;
    },
  },
};
</script>

<style scoped>
.SongLists {
  position: absolute;
  top: 0px;
  right: 0px;
  width: calc(80vw);
  height: calc(100vh - 200px);
  background-color: #202020;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  align-items: center;
  justify-content: flex-start;
}
.singleSong {
  position: relative;
  width: 90%;
  height: 80px;
  min-height: 80px;
  margin: 2px solid #707070;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 25px;
}
.singleSong span {
  position: relative;
  margin-left: 20%;
}
.singleSong button {
  position: relative;
  margin-right: 20%;
  height: 3vh;
  width: 3vw;
  background-color: #303030;
  /*border: 1px black solid;*/
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vh;
}
.singleSong button:hover {
  background-color: #A0A0A0;
}
</style>