<template>
  <div id="my">
    <div v-if="!$cookies.get('token')" class="bgUnlogin">
      <div class="inner">
        <h2>私人音乐空间,听我想听的歌</h2>
        <div class="text">管理我的音乐,多终端同步</div>
        <div class="title" @click="LoginButtonClick">
          立即登录
        </div>
      </div>
    </div>
    <div v-else class="myView">
      <div v-if="isLoad" class="load">
        <loading/>
      </div>
      <div id="myCounter">
        <div class="profile">
          <div class="info">
            <el-image :src="userInfo.avatarUrl+'?param=110y110'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
            <p>{{ userInfo.nickname }}</p>
            <div class="statistic">
              <router-link class="follow" style="border-right:1px solid #24313d" tag="div" to="/My/Focus/singer">
                <span>{{ userInfo.follows }}</span>
                <strong>关注</strong>
              </router-link>
              <router-link class="fan" tag="div" to="/My/Fans">
                <span>{{ userInfo.followeds }}</span>
                <strong>粉丝</strong>
              </router-link>
            </div>
            <div class="profile_nav">
              <router-link tag="div" to="/My/like" @click="routeClick()">我喜欢</router-link>
              <router-link tag="div" to="/My/Focus">关注</router-link>
              <router-link tag="div" to="/My/Fans" @click="routeClick()">粉丝</router-link>
            </div>
          </div>
        </div>
        <div class="routerView">
          <div v-if="emitIsLoad" class="load">
            <loading/>
          </div>
          <keep-alive exclude="myFocus,myFans">
            <router-view @emitLoad="emitLoad"/>
          </keep-alive>
        </div>
      </div>
    </div>
    <login v-if="isLoginView" @closeView="closeView"></login>
  </div>
</template>

<script>
import {getUserDet} from "@/network/getdata/user";
import Login from "@/components/common/Login/login";
import Loading from "@/components/common/loading/loading";

export default {
  name: "my",
  data() {
    return {
      isLoginView: false,
      userInfo: {},
      isLoad: true,
      emitIsLoad: true
    }
  },
  methods: {
    LoginButtonClick() {
      this.isLoginView = true
      console.log(this.$cookies.get('token'), '我是登录页面显示方法！');
    },
    closeView(isLogin) {
      this.isLoginView = false
      if (isLogin) {
        this.getUserDetFun(this.$cookies.get('userId'))
        console.log('登录');
      }
    },
    routeClick() {
      this.emitIsLoad = true
    },
    emitLoad() {
      console.log('子组件已收到');
      this.emitIsLoad = false
    },
    //网络请求
    getUserDetFun() {
      return getUserDet(this.$cookies.get('userId'), this.$cookies.get('token')).then(res => {
        this.userInfo = res.profile
        this.isLoad = false
        console.log(res);
      })
    },
  },
  created() {
    if (this.$cookies.get('token')) {
      this.getUserDetFun()
    }
  },
  components: {Loading, Login},
}
</script>

<style lang="scss" scoped>
#my {
  position: relative;

  .bgUnlogin {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 922px;
    background: url("~@/assets/image/login/loginBg.jpg") 50% no-repeat;
    background-size: cover;
    overflow: hidden;

    .inner {
      text-align: center;
      color: #fff;

      > h2 {
        font-weight: 100;
        font-size: 60px;
      }

      .text {
        background-position: 0 -70px;
        margin-top: 30px;
        margin-bottom: 36px;
        font-size: 25px;
        font-weight: 100;
      }

      .title {
        display: block;
        width: 128px;
        height: 48px;
        margin: 0 auto;
        border-radius: 2px;
        line-height: 48px;
        text-align: center;
        font-size: 20px;
        background: #31c27c;
        transition: all .3s;
        cursor: pointer;
      }

      .title:hover {
        transition: all .3s;
        background: #2caf6f;
        line-height: 49px;
      }
    }

  }

  .myView {
    .profile {
      width: 100%;
      height: 315px;
      padding-top: 65px;
      background: url('~@/assets/image/login/myBg.jpg') 50% no-repeat;
      background-size: cover;

      .info {
        position: relative;
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        text-align: center;
        color: #fff;

        .coverImg {
          border: 4px solid #fff;
          border-radius: 50%;

          .image-slot {
            width: 110px;
            height: 110px;
          }
        }

        p {
          font-size: 30px;
          font-weight: 400;
          line-height: 64px;
          margin-right: 4px;
        }

        .statistic {
          display: flex;
          justify-content: center;

          > div {
            text-align: center;
            padding: 0 25px;

            span {
              display: block;
              cursor: pointer;
              font-size: 22px;
              line-height: 26px;
              margin-top: -1px;
              font-weight: 400;
              font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
            }

            span:hover {
              color: #31c27c;
            }

            strong {
              font-weight: normal;
              font-size: 14px;
            }
          }
        }

        .profile_nav {
          position: absolute;
          bottom: 0;
          left: 0;
          margin-bottom: 0;
          width: 80%;

          .active {
            color: #31c27c;
          }

          div {
            position: relative;
            float: left;
            font-size: 16px;
            overflow: hidden;
            color: #fff;
            margin-right: 40px;
            height: 56px;
            line-height: 56px;
            cursor: pointer;
          }

          div:hover {
            color: #31c27c;
          }
        }
      }
    }
  }
}
</style>