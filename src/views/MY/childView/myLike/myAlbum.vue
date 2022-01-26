<template>
  <div id="myAlbum">
    <div v-if="albumList[0]" class="Album">

      <router-link v-for="(item,index) in albumList" :to="{name:'AlbumDet',params:{id:item.albumId}}" class="item"
                   tag="div">
        <el-image :src="item.cover+'?param=224y224'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p>{{ item.albumName }}</p>
        <p>发行时间: {{ $store.getters.Date(item.paidTime) }}</p>
      </router-link>
    </div>
    <div v-else class="notMV">
      <i></i>
      <p>什么也没有去，<a href="/Home">音乐馆</a>发现好音乐</p>
    </div>
  </div>
</template>

<script>
import {getAlbumList} from "@/network/getdata/user";

export default {
  name: "myAlbum",
  data() {
    return {
      albumList: []
    }
  },
  methods: {
    getAlbumListFun() {
      getAlbumList().then(res => {
        this.albumList = res.paidAlbums
        console.log(res);
      })
    }
  },
  created() {
    this.getAlbumListFun()
  }
}
</script>

<style lang="scss" scoped>
#myAlbum {
  padding-top: 20px;

  .Album {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    width: 224px;
    padding-bottom: 44px;
    font-size: 14px;

    .coverImg {
      width: 224px;
      height: 224px;
      margin-bottom: 15px;

      .image-slot {
        width: 224px;
        height: 224px;
      }
    }

    p:nth-child(3) {
      color: #999;
      margin-top: 5px;
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
}
</style>