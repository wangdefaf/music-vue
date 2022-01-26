<template>
  <div id="app">
    <appNav @showLogin="showLogin"/>
    <keep-alive exclude="singer,mv">
      <router-view @showLogin="showLogin"></router-view>
    </keep-alive>
    <footer-bar/>
    <login v-if="isLoginView" @closeView="closeView"/>
  </div>
</template>

<script>
import appNav from "@/components/content/app-nav/appNav";
import Login from "@/components/common/Login/login";
import FooterBar from "./components/common/footer/footerBar";

export default {
  data() {
    return {
      num: 1,
      isLoginView: false
    }
  },
  methods: {
    showLogin() {
      this.isLoginView = true
    },
    closeView() {
      this.isLoginView = false
    }
  },
  components: {
    FooterBar,
    appNav,
    Login
  },
}
</script>
<style lang="scss">
@import "assets/css/normalize.css";

#app {
  height: 100%;
  overflow: auto;
  background-image: linear-gradient(#fff, #f8f8f8);
}

.load {
  position: absolute;
  top: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  display: none;
  background: transparent;
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .3);
}
</style>