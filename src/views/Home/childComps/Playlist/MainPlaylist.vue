<template>
  <div class="playlist">
    <home-template :lists="tagTile" routerName="PlayList" title="歌单推荐" @switchIndex="switchIndex"/>
    <home-banner ref="homeBanner" :iconIndex="goods.length" @indexActive="indexActive">
      <main-counter :actInd="actInd" :goods="goods"/>
    </home-banner>

  </div>
</template>

<script>
import homeTemplate from "@/components/content/Home/HomeTemplate/homeTemplate";
import HomeBanner from "@/components/content/Home/HomeBanner/homeBanner";
import MainCounter from "./MainCounter";

import {getPlayList} from "@/network/getdata/PlayListGet"

export default {
  name: "MainPlaylist",
  data() {
    return {
      goods: [],
      tagTile: ['为你推荐', '网络歌曲', '粤语经典', '背景音乐', '快歌', '情歌'],
      tags: ['全部', '流行', '粤语', '乡村', '说唱', '浪漫'],
      tagIndex: 0,
      lastTime: 0,
      actInd: 0
    }
  },
  methods: {
    //子组件方法
    indexActive(index) {
      this.actInd = index
    },
    switchIndex(index) {
      this.tagIndex = index
      this.actInd = 0
      this.$refs.homeBanner._data.activeIndex = 0
      this.getPlayListFun()
    },
    //组件方法

    //网络请求
    getPlayListFun() {
      let tag = this.tags[this.tagIndex]
      getPlayList(tag).then(res => {
        this.goods = new Array(Math.ceil(res.playlists.length / 5))
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i] = res.playlists.splice(0, 5)
        }
        this.goods = JSON.parse(JSON.stringify(this.goods))
      })
    }
  },
  components: {
    HomeBanner,
    MainCounter,
    homeTemplate
  },
  created() {
    this.getPlayListFun()
  }
}
</script>

<style lang="scss" scoped>
.playlist {

  background-image: linear-gradient(#f8f8f8, #fff);
}

</style>