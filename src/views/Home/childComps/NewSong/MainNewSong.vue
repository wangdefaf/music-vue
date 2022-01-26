<template>
  <div class="newsong">
    <home-template :lists="tagTile" routerName="Album" title="新歌首发" @switchIndex="switchIndex"/>
    <home-banner ref="homeBanner" :iconIndex="goods.length" @indexActive="indexActive">
      <main-counter :actInd="actInd" :goods="goods"/>
    </home-banner>

  </div>
</template>

<script>
import homeTemplate from "@/components/content/Home/HomeTemplate/homeTemplate";
import HomeBanner from "@/components/content/Home/HomeBanner/homeBanner";
import MainCounter from "./MainCounter";

import {getNewSong} from "@/network/getdata/SongGet"

export default {
  name: "MainNewSong",
  data() {
    return {
      goods: [],
      tagTile: ['最新', '内地', '欧美', '韩国', '日本'],
      tags: ['ALL', 'ZH', 'EA', 'KR', 'JP'],
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
      this.getNewSongFun()
    },
    //组件方法

    //网络请求
    getNewSongFun() {
      let tag = this.tags[this.tagIndex]
      getNewSong(tag, 54).then(res => {
        this.goods = new Array(Math.ceil(res.albums.length / 9))
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i] = res.albums.splice(0, 9)
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
    this.getNewSongFun()
  }
}
</script>

<style lang="scss" scoped>
.newsong {
  background-image: linear-gradient(#f8f8f8, #fff);
}

</style>