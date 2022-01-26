<template>
  <div id="loginQr">
    <p>快速安全登录</p>
    <div>请使用网易云音乐App扫描二维码,<br>或使用<span @click="moudeCutover">账号密码</span>登录</div>
    <img :src="qrUrl" alt="">
  </div>
</template>

<script>
import {getQrCheck, getQrCreate, getQrKey} from "@/network/getdata/login";
import {getUesrAccount} from "@/network/getdata/user";

export default {
  name: "loginQr",
  data() {
    return {
      qrUrl: null,
      qrKey: null,
      setTime: true
    }
  },
  methods: {
    getQrKeyFun() {//生成二维码图片
      getQrKey().then(res => {
        this.qrKey = res.data.unikey
        console.log(this.qrKey);
        getQrCreate(this.qrKey).then(res => {
          this.qrUrl = res.data.qrimg
          this.getQrCheckFun()
          console.log(this.qrUrl, '二维码生成');
        })
      })
    },
    getQrCheckFun() {
      getQrCheck(this.qrKey).then(res => {
        switch (res.code) {
          case 800:
            this.getQrKeyFun()
            console.log('二维码过期');
            break;//二维码过期
          case 801://等待扫码
            if (this.setTime) setTimeout(this.getQrCheckFun, 1000)
            console.log(res, this.setTime, '这位大哥还');
            break;
          case 802://等待确认
            if (this.setTime) setTimeout(this.getQrCheckFun, 1000)
            console.log(res, '报告长官，就差确');
            break;
          case 803://登录成功
            getUesrAccount().then(res => {
              this.$cookies.set("token", res.cookie)
              this.$cookies.set("userId", res.profile.userId)
              this.$router.go(0)
            })
            break;
        }
      }).catch(err => {
      })
    },
    moudeCutover() {//发送事件，切换登录方式
      this.setTime = false
      this.$emit('methodCutover', true)
    },
  },
  destroyed() {
    this.setTime = false
    console.log('销毁了');
  },
  created() {
    console.log('开始请求');
    this.getQrKeyFun()
  }
}
</script>

<style lang="scss" scoped>
#loginQr {
  p {
    font-size: 20px;
    color: #333;
    margin: 20px 0 16px;
  }

  div {
    width: 40%;
    font-size: 16px;
    margin: 0 auto 36px;
    line-height: 1.4;

    span {
      cursor: pointer;
      color: #1E6FFF;
    }
  }

  img {
    width: 150px;
    height: 150px;
    border: 1px solid #D3D3D3;
  }

}
</style>