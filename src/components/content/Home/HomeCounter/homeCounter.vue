<template>
  <div class="counter">
    <div :style="{width: 1200*goods.length + 'px',right: 1200*actInd + 'px'}" class="swiper">
      <div v-for="(value,index) in goods" :style="{'height': height+'px'}" class="infos">
        <slot :item="value"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeCounter",
  props: {
    goods: {
      type: Array
    },
    actInd: {
      type: Number
    },
    height: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.counter {
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;

  .swiper {
    display: flex;
    position: relative;
    transition: .5s all;

    .infos {
      display: flex;
      flex-wrap: wrap;
      width: 1200px;
    }
  }


}
</style>