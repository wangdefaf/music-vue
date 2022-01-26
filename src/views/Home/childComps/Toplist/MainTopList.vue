<template>
  <div class="newsong">
    <home-template routerName="TopList" title="排行榜"/>
    <main-counter :goods="goods"/>
  </div>
</template>

<script>
import homeTemplate from "@/components/content/Home/HomeTemplate/homeTemplate";
import MainCounter from "./MainCounter";

import {topList} from "@/network/getdata/TopList"

export default {
  name: "MainTopList",
  data() {
    return {
      goods: [],
      topListId: []
    }
  },
  methods: {
    //网络请求
    getSearchHotFun() {
      topList(19723756).then(res => {
        let arr = res.playlist.tracks.splice(0, 15)
        this.goods = new Array(Math.floor(arr.length / 3))
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i] = arr.splice(0, 3)
        }
        this.goods = JSON.parse(JSON.stringify(this.goods))
      })
    }
  },
  components: {
    MainCounter,
    homeTemplate
  },
  created() {
    this.getSearchHotFun()

  }
}
</script>

<style lang="scss" scoped>
.newsong {
  background-image: linear-gradient(#f8f8f8, #fff);
}

</style>