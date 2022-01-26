<template>
  <div id="myMv">
    <div v-if="mvList[0]" class="mvList">
      <router-link v-for="(item,index) in mvList" :to="{name:'videoDet',params:{id:item.vid}}" class="item" tag="div">
        <el-image :src="item.coverUrl+'?param=220y220'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <div class="hoverInfo">
          <img alt="" src="~@/assets/image/public/playIcon.png"/>
        </div>
        <p>{{ item.title }}</p>
        <p>{{ item.creator[0].userName }}</p>
      </router-link>
    </div>
    <div v-else class="notMV">
      <i></i>
      <p>什么也没有去，<a href="/Home">音乐馆</a>发现好音乐</p>
    </div>
  </div>
</template>

<script>
import {getMvSublist} from "@/network/getdata/user";

export default {
  name: "myMv",
  data() {
    return {
      mvList: []
    }
  },
  methods: {
    getMvSublistFun() {
      getMvSublist().then(res => {
        this.mvList = res.data
        console.log(res);
      })
    }
  },
  created() {
    this.getMvSublistFun()
  }
}
</script>

<style lang="scss" scoped>
.mvList {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;

  .item {
    position: relative;
    width: 220px;
    margin-right: 20px;
    padding-bottom: 34px;
    font-size: 14px;

    > div {
      width: 220px;
      height: 220px;
    }

    .coverImg {
      width: 220px;
      height: 220px;
      margin-bottom: 15px;

      .image-slot {
        width: 220px;
        height: 220px;
      }
    }

    .hoverInfo {
      position: absolute;
      top: 0;
      width: 220px;
      height: 220px;
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

    p {
      margin-bottom: 5px;
    }

    p:nth-child(3) {
      color: #999;
    }
  }

  .item:hover .hoverInfo {
    opacity: 1;
    transition: all .5s;

    img {
      transform: scale(2);
      transition: all .5s;
    }
  }
}

.notMV {
  font-size: 20px;
  color: #666;
  line-height: 38px;
  text-align: center;
  padding: 90px 0 100px;

  i {
    display: block;
    width: 213px;
    height: 203px;
    margin: 0 auto 27px;
    background: url("~@/assets/image/login/notIcon.png");
  }

  a {
    color: #31c27c;
    text-decoration: none;
  }
}
</style>