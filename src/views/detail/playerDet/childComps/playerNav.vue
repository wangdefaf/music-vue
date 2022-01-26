<template>
  <div id="nav">
    <router-link class="logo_pic" tag="div" to="/Home">
      <img alt="" src="~@/assets/image/player/logo.png">
    </router-link>
    <div class="right">
      <div class="down">
        <span>QQ音乐，千万高品质曲库尽享</span>
        <a class="downBtn" href="https://y.qq.com/download/index.html">
          客户端下载
        </a>
      </div>
      <div class="user">
        <img :src="userInfo.avatarUrl+'?param=30y30'" alt="">
        <span class="name">{{ userInfo.nickname }}</span>
        <span class="quit" @click="quit">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getLogOut} from "@/network/getdata/login"

export default {
  name: "playerNav",
  methods: {
    quit() {//退出登录
      console.log('退出登录');
      this.$cookies.remove('token')
      this.$cookies.remove("userId")
      getLogOut()
      this.$router.go(0)
    },
  },
  props: {
    userInfo: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped>
#nav {
  position: relative;
  z-index: 10;
  height: 50px;
  padding-top: 10px;

  .logo_pic {
    cursor: pointer;
    margin-left: 20px;

    img {
      margin-top: 15px;
      opacity: .3;
    }

    img:hover {
      opacity: 1;
    }
  }

  .right {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    padding-top: 10px;
    color: #fff;
    line-height: 50px;

    .down {
      padding-right: 28px;
      font-size: 14px;

      a {
        display: inline-block;
        margin-left: 6px;
        padding: 0 17px;
        height: 28px;
        line-height: 28px;
        border-radius: 28px;
        font-size: 15px;
        color: #fff;
        text-align: center;
        background-color: #31c27c;
        text-decoration: none;
      }
    }

    .user {
      cursor: pointer;
      line-height: 50px;

      img {
        vertical-align: middle;
        margin-right: 5px;
        border-radius: 50%;
      }

      span {
        display: inline-block;
        max-width: 124px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
        font-size: 14px;
        color: #fff;
        opacity: .3;
      }

      .name {
        margin-right: 20px;
      }

      .quit {
        opacity: 0;
        margin-right: 30px;
      }

    }

    .user:hover {
      .quit {
        opacity: .3;
      }
    }

    .user span:hover {
      opacity: 1 !important;
    }
  }
}
</style>