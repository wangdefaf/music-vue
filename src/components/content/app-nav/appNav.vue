<template>
  <div id="appNav">
    <div class="logo">
      <router-link tag="div" to="/Home">
        <img src="~@/assets/image/public/logo.png">
      </router-link>
    </div>
    <div class="routers">
      <router-link tag="div" to="/Home"><span>音乐馆</span></router-link>
      <router-link tag="div" to="/My"><span>我的</span></router-link>
      <router-link tag="div" to="/Singer"><span>歌手</span></router-link>
      <router-link tag="div" to="/Album"><span>新碟</span></router-link>
      <router-link tag="div" to="/TopList"><span>排行榜</span></router-link>
      <router-link tag="div" to="/PlayList"><span>分类歌单</span></router-link>
      <router-link tag="div" to="/MV"><span>MV</span></router-link>
    </div>
    <search-bar/>
    <div class="login">
      <router-link v-if="$cookies.get('userId')" tag="div" to="/My">
        <img :src="userInfo.avatarUrl+'?param=45y45'">
        <div class="loginOut" @click="loginOut">
          <span>退出登录</span>
        </div>
      </router-link>
      <span v-else @click="showLogin">登录</span>
    </div>
  </div>
</template>

<script>

import {getUserDet} from "@/network/getdata/user";
import {getLogOut} from "@/network/getdata/login"
import SearchBar from "@/components/common/Search/searchBar";

export default {
  name: "appNav",
  components: {SearchBar},
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    showLogin() {
      this.$emit('showLogin')
    },
    loginOut() {//退出登录
      console.log('退出登录');
      this.$cookies.remove('token')
      this.$cookies.remove("userId")
      getLogOut()
      this.$router.go(0)
    },
    getUserDetFun(id) {
      getUserDet(id).then(res => {
        this.userInfo = res.profile
        console.log(res.profile.avatarUrl);
      })
    }
  },
  created() {
    if (this.$cookies.get("userId")) {
      this.getUserDetFun(this.$cookies.get("userId"))
    } else console.log('您当前没有登录');

  }
}
</script>

<style lang="scss" scoped>
#appNav {
  display: flex;
  width: 1200px;
  margin: 0 auto;
  height: 80px;
  border-bottom: 1px solid #f2f2f2;

  .logo {
    cursor: pointer;
    padding-top: 17px;
    margin-right: 40px;
  }

  .routers {
    display: flex;
    margin-right: 20px;

    div {
      cursor: pointer;
      padding: 0 20px;
      font-size: 18px;
      line-height: 80px;
    }

    div:hover {
      color: #31c27c;
    }

    .active {
      background: #31c27c;
      color: #fff !important;
    }
  }

  .login {
    cursor: pointer;
    line-height: 80px;

    > div {
      position: relative;
      z-index: 5;

      .loginOut {
        display: none;
        font-size: 14px;
        padding: 5px 10px 10px;
        line-height: 30px;
        background: #fff;
      }

      .loginOut span:hover {
        color: #31c27c;
      }
    }

    img {
      vertical-align: middle;
      border-radius: 50%;
    }
  }

  .login :hover .loginOut {
    display: block;
  }
}
</style>