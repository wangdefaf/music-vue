<template>
  <div id="myLike">
    <div class="nav">
      <router-link tag="div" to="song">歌曲 {{ myLikePlaylist[0].trackCount }}</router-link>
      <router-link tag="div" to="Playlist">我的歌单 {{ myLikePlaylist.length }}</router-link>
      <router-link tag="div" to="Mv">MV</router-link>
      <router-link tag="div" to="Album">专辑</router-link>
    </div>
    <keep-alive>
      <router-view :playlist="myLikePlaylist" :playlistId="LikePlaylistId" class="view"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import {getUserPlaylist} from "@/network/getdata/user";

export default {
  name: "myLike",
  data() {
    return {
      myLikePlaylist: [{}],
      LikePlaylistId: null
    }
  },
  methods: {
    getUserPlaylistFun() {
      getUserPlaylist(this.$cookies.get('userId')).then(res => {
        this.myLikePlaylist = res.playlist
        this.LikePlaylistId = res.playlist[0].id
        this.$emit('emitLoad')
        console.log(res, '用户歌单');
      })
    },
  },
  created() {
    this.getUserPlaylistFun()
  }
}
</script>

<style lang="scss" scoped>
#myLike {
  .nav {
    display: flex;
    width: 1200px;
    margin: 0 auto;
    cursor: pointer;
    border-bottom: 1px solid #f7f7f7;

    div {
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      overflow: hidden;
      margin-right: 55px;
      font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
    }

    .active {
      color: #31c27c;
    }
  }

  .view {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>