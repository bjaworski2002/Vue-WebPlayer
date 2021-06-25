import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export const SERVER_URL = 'https://webplayer-server.herokuapp.com';

export default new Vuex.Store({
    state: {
        songList: [],
        albums: [],
        selectedAlbum: null,
        paused: true,
        currentAlbumName: "",
        currentSongId: 0,
        songDuration: 0,
        currentSongTime: 0,
    },
    actions: {
        async getAlbums({ commit, getters, dispatch }) {
            const albumsUrl = SERVER_URL + "/albums";
            const response = await axios.get(albumsUrl);
            commit("SetAlbums", response.data)

            const shouldSetFirstAlbum = getters.getSelectedAlbum == null && getters.getAlbums.length > 0;
            if (shouldSetFirstAlbum) {
                await dispatch("setSelectedAlbum", getters.getAlbums[0]);
            }
        },
        async getSongList({ commit }, currentAlbum) {
            this.state.currentAlbumName = currentAlbum;
            const currentSongRequest = SERVER_URL + "/albums/" + (currentAlbum || "");
            const response = await axios.get(currentSongRequest);
            commit("SetSongs", response.data)
        },
        async setSelectedAlbum({ commit, dispatch }, album) {
            commit("SetSelectedAlbum", album);
            dispatch("getSongList", album);
        }
    },
    mutations: {
        SetSongs(state, songList) {
            state.songList = songList;
        },
        SetSelectedAlbum(state, album) {
            state.selectedAlbum = album;
        },
        SetAlbums(state, albums) {
            state.albums = albums;
        },
        SetPaused(state, paused) {
            state.paused = paused;
        },
        SetCurrentSongId(state, id) {
            state.currentSongId = id;
        },
        SetCurrentAlbumName(state, name) {
            state.currentAlbumName = name;
        },
        SetSongDuration(state, duration) {
            state.songDuration = duration;
        },
        SetSongTime(state, time) {
            state.currentSongTime = time;
            //document.getElementById("audioSrc").currentTime = state.currentSongTime;
        },
    },
    getters: {
        getSongList: (state) => {
            return state.songList;
        },
        getSelectedAlbum: (state) => state.selectedAlbum,
        getAlbums: (state) => state.albums,
        getPaused: (state) => { return state.paused },
        getCurrentSongId: (state) => { return state.currentSongId },
        getCurrentAlbumName: (state) => { return state.currentAlbumName },
        getSongDuration: (state) => { return state.songDuration },
        getSongTime: (state) => { return state.currentSongTime },
    },
})