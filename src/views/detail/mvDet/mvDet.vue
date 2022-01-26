<template>
  <div id="mvDet">
    <div id="videoCount">
      <mv-video/>
      <div class="similar">
        <div class="title">
          大部分人还爱看
        </div>
        <div class="simi">
          <router-link v-for="(item,index) in mvSimi" :to="{name:'mvDet',params:{id:item.id}}" class="info" tag="div">
            <el-image :src="item.cover+'?param=285y161'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
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
      <div class="summary">
        <div class="title">
          视频简介
        </div>
        <div class="info">
          <router-link :to="{name:'singerDet',params:{id:mvDet.artistId }}" class="singer" tag="span">
            {{ mvDet.artistName }}
          </router-link>
          <span class="publishTime">发行时间: {{ mvDet.publishTime }}</span>
        </div>
      </div>
      <Comment :id="$route.params.id" :type="1" class="comment"></Comment>
    </div>
  </div>
</template>

<script>
import mvVideo from "./childComps/mvVideo";
import {getMvDet, getMvSimi} from "@/network/getdata/MV";
import Comment from "@/components/common/Comment/comment";

export default {
  name: "mvDet",
  data() {
    return {
      mvSimi: [],
      mvDet: {}
    }
  },
  methods: {
    getMvSimiFun(id) {
      getMvSimi(id).then(res => {
        this.mvSimi = res.mvs
        console.log(this.mvSimi, '相似');
      })
    },
    getMvDetFun(id) {
      getMvDet(id).then(res => {
        this.mvDet = res.data
        console.log(res);
      })
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        console.log(this.$route.params.id, 'mvid');
        let id = this.$route.params.id
        this.getMvSimiFun(id)
        this.getMvDetFun(id)
      }
    }
  },
  created() {
    let id = this.$route.params.id
    this.getMvSimiFun(id)
    this.getMvDetFun(id)
  },
  components: {Comment, mvVideo},
}
</script>

<style lang="scss" scoped>
#mvDet {
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