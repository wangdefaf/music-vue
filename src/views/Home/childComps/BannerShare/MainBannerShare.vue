<template>
  <div class="newsong">
    <home-template routerName="My" title="精彩推荐"/>
    <home-banner ref="homeBanner" :iconIndex="goods.length" @indexActive="indexActive">
      <main-counter :actInd="actInd" :goods="goods"/>
    </home-banner>

  </div>
</template>

<script>
import homeTemplate from "@/components/content/Home/HomeTemplate/homeTemplate";
import HomeBanner from "@/components/content/Home/HomeBanner/homeBanner";
import MainCounter from "./MainCounter";

import {getBanner} from "@/network/getdata/SongGet"

export default {
  name: "MainBannerShare",
  data() {
    return {
      goods: [],
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
    //组件方法

    //网络请求
    getBanner() {
      getBanner().then(res => {
        this.goods = new Array(Math.floor(res.banners.length / 2))
        for (let i = 0; i < this.goods.length; i++) {
          this.goods[i] = res.banners.splice(0, 2)
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
    this.getBanner()
  }
}
</script>

<style lang="scss" scoped>
.newsong {
  background-image: linear-gradient(#f8f8f8, #fff);
}

</style>