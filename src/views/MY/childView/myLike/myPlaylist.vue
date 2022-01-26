<template>
  <div id="myPlaylist">
    <div v-if="playlist[0]" class="playlist">
      <div v-for="(item,index) in playlist" class="item">
        <el-image :src="item.coverImgUrl+'?param=220y220'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p>{{ item.name }}</p>
        <p>{{ item.trackCount }}首</p>
      </div>
    </div>
    <div v-else class="notMV">
      <i></i>
      <p>什么也没有，去<a href="/Home">音乐馆</a>发现好音乐</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "myPlaylist",
  props: {
    playlist: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
#myPlaylist {
  padding-top: 20px;

  .playlist {
    display: flex;
    flex-wrap: wrap;
  }

  .item {
    width: 220px;
    margin-right: 20px;
    padding-bottom: 44px;
    font-size: 14px;

    .coverImg {
      width: 220px;
      height: 220px;
      margin-bottom: 15px;

      .image-slot {
        width: 220px;
        height: 220px;
      }
    }

    p:nth-child(3) {
      margin-top: 5px;
      color: #999;
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