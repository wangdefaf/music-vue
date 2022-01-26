<template>
  <div id="searchAlbum">
    <div class="counter">
      <router-link v-for="(item,index) in data.albums" :to="{name:'AlbumDet',params:{id:item.id}}" class="info"
                   tag="div">
        <div class="cover">
          <el-image :src="item.picUrl+'?param=224y224'" class="coverImg">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
        </div>
        <p>{{ item.name }}</p>
        <router-link :to="{name:'singerDet',params: {id:item.artists[0].id}}" tag="span">{{
            item.artists[0].name
          }}
        </router-link>
        <div class="hoverInfo">
          <img src="~@/assets/image/public/playIcon.png"/>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchAlbum",
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
</style>