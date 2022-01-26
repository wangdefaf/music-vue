<template>

  <home-counter :actInd="actInd" :goods="goods" :height="428">
    <template v-slot:default="good">
      <router-link v-for="(item,index) in good.item" :to="{name:'mvDet',params:{id:item.id}}" class="info" tag="div">
        <el-image :src="item.cover+'?param=224y127'" class="coverImg">
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
    </template>
  </home-counter>

</template>

<script>
import HomeCounter from "@/components/content/Home/HomeCounter/homeCounter";

export default {
  name: "MainMV",
  components: {HomeCounter},
  props: {
    goods: {
      type: Array
    },
    actInd: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
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

</style>