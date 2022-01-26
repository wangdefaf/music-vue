<template>
  <div id="home">
    <main-playlist/>
    <main-new-song/>
    <main-banner-share/>
    <main-new-song-img/>
    <main-top-list/>
    <main-m-v/>
  </div>
</template>

<script>
import MainPlaylist from "./childComps/Playlist/MainPlaylist";
import MainNewSong from "./childComps/NewSong/MainNewSong";
import MainBannerShare from "./childComps/BannerShare/MainBannerShare";
import MainNewSongImg from "./childComps/NewSongImg/MainNewSongimg"
import MainTopList from "./childComps/Toplist/MainTopList";
import MainMV from "./childComps/MV/MainMV";

export default {
  name: "home",
  components: {
    MainMV,
    MainTopList,
    MainBannerShare,
    MainPlaylist,
    MainNewSong,
    MainNewSongImg
  }
}
</script>

<style scoped>

</style>