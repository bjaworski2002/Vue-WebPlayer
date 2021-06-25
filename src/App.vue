<template>
  <div>
    <AlbumMenu @currentAlbum="getCurrentAlbum" />

    <Songs :currentAlbum="CurrentAlbum" />
  </div>
</template>

<script>
import AlbumMenu from "./components/AlbumMenu.vue";
import Songs from "./components/Songs.vue";

export default {
  components: {
    AlbumMenu,
    Songs,
  },
  data() {
    return {
      CurrentAlbum: null,
    };
  },
  async created() {
    await this.$store.dispatch("getAlbums");
  },
  methods: {
    getCurrentAlbum(album) {
      this.CurrentAlbum = album;
    },
  },
  computed: {
    selectedAlbum() {
      return this.$store.getters.getSelectedAlbum;
    },
  },
};
</script>

<style>
* {
  margin: 0px;
  font-family: 'Source Sans Pro', sans-serif;
}
</style>
