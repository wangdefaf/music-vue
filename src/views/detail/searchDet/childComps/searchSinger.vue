<template>
  <div id="searchSinger">
    <div class="counter">
      <router-link v-for="(item,index) in data.artists" :to="{name:'singerDet',params:{id:item.id}}" class="item active"
                   tag="div">
        <el-image :src="item.picUrl+'?param=140y140'" class="pic"><br>
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <span>{{ item.name }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchSinger",
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
#searchSinger {
  .counter {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    padding-bottom: 20px;

    .item {
      width: 240px;
      margin: 12px 0;
      font-size: 14px;

      span {
        display: block;
        cursor: pointer;
      }

      span:hover {
        color: #31c27c;
      }

      .image-slot {
        width: 140px !important;
        height: 140px !important;
      }
    }

    .active {
      padding: 25px 0;
      text-align: center;

      .pic {
        width: 140px;
        height: 140px;
        margin-bottom: 10px;
        cursor: pointer;
        border-radius: 50%;
      }

      span {
        font-size: 16px;
      }
    }
  }
}
</style>