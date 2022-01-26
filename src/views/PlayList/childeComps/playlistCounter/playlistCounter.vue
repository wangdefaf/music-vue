<template>
  <div id="playlistCounter">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else id="counter">
      <div class="tags">
        <div v-for="(item,index) in tags" class="tagCounter">
          <div class="title">{{ title[index] }}</div>
          <div class="info">
            <div v-for="(value,index) in item" class="item">
        <span
            :class="{'activeTitle': value.index === activeTitleIndex}"
            @click="titleClick(value.index,value.name)">
          {{ value.name }}
        </span>
            </div>
          </div>
        </div>
      </div>
      <h2 class="titleH2">推荐歌单</h2>
      <div class="counter">
        <router-link v-for="(item,index) in goods" :to="{name:'playlistDet',params:{id:item.id}}" class="info"
                     tag="div">
          <el-image :src="item.coverImgUrl+'?param=224y224'" class="coverImg">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
          <p>{{ item.name }}</p>
          <span>{{ item.subscribers[0].nickname }}</span><br>
          <span>播放量: {{ $store.getters.playCount(item.playCount) }}</span>
          <div class="hoverInfo">
            <img src="~@/assets/image/public/playIcon.png"/>
          </div>
        </router-link>
      </div>
      <more/>
    </div>
  </div>
</template>

<script>
import {getPlayList, getPlayTag} from "@/network/getdata/PlayListGet";
import More from "@/components/common/more/more";
import Loading from "@/components/common/loading/loading";

export default {
  name: "playlistCounter",
  components: {Loading, More},
  data() {
    return {
      tags: [[], [], [], [], []],
      title: ['语种', '流派', '场景', '心情', '主题'],
      tag: '华语',
      goods: [],
      isLoad: true,
      activeTitleIndex: 0
    }
  },
  methods: {
    //方法
    titleClick(index, tag) {
      this.tag = tag
      this.activeTitleIndex = index
      this.getPlayListFun()
      console.log(index, this.activeTitleIndex);
    },
    //网络请求
    getPlayTagFun() {
      return getPlayTag().then(res => {
        res.tags.forEach((item, index) => {
          item.index = index
          this.tags[item.category].push(item)
        })
        this.tags[2].push(...this.tags[1].splice(0, 6))
        this.tags[3].push(...this.tags[1].splice(0, 1))
      })
    },
    getPlayListFun() {
      return getPlayList(this.tag, 0).then(res => {
        this.goods = res.playlists
        console.log(res.playlists);
      })
    }
  },
  created() {
    Promise.all([
      this.getPlayTagFun(),
      this.getPlayListFun()
    ]).then(res => {
      console.log(res);
      this.isLoad = false
    })
  }
}
</script>

<style lang="scss" scoped>
#playlistCounter {
  position: relative;
  margin: 0 auto;
  width: 1200px;
  min-height: 700px;
  font-size: 14px;

  #counter {
    .tags {
      display: flex;
      margin-top: 40px;

      .tagCounter {
        border-right: 1px solid #e0e0e0;
        margin-right: 22px;

        .title {
          line-height: 26px;
          font-weight: 600;
          color: #999;
        }

        .info {
          width: 232px;
          display: flex;
          flex-wrap: wrap;

          .item {
            display: inline-block;
            cursor: pointer;
            line-height: 26px;
            min-width: 72px;

            span {
              display: inline-block;
              padding: 0 8px;
            }
          }

          .activeTitle {
            color: #fff;
            background: #31c27c;
          }
        }
      }
    }

    .titleH2 {
      color: #000;
      font-weight: 500;
      font-size: 24px;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    .counter {
      display: flex;
      flex-wrap: wrap;

      .info {
        position: relative;
        width: 224px;

        margin: 0 8px;
        font-size: 14px;
        padding-bottom: 40px;

        .coverImg {
          .image-slot {
            width: 224px;
            height: 224px;
          }
        }

        p {
          margin: 8px 0;
        }

        span {
          display: inline-block;
          margin: 5px 0;
          color: #999;
        }

        .hoverInfo {
          position: absolute;
          top: 0;
          width: 224px;
          height: 224px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          opacity: 0;
          cursor: pointer;
          transition: all .5s;

          img {
            width: 35px;
            height: 35px;
            margin-top: 87px;
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
}
</style>