<template>

  <home-counter :actInd="actInd" :goods="goods" :height="236">
    <template v-slot:default="good">
      <div v-for="(item,index) in good.item" class="info">
        <el-image :src="item.imageUrl+'?param=590y236'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
      </div>
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
  width: 590px;
  height: 236px;
  cursor: pointer;
}

.info:nth-child(2) {
  margin-left: 20px;
}
</style>