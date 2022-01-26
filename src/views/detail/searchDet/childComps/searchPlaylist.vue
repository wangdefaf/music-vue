<template>
  <div id="searchplaylist">
    <div class="counter">
      <router-link v-for="(item,index) in data.playlists" :to="{name:'playlistDet',params:{id:item.id}}" class="info"
                   tag="div">
        <el-image :src="item.coverImgUrl+'?param=224y224'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p>{{ item.name }}</p>
        <span>{{ item.creator.nickname }}</span><br>
        <span>播放量: {{ $store.getters.playCount(item.playCount) }}</span>
        <div class="hoverInfo">
          <img src="~@/assets/image/public/playIcon.png"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchPlaylist",
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>