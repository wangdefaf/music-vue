<template>
  <div id="searchMv">
    <div class="counter">
      <div class="items">
        <router-link v-for="(item,index) in data.mvs" :to="{name:'mvDet',params:{id:item.id}}" class="info" tag="div">
          <el-image :src="item.cover+'?param=285y161'" class="coverImg">
            <div style="background: #fff;width: 100%;height: 100%;"></div>
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
  </div>
</template>

<script>
export default {
  name: "searchMv",
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
#searchMv {
  .counter {
    position: relative;
    min-height: 700px;
    padding-bottom: 20px;

    .items {
      display: flex;
      flex-wrap: wrap;

      .info {
        position: relative;
        width: 284px;
        margin: 10px 8px;
        font-size: 14px;

        .coverImg {
          .image-slot {
            width: 285px;
            height: 161px;
          }
        }

        p, span {
          cursor: pointer;
        }

        p {
          width: 285px;
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
          width: 285px;
          height: 161px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          opacity: 0;
          cursor: pointer;
          transition: all .5s;

          img {
            width: 35px;
            height: 35px;
            margin-top: 65px;
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