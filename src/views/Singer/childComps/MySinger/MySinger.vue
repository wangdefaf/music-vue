<template>
  <div id="mySinger">
    <div v-if="$cookies.get('userId')" class="counter aa">
      <p>我关注的歌手</p>
      <div id="positionIcon">
        <i class="icon icon_left" @click="turnPageLeft"></i>
        <i class="icon icon_right" @click="turnPageRight"></i>
        <div class="counterInfo">
          <div :style="{'width':singerList.length * 150 + 'px','left': indexBanna*750+'px'}"
               class="infos">
            <router-link v-for="(item,index) in singerList" :to="{name:'singerDet',params:{id:item.id}}" class="info"
                         tag="div">
              <el-image :src="item.img1v1Url+'?param=150y150'" class="coverImg">
                <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
              </el-image>
              <i></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="counter bb">
      <h1>万千歌手 近在眼前</h1>
      <h3>登录查看你关注的歌手</h3>
      <div @click="LoginButtonClick"><span>立即登录</span></div>
    </div>
    <login v-if="isLoginView" @closeView="closeView"></login>
  </div>
</template>

<script>
import {getArtistSublist} from "@/network/getdata/user";
import Login from "@/components/common/Login/login";

export default {
  name: "MySinger",
  components: {Login},
  data() {
    return {
      isLoginView: false,
      singerList: [],
      indexBanna: 0,
      listLength: 0
    }
  },
  methods: {
    LoginButtonClick() {
      this.isLoginView = true
      console.log(this.$cookies.get('token'), '我是登录页面显示方法！');
    },
    closeView() {
      this.isLoginView = false
    },
    turnPageLeft() {
      if (this.indexBanna === 0) {
        this.indexBanna = this.indexBanna - this.listLength + 1
      } else this.indexBanna++
      console.log(this.indexBanna);
    },
    turnPageRight() {
      if (this.indexBanna === 0 - this.listLength + 1) {
        this.indexBanna = 0
      } else this.indexBanna--
      console.log(this.indexBanna);
    },
    getArtistSublistFun() {
      getArtistSublist().then(res => {
        this.singerList = res.data
        this.listLength = Math.ceil(res.data.length / 5)
        console.log(this.listLength, res, '歌手关注列表');
      })
    },
  },
  created() {
    this.getArtistSublistFun()
  }
}
</script>

<style lang="scss" scoped>
#mySinger {
  height: 376px;
  background: url("~@/assets/image/singer/myBg.jpg");

  .counter {
    width: 1200px;
    margin: 0 auto;
  }

  .bb {
    color: #fff;
    text-align: center;

    h1 {
      padding-top: 100px;
      font-size: 55px;
      font-weight: lighter;
      cursor: pointer;
    }

    h3 {
      font-size: 25px;
      font-weight: lighter;
      cursor: pointer;
    }

    div {
      width: 174px;
      height: 48px;
      margin: 0 auto;
      margin-top: 20px;
      border: #333 1px solid;
      font-size: 18px;
      text-align: center;
      line-height: 48px;
      transition: all .3s;
      cursor: pointer;
    }

    div:hover {
      transition: all .3s;
      border: #fff 1px solid;
    }
  }

  .aa {
    position: relative;

    > p {
      padding: 60px 0 44px;
      margin: 0 32px;
      text-align: center;
      line-height: 22px;
      font-size: 18px;
      color: #fff;
    }

    #positionIcon {
      position: relative;
      width: 750px;
      margin: 0 auto;
    }

    .counterInfo {
      position: relative;
      width: 750px;
      height: 150px;
      overflow: hidden;

      .infos {
        position: absolute;
        display: flex;
        transition: all .3s;

        .info {
          position: relative;
          width: 150px;
          height: 150px;
          cursor: pointer;

          .coverImg {
            transition: all .3s;
            filter: brightness(50%) grayscale(100%);
          }

          .image-slot {
            border-radius: 50%;
            width: 150px;
            height: 150px;
          }

          i {
            position: absolute;
            top: 0;
            left: 0;
            width: 140px;
            height: 140px;
            border: 5px solid transparent;
            z-index: 2;
            transition: all .3s;
          }
        }

        .info:hover {
          i {
            border: 5px solid #31c27c;
            transition: all .3s;
          }

          .coverImg {
            transition: all .3s;
            filter: brightness(100%) grayscale(0%);
          }
        }
      }
    }

    .icon {
      position: absolute;
      right: -80px;
      top: 40px;
      display: inline-block;
      z-index: 11;
      margin-top: 5px;
      width: 26px;
      height: 52px;
      cursor: pointer;
      background: url("~@/assets/image/singer/arrow.png") 26px 0;
    }

    .icon_left {
      position: absolute;
      left: -80px;
      z-index: 11;
      background-position-x: 0;
    }

    .icon:hover {
      background-position-y: 52px;
    }
  }
}
</style>