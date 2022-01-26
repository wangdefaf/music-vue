<template>
  <div id="toplist">
    <div v-show="isLoad" class="load">
      <loading/>
    </div>
    <div :class="{'show':isLoad}" class="counter">
      <playlist-name :goods="toplistGoods" @nameClick="nameClick"/>
      <toplist-counter :id="playlistId" :goods="playlistGoods"/>
    </div>

  </div>
</template>

<script>
import PlaylistName from "./childeComps/playlistName/playlistName";
import ToplistCounter from "./childeComps/toplistCounter/toplistCounter";
import {topList, topListId} from '@/network/getdata/TopList'
import Loading from "@/components/common/loading/loading";

export default {
  name: "toplist",
  data() {
    return {
      playlistId: 19723756,
      toplistGoods: [[], []],
      playlistGoods: {},
      isLoad: true
    }
  },
  components: {Loading, ToplistCounter, PlaylistName},
  methods: {
    nameClick(id) {
      this.playlistId = id
    },
    playListIdFun() {
      return topListId().then(res => {
        res.list.forEach((item, index) => {
          item.index = index
          if (item.ToplistType) this.toplistGoods[0].push(item)
          else this.toplistGoods[1].push(item)
        })
      })
    },
    topListFun() {//歌单数据
      return topList(this.playlistId).then(res => {
        res.playlist.tracks = res.playlist.tracks.splice(0, 20)
        this.playlistGoods = res.playlist
        console.log(this.playlistGoods.tracks[0].name);
      })
    },
  },
  watch: {
    'playlistId'() {
      this.isLoad = true
      this.topListFun().then(res => {
        this.isLoad = false
      })
    }
  },
  created() {
    Promise.all([
      this.playListIdFun(),
      this.topListFun()
    ]).then(res => {
      console.log(res);
      this.isLoad = false
    })

  },
}
</script>

<style lang="scss" scoped>
#toplist {
  position: relative;
  width: 1200px;
  min-height: 700px;
  margin: 0 auto;
  margin-top: 40px;

  .counter {
    display: flex;
  }

  .show {
    display: none;
  }
}
</style>