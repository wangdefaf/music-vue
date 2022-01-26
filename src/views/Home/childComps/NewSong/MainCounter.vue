<template>

  <home-counter :actInd="actInd" :goods="goods" :height="327">
    <template v-slot:default="good">
      <!--      {{good}}-->
      <router-link v-for="(item,index) in good.item" :to="{name:'songDet',params:{id:item.id}}" class="info" tag="div">
        <div>
          <el-image :src="item.blurPicUrl+'?param=86y86'" class="coverImg">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
          <div class="hoverInfo">
            <img src="~@/assets/image/public/playIcon.png"/>
          </div>
        </div>
        <div>
          <p>{{ item.name }}</p>
          <router-link :to="{name:'singerDet',params:{id:item.artist.id}}" tag="span">{{ item.artist.name }}
          </router-link>
        </div>
        <div>

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
  }
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  position: relative;
  width: 375px;
  height: 86px;
  margin-right: 25px;
  padding: 11px 0;
  font-size: 14px;
  border-top: solid 1px #e2e2e2;

  div:nth-child(1) {
    position: relative;
    margin-right: 14px;

    .coverImg {
      .image-slot {
        width: 86px;
        height: 86px;
      }
    }

    .hoverInfo {
      position: absolute;
      top: 0;
      width: 86px;
      height: 86px;
      background: rgba(0, 0, 0, 0.3);
      text-align: center;
      opacity: 0;
      cursor: pointer;
      transition: all .5s;

      img {
        width: 22px;
        height: 22px;
        margin-top: 35px;
        transition: all .5s;
      }
    }
  }

  div:nth-child(2) {
    p {
      width: 242px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin: 8px 0;
    }

    span {
      color: #999;
      cursor: pointer;
    }

    span:hover {
      color: #31c27c;
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