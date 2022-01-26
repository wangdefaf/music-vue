<template>

  <home-counter :actInd="actInd" :goods="goods" :height="291">
    <template v-slot:default="good">
      <router-link v-for="(item,index) in good.item" :to="{name:'playlistDet',params:{id:item.id}}" class="info"
                   tag="div">
        <el-image :src="item.coverImgUrl+'?param=224y224'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p>{{ item.name }}</p>
        <span>播放量: {{ $store.getters.playCount(item.playCount) }}</span>
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
  name: "MainCounter",
  components: {HomeCounter},
  props: {
    goods: {
      type: Array
    },
    actInd: {
      type: Number
    }
  },
  mounted() {
    // console.log(this.goods,'main');
  }
}
</script>

<style lang="scss" scoped>
.info {
  position: relative;
  width: 224px;
  height: 291px;
  margin: 0 8px;
  font-size: 14px;

  .img {
    width: 224px;
    height: 224px;
  }

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

</style>