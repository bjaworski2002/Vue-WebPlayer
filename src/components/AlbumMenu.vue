<template>
  <div>
    <div class="column">
      <div v-for="(album, i) in albums" :key="i" class="album">
        <img v-bind:src="coverUrl(album)" @click="selectAlbum(album)" />
      </div>
    </div>
  </div>
</template>

<script>
import { SERVER_URL } from "../store";

export default {
  data() {
    return {};
  },
  async created() {
    console.log("zadzialalo");
    this.$emit("currentAlbum", this.$store.getters.getAlbums[0]);
  },
  computed: {
    albums() {
      return this.$store.getters.getAlbums;
    },
  },
  methods: {
    selectAlbum(album) {
      this.$store.dispatch("setSelectedAlbum", album);
      this.$emit("currentAlbum", album);
    },
    coverUrl(album) {
      return SERVER_URL + "/songs/" + album + "/cover.jpg";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.album {
  width: 20vw;
  height: 20vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.column {
  position: absolute;
  width: 20vw;
  height: 100%;
  background-color: black;
  overflow-y: auto;
  overflow-x: hidden;
}
img {
  position: relative;
  width: 17vw;
  height: 17vw;
}
.album img:hover {
  position: relative;
  width: 20vw;
  height: 20vw;
}
</style>