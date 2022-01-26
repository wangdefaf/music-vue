<template>
  <div id="playlistName">
    <div v-for="(item,index) in goods" class="playlist">
      <div class="title">
        <span v-if="index===0">巅峰榜</span>
        <span v-else>特色榜</span>
      </div>
      <div
          v-for="(value,ind) in item"
          :class="{'active':itemIndex===value.index}"
          :title="value.name"
          class="item"
          @click="itemClick(value.index,value.id)">
        {{ value.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "playlistName",
  data() {
    return {
      itemIndex: 0
    }
  },
  methods: {
    //组件方法
    itemClick(index, id) {
      this.itemIndex = index
      this.$emit('nameClick', id)
    }
  },
  props: {
    goods: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
#playlistName {
  width: 178px;
  height: 1800px;
  margin-right: 30px;
  border: 1px solid #e3e3e3;

  .playlist {
    margin-bottom: 15px;

    .title {
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 61px;
      border-bottom: 1px solid #e3e3e3;
      padding: 0 17px;
    }

    .item {
      padding: 0 17px;
      color: #000;
      background: #fff;
      line-height: 46px;
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .item:hover {
      color: #31c27c;
    }

    .active {
      color: #fff !important;
      background: #31c27c;
    }
  }
}
</style>