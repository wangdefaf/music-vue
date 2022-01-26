<template>
  <div id="videoDet">
    <div id="videoCount">
      <vueVideo/>
      <div class="similar">
        <div class="title">
          大部分人还爱看
        </div>
        <div class="simi">
          <router-link v-for="(item,index) in videoSimi" :to="{name:'videoDet',params:{id:item.vid}}" class="info"
                       tag="div">
            <el-image :src="item.coverUrl+'?param=285y161'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
            <p>{{ item.title }}</p>
            <span>{{ item.creator[0].userName }}</span><br>
            <span class="icon"></span>
            <span>{{ $store.getters.playCount(item.playTime) }}</span>
            <div class="hoverInfo">
              <img src="~@/assets/image/public/playIcon.png"/>
            </div>
          </router-link>
        </div>
      </div>
      <div class="summary">
        <div class="title">
          视频简介
        </div>
        <div class="info">
          <span class="singer">{{ videoDet.creator.nickname }}</span>
          <span class="publishTime">发布时间: {{ $store.getters.Date(videoDet.publishTime) }}</span>
        </div>
      </div>
      <Comment :id="$route.params.id" :type="5" class="comment"></Comment>
    </div>
  </div>
</template>

<script>
import vueVideo from "./childComps/vueVideo";
import Comment from "@/components/common/Comment/comment";
import {getVideoDet, getVideoDetInfo, getVideoRelated, getVideoUrl} from "@/network/getdata/Video";

export default {
  name: "mvDet",
  data() {
    return {
      videoDet: {
        creator: {}
      },
      videoSimi: []
    }
  },
  methods: {
    getVideoDetFun(id) {
      getVideoDet(id).then(res => {
        this.videoDet = res.data
        console.log(res, 'video详情');
      })
    },
    getVideoUrlFun(id) {
      getVideoUrl(id, 720).then(res => {
        console.log(res, 'video Url地址');
      })
    },
    getVideoRelatedFun(id) {
      getVideoRelated(id).then(res => {
        this.videoSimi = res.data
        console.log(res, "相似Video");
      })
    },
    getVideoDetInfoFun(id) {
      getVideoDetInfo(id).then(res => {
        console.log(res, '视频信息');
      })
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.getVideoDetFun(id)
        //   this.getVideoUrlFun(id)
        this.getVideoRelatedFun(id)
        //   this.getVideoDetInfoFun(id)
      }
    }
  },
  created() {
    let id = this.$route.params.id
    this.getVideoDetFun(id)
    // this.getVideoUrlFun(id)
    this.getVideoRelatedFun(id)
    // this.getVideoDetInfoFun(id)
  },
  components: {Comment, vueVideo},
}
</script>

<style lang="scss" scoped>
#videoDet {
  .similar, .summary {
    .title {
      line-height: 60px;
      padding-top: 15px;
      font-size: 24px;
      font-weight: 400;
    }

    width: 1200px;
    margin: 0 auto;
  }

  .summary {
    .info {
      font-size: 14px;
      line-height: 30px;
      margin-bottom: 40px;

      .singer {

      }

      .publishTime {
        margin-left: 20px;
      }

    }
  }

  .similar {
    .simi {
      display: flex
    }

    .info {
      position: relative;
      width: 224px;
      margin: 10px 8px;
      font-size: 14px;

      .coverImg {
        .image-slot {
          width: 224px;
          height: 127px;
        }
      }

      p, span {
        cursor: pointer;
      }

      p {
        width: 224px;
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
        width: 224px;
        height: 127px;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        opacity: 0;
        cursor: pointer;
        transition: all .5s;

        img {
          width: 35px;
          height: 35px;
          margin-top: 47px;
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

  .comment {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>