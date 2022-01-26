<template>
  <div class="singerCounter" @scroll.passive="scrollCb($event)">
    <div class="sort">
      <div v-for="(item,ind) in sortList" class="item">
        <div style="margin-right: 10px"><span>{{ tags[ind] }}</span></div>
        <div v-for="(value,index) in item" @click="tagClick(ind,index,value)">
          <span :class="{'active': index === activeIndex[ind]}">{{ value }}</span>
        </div>
      </div>
    </div>
    <div class="counter">
      <div v-if="isLoad" class="load">
        <loading/>
      </div>
      <div v-else class="items">
        <router-link v-for="(item,index) in Goods" :to="{name:'mvDet',params:{id:item.id}}" class="info" tag="div">
          <el-image :src="item.cover+'?param=285y161'" class="coverImg">
            <div style="background: #fff;width: 100%;height: 100%;"></div>
          </el-image>
          <p>{{ item.name }}</p>
          <span>{{ item.artistName }}</span><br>
          <span class="icon"></span>
          <span>{{ $store.getters.playCount(item.playCount) }}</span>
          <div class="hoverInfo">
            <img src="~@/assets/image/public/playIcon.png"/>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {getMV} from '@/network/getdata/MV'
import Loading from "@/components/common/loading/loading";

export default {
  name: "MvCounter",
  components: {Loading},
  data() {
    return {
      activeIndex: [0, 0],
      activeValue: [null, null],
      Goods: [],
      isShow: false,
      isLoad: true,
      offset: -1,
      tags: ['区域', '版本'],
      sortList: [
        ['全部', '内地', '港台', '欧美', '韩国', '日本'],
        ['全部', '官方版', '原生', '现场版', '网易出品']
      ]
    }
  },
  methods: {
    tagClick(ind, index, value) {
      this.$set(this.activeIndex, ind, index)
      this.$set(this.activeValue, ind, value)
      this.getArtistFun()
    },
    getArtistFun() {
      this.isLoad = true
      let data = this.activeValue
      getMV(data[0], 20, data[1], 0).then(res => {
        this.Goods = res.data
        this.isLoad = false
      })
    },
    getArtistPlusFun() {
      let data = this.activeValue
      this.offset++
      getMV(data[0], 20, data[1], this.offset).then(res => {
        console.log(res.hasMore);
        if (res.hasMore) return this.Goods.push(...res.data)
        this.isShow = true
      })
    },
    //滚动事件
    scrollCb(event) {
      let scrollBottom = event.target.scrollHeight - event.target.scrollTop - event.target.clientHeight;
      if (scrollBottom < 510 && !this.isShow) {
        this.getArtistPlusFun();
      }
    }
  },
  created() {
    console.log('开始请求');
    this.getArtistFun()
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollCb, true)
    console.log('离开了家人们');
  },
  mounted() {
    window.addEventListener("scroll", this.scrollCb, true);
  }
}
</script>

<style lang="scss" scoped>
.image-slot {
  width: 140px;
  height: 140px;
}

.singerCounter {
  width: 1200px;
  margin: 0 auto;
  margin-top: 64px;

  .sort {
    .item {
      display: flex;
      margin-bottom: 14px;
      color: #ffffff;
      font-size: 14px;

      span {
        display: inline-block;
        height: 26px;
        text-align: center;
        line-height: 26px;
        margin-right: 28px;
        padding: 0 8px;
      }

      div {
        span {
          color: #000;

          margin: 0 12px 14px 0;
          cursor: pointer;
        }

        .active {
          color: #fff;
          background: #31c27c;
        }
      }

      .itemAct {
        margin-right: 28px;
      }
    }
  }

  .counter {
    position: relative;
    min-height: 700px;
    padding-bottom: 20px;

    .items {
      display: flex;
      flex-wrap: wrap;

      .info {
        position: relative;
        width: 284px;
        margin: 10px 8px;
        font-size: 14px;

        .coverImg {
          .image-slot {
            width: 285px;
            height: 161px;
          }
        }

        p, span {
          cursor: pointer;
        }

        p {
          width: 285px;
          margin: 6px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .icon {
          display: inline-block;
          width: 19px;
          height: 12px;
          margin-right: 5px;
          margin-top: 5px;
          background: url("~@/assets/image/public/icon-min.png") 20px -20px;
        }

        span {
          color: #999;
        }

        span:hover {
          color: #31c27c;
        }

        p:hover {
          color: #31c27c;
        }

        .hoverInfo {
          position: absolute;
          top: 0;
          width: 285px;
          height: 161px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          opacity: 0;
          cursor: pointer;
          transition: all .5s;

          img {
            width: 35px;
            height: 35px;
            margin-top: 65px;
            transition: all .5s;
          }
        }
      }

      .info:hover .hoverInfo {
        opacity: 1;
        transition: all .5s;

        img {
          transform: scale(2);
          transition: all .5s;
        }
      }
    }
  }

  > p {
    text-align: center;
  }
}
</style>