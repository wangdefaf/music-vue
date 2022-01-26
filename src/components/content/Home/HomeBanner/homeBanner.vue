<template>
  <div class="Banner">
    <div class="arrow arrow-left" @click="cutClickL">
      <i></i>
    </div>
    <div class="center">
      <slot></slot>
      <div class="icons">
        <span v-for="(item,index) in iconIndex" :class="{active_icon:index===activeIndex}" class="icon"
              @click="iconClick(index)"></span>
      </div>
    </div>

    <div class="arrow arrow-right" @click="cutClickR">
      <i style="background-position: 0 -120px;"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "homeBanner",
  data() {
    return {
      activeIndex: 0
    }
  },
  methods: {
    cutClickL() {
      if (this.activeIndex === 0) {
        this.activeIndex = this.iconIndex - 1
      } else this.activeIndex--
      this.$emit('indexActive', this.activeIndex)
    },
    cutClickR() {
      if (this.activeIndex === this.iconIndex - 1) {
        this.activeIndex = 0
      } else this.activeIndex++
      this.$emit('indexActive', this.activeIndex)
    },
    iconClick(index) {
      this.activeIndex = index
      this.$emit('indexActive', this.activeIndex)
    }
  },
  props: {
    iconIndex: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
.Banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;

  .arrow {
    display: flex;
    position: relative;
    bottom: 20px;
    width: 79px;
    height: 108px;
    background: #0000000a;
    justify-content: center;
    align-items: center;
    transition: all .3s;

    i {
      display: inline-block;
      margin-top: 5px;
      width: 20px;
      height: 37px;
      background: url("~@/assets/image/public/icon-min.png") -20px -120px;
    }
  }

  .arrow-left {
    left: -79px;
  }

  .arrow-right {
    right: -79px;
  }

  .arrow:hover {
    background: #dedede;
  }
}

.Banner:hover .arrow-left {
  left: 0;
}

.Banner:hover .arrow-right {
  right: 0;
}

.icons {
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;

  .icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 15px;
    border-radius: 50%;
    background: rgba(0, 0, 0, .1);
  }

  .icon:hover {
    background: rgba(0, 0, 0, .3);
  }

  .active_icon {
    background: #31c27c;
  }
}
</style>