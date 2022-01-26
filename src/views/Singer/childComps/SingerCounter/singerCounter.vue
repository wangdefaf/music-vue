<template>
  <div class="singerCounter" @scroll.passive="scrollCb($event)">
    <div class="sort">
      <div v-for="(item,ind) in sortList" class="item">
        <div v-for="(value,index) in item" :class="{itemAct:index===0}" @click="tagClick(ind,index,value)">
          <span :class="{'active': index === activeIndex[ind]}">{{ value.name }}</span>
        </div>
      </div>
    </div>
    <div class="counter">
      <router-link v-for="(item,index) in Goods" :class="{'active':index<=9}"
                   :to="{name:'singerDet',params:{id:item.id}}" class="item" tag="div">
        <el-image v-if="index<=9" :src="item.picUrl+'?param=140y140'" class="pic"><br>
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {getArtist} from '@/network/getdata/Singer'

export default {
  name: "singerCounter",
  data() {
    return {
      activeIndex: [0, 0, 0],
      activeValue: [null, null, null],
      Goods: [],
      isShow: false,
      offset: -1,
      sortList: [
        [{name: '热门', value: null}, {name: 'A', value: 'A'}, {name: 'B', value: 'B'}, {
          name: 'C',
          value: 'C'
        }, {name: 'D', value: 'D'}, {name: 'E', value: 'E'}, {name: 'F', value: 'F'},
          {name: 'G', value: 'G'}, {name: 'H', value: 'H'}, {name: 'I', value: 'I'}, {
          name: 'J',
          value: 'J'
        }, {name: 'K', value: 'K'}, {name: 'L', value: 'L'}, {name: 'M', value: 'M'},
          {name: 'N', value: 'N'}, {name: 'O', value: 'O'}, {name: 'Q', value: 'Q'}, {
          name: 'R',
          value: 'R'
        }, {name: 'S', value: 'S'}, {name: 'G', value: 'G'}, {name: 'U', value: 'U'},
          {name: 'V', value: 'V'}, {name: 'W', value: 'W'}, {name: 'X', value: 'X'}, {
          name: 'Y',
          value: 'Y'
        }, {name: 'Z', value: 'Z'}],
        [{name: '全部', value: -1}, {name: '男歌手', value: 1}, {name: '女歌手', value: 2}, {name: '乐队', value: 3}],
        [{name: '全部', value: -1}, {name: '华语', value: 7}, {name: '欧美', value: 96}, {name: '日本', value: 8}, {
          name: '日本',
          value: 16
        }, {name: '其他', value: 0}]
      ]
    }
  },
  methods: {
    tagClick(ind, index, value) {
      this.$set(this.activeIndex, ind, index)
      this.$set(this.activeValue, ind, value.value)
      this.getArtistFun()
    },
    getArtistFun() {
      let data = this.activeValue
      getArtist(100, 0, data[0], data[1], data[2]).then(res => {
        this.Goods = res.artists
      })
    },
    getArtistPlusFun() {
      let data = this.activeValue
      this.offset++
      getArtist(20, this.offset, data[0], data[1], data[2]).then(res => {
        if (res.more) return this.Goods.push(...res.artists)
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
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    padding-bottom: 20px;

    .item {
      width: 240px;
      margin: 12px 0;
      font-size: 14px;

      span {
        display: block;
        cursor: pointer;
      }

      span:hover {
        color: #31c27c;
      }
    }

    .active {
      padding: 25px 0;
      text-align: center;

      .pic {
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 50%;
      }

      span {
        font-size: 16px;
      }
    }
  }

  > p {
    text-align: center;
  }
}
</style>