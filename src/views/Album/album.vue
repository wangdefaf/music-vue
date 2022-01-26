<template>
  <div id="newSong" @scroll.passive="scrollCb($event)">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else id="Counter">
      <div class="title">
        <div v-for="(item,index) in tagsText"
             :class="{'active':index===tagIndex}"
             class="item"
             @click="tagClick(index)">
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="counter">
        <router-link v-for="(item,index) in Goods" :to="{name:'AlbumDet',params:{id:item.albumId}}" class="info"
                     tag="div">
          <div class="cover">
            <el-image :src="item.coverUrl+'?param=224y224'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
          </div>
          <p>{{ item.albumName }}</p>
          <span>{{ item.artistName }}</span>
          <div class="hoverInfo">
            <img src="~@/assets/image/public/playIcon.png"/>
          </div>
        </router-link>
      </div>
    </div>
    <more/>
  </div>
</template>

<script>
import {getAlbumList} from '@/network/getdata/album'
import More from "@/components/common/more/more";
import Loading from "../../components/common/loading/loading";

export default {
  name: "album",
  components: {Loading, More},
  data() {
    return {
      tagsDeta: ['Z_H', 'E_A', 'KR', 'JP'],
      tagsText: ['华语', '欧美', '韩国', '日本'],
      tagIndex: 0,
      Goods: [],
      isLoad: true
    }
  },
  methods: {
    tagClick(index) {
      this.tagIndex = index
      this.getNewSongFun(index)
    },
    //网络请求
    getNewSongFun(index) {
      this.isLoad = true
      getAlbumList(this.tagsDeta[index], 30, 0).then(res => {
        this.Goods = res.albumProducts
        this.isLoad = false
        console.log(res);
      })
    },
  },
  created() {
    this.getNewSongFun()
  },
}
</script>

<style lang="scss" scoped>
#newSong {
  position: relative;
  width: 1200px;
  min-height: 700px;
  margin: 0 auto;
  padding-top: 65px;

  .title {
    display: flex;
    padding-left: 65px;
    margin-bottom: 24px;

    .item {
      height: 26px;
      margin-right: 24px;
      line-height: 26px;
      font-size: 14px;
      color: #000;
      cursor: pointer;

      span {
        text-align: center;
        padding: 0 8px;
      }
    }

    .active {
      background: #31c27c;
      color: #fff;
    }
  }

  .counter {
    display: flex;
    flex-wrap: wrap;

    .info {
      position: relative;
      width: 224px;
      height: 291px;
      margin: 0 8px;
      font-size: 14px;
      padding-bottom: 34px;

      .date {
        margin-top: 7px;
        color: #999;
      }

      .cover {
        width: 224px;
        height: 224px;
        overflow: hidden;

        .coverImg {
          transition: all .5s;

          .image-slot {
            width: 224px;
            height: 224px;
          }
        }
      }

      p, span, div {
        cursor: pointer;
      }

      p {
        width: 224px;
        margin: 8px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

    .info:hover .coverImg {
      transform: scale(1.1);
      transition: all .5s;
    }
  }
}
</style>