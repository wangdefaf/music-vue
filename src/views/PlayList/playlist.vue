<template>
  <div id="playlist">
    <playlist-counter/>
  </div>
</template>

<script>
import PlaylistCounter from "./childeComps/playlistCounter/playlistCounter";

export default {
  name: "playlist",
  components: {PlaylistCounter}
}
</script>

<style scoped>

</style>