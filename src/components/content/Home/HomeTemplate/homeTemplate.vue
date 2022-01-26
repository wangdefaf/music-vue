<template>
  <div id="module">
    <h1 class="title"><span>{{ title }}</span></h1>
    <div v-if="lists" class="options">
      <div v-for="(item,index) in lists" :class="{active: opindex == index }" @click="optionsClick(index)">
        {{ item }}
      </div>
    </div>
    <router-link v-if="routerName" :to="{name:routerName}" tag="span">
      更多>
    </router-link>
    <span v-else>
      更多>
    </span>
  </div>
</template>

<script>
export default {
  name: "homeTemplate",
  data() {
    return {
      opindex: 0
    }
  },
  methods: {
    optionsClick(index) {
      this.opindex = index
      this.$emit('switchIndex', index)
    }
  },
  props: {
    isOptions: {
      type: Boolean,
      default: true
    },
    routerName: {
      type: String,
      default: ''
    },
    lists: {
      default: false
    },
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
#module {
  width: 1200px;
  margin: 0 auto;
  padding-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  position: relative;

  .title {
    display: inline-block;
    font-family: "黑体";
    letter-spacing: 8px;
    margin-bottom: 24px;
  }

  .options {
    display: flex;
    justify-content: center;
    color: #333;
    font-size: 15px;

    div {
      cursor: pointer;
      margin: 0 24px;
    }

    div:hover {
      color: #31c27c;
    }

    .active {
      color: #31c27c;
    }
  }

  > span {
    position: absolute;
    bottom: 0;
    right: 5px;
    cursor: pointer;
  }

  > span:hover {
    color: #31c27c;
  }
}
</style>