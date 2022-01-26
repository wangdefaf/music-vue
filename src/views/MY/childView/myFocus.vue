<template>
  <div id="myFocus">
    <div class="nav">
      <router-link tag="div" to="singer">歌手</router-link>
      <router-link tag="div" to="user">用户</router-link>
    </div>
    <router-view
        class="view"
        @PopFollowClick="PopFollowClick"
        @PopNotFollowClick="PopNotFollowClick"
    ></router-view>
    <div v-show="isPopFollow" class="popFollow">
      <i></i><br>
      <span>关注成功!</span>
    </div>
    <div v-show="isPopNotFollow" class="popFollow">
      <i></i><br>
      取消关注成功!
    </div>
  </div>
</template>

<script>
export default {
  name: "myFocus",
  data() {
    return {
      isPopFollow: false,
      isPopNotFollow: false
    }
  },
  methods: {
    PopFollowClick(bool) {
      setTimeout(() => {
        this.isPopFollow = !bool
      }, 3000)
      this.isPopFollow = bool
    },
    PopNotFollowClick(bool) {
      setTimeout(() => {
        this.isPopNotFollow = !bool
      }, 3000)
      this.isPopNotFollow = bool
    }
  }
}
</script>

<style lang="scss" scoped>
#myFocus {
  .popFollow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 146px;
    padding: 37px 46px 25px;
    box-sizing: border-box;
    border-radius: 3px;
    background: rgba(0, 0, 0, .7);
    text-align: center;
    font-size: 14px;
    line-height: 22px;
    color: #fff;

    i {
      display: inline-block;
      width: 46px;
      height: 46px;
      margin: 0 12px 16px;
      background: url("~@/assets/image/login/icon_popup.png");
      background-position: 0 -150px;
    }
  }

  .nav {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 1200px;
    margin: 0 auto;
    cursor: pointer;
    border-bottom: 1px solid #f7f7f7;

    div {
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      overflow: hidden;
      margin-right: 55px;
      font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
    }

    .active {
      color: #31c27c;
    }
  }

  .view {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>