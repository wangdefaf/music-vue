<template>
  <div class="newsong">
    <home-template :lists="tagTile" routerName="MV" title="MV" @switchIndex="switchIndex"/>
    <home-banner ref="homeBanner" :iconIndex="goods.length" @indexActive="indexActive">
      <main-counter :actInd="actInd" :goods="goods"/>
    </home-banner>

  </div>
</template>

<script>
import homeTemplate from "@/components/content/Home/HomeTemplate/homeTemplate";
import HomeBanner from "@/components/content/Home/HomeBanner/homeBanner";
import MainCounter from "./MainCounter";

import {getMV} from "@/network/getdata/MV"

export default {
  name: "MainNewSong",
  data() {
    return {
      goods: [],
      tagTile: ['精选', '内地', '港台', '欧美', '日本', '韩国'],
      tags: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
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
      getMV(tag, 30).then(res => {
        this.goods = new Array(Math.floor(res.data.length / 10))
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i] = res.data.splice(0, 10)
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