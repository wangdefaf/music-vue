<template>
  <div class="loginView">
    <div class="login">
      <div :class="{'isActive':loginMethod}" class="title">
        <div @click="methodCutover(true)">手机号登录</div>
        <div @click="methodCutover(false)">二维码登录</div>
        <span @click="closeLogin"></span>
      </div>
      <div class="info">
        <!--        二维码登录 -->
        <div v-if="!loginMethod" class="login_qr">
          <login-qr @methodCutover="methodCutover"></login-qr>
        </div>
        <!--          账号密码登录 -->
        <div v-else class="accountLogin">
          <p class="infoTitle">账号密码登录</p>
          <div class="hint">
            推荐使用手机<span @click="methodCutover(false)">网易云扫码登录</span>,防止盗号。
          </div>
          <div class="textInput">
            <div :class="{'accountFocus':isAccountFocus}" class="account">
              <input
                  v-model="account"
                  placeholder="请输入手机号登录"
                  type="number"
                  @blur="accountFocus(false)"
                  @focus="accountFocus(true)"
              >
              <i v-if="account" @click="removeAccount"></i>
            </div>
            <div :class="{'passwordFocus':isPasswordFocus}" class="password">
              <input
                  v-model="passWord"
                  placeholder="密码"
                  type="password"
                  @blur="passwordFocus(false)"
                  @focus="passwordFocus(true)"
              >
            </div>
            <p class="point">
              <span v-if="!isError"><i></i>请输入正确的手机号</span>
              <span v-if="!isPassErr"><i></i>密码不能为空</span>
              <span v-if="loginFailed"><i></i>{{ loginFailed }}</span>
            </p>
            <div class="login_button" @click="submitLogin">授权并登录</div>
          </div>
        </div>
      </div>
      <div class="down">
        <a href="https://y.qq.com/download/index.html" target="_blank">下载客户端,体验更多内容</a>
      </div>
    </div>
  </div>
</template>

<script>
import {getLoginPhone} from "@/network/getdata/login";
import LoginQr from "./loginQr";

export default {
  name: "login",
  data() {
    return {
      loginMethod: true,
      isAccountFocus: false,
      isPasswordFocus: false,
      loginFailed: '',
      isError: true,
      isPassErr: 1,
      account: '',
      passWord: ''
    }
  },
  methods: {
    closeLogin() {
      this.$emit('closeView', false)
    },
    methodCutover(bool) {//切换登录方式页面
      this.loginMethod = bool
    },
    removeAccount() {
      this.account = ''
    },//删除内容
    accountFocus(bool) {//账户焦点
      this.isAccountFocus = bool
    },
    passwordFocus(bool) {//密码焦点
      this.isPasswordFocus = bool
    },
    submitLogin() {
      this.isError = this.checkPhone(this.account)
      if (this.isError) {
        this.isPassErr = this.passWord.length
        if (this.isPassErr !== 0) {//检验成功
          this.getLoginPhoneFun()
        }
      } else this.isPassErr = 1

    },
    checkPhone(p, required = true) {
      if (!p) {
        return required ? false : true;
      } else {
        // 必须是1开头，第二位数字可以是0-9任意一个，总长为11
        let reg = /^1([0-9])\d{9}$/;
        // 必须是1开头，第二位数字可以是3|5|6|7|8|9任意一个，总长为11
        // let reg = /^1([3|5|6|7|8|9])\d{9}$/;
        if (reg.test(p)) {
          return true;
        } else {
          return false;
        }
      }
    },

    //网络请求
    getLoginPhoneFun() {
      getLoginPhone(this.account, this.passWord).then(res => {
        if (res) {
          if (res.code === 200) {//登录成功
            this.$cookies.set("token", res.cookie)
            this.$cookies.set("userId", res.profile.userId)
            this.loginFailed = ''
            console.log(res);
            // this.$router.go(0)
          } else {//登录失败
            this.loginFailed = res.msg
            console.log(res.msg);
          }
        } else {//账号不存在或者密码超过限制
          this.loginFailed = '登陆失败,请检查账号是否存在或密码是否正确'
        }
      })
    },
  },
  components: {
    LoginQr

  },
  mounted() {
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
.loginView {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);

  .login {
    width: 700px;
    height: 450px;
    background: #fff;
    text-align: center;

    .title {
      position: relative;
      line-height: 55px;
      border: 1px solid #f2f2f2;

      > span {
        position: absolute;
        top: -10px;
        right: 8px;
        display: inline-block;
        font-size: 24px;
        cursor: pointer;
      }

      > span:after {
        content: "×";
      }

      > span:hover {
        color: #2caf6f;
      }

      div {
        display: inline-block;
        cursor: pointer;
        margin: 0 60px;
      }

      div:nth-child(1) {
        color: #000;
      }

      div:nth-child(2) {
        color: #31c27c;
      }

      .title:hover {
        color: #31c27c !important;
      }
    }

    .isActive {
      div:nth-child(1) {
        color: #31c27c;
      }

      div:nth-child(2) {
        color: #000;
      }
    }

    .info {
      height: 300px;

      > div {
        .infoTitle {
          font-size: 20px;
          margin-top: 15px;
          margin-bottom: 16px;
        }

      }

      .accountLogin {
        .hint {
          margin: 0 auto 36px;
          font-size: 16px;
          color: #666;

          span {
            cursor: pointer;
            color: #1E6FFF;
          }
        }

        .textInput {
          position: relative;
          width: 280px;
          margin: 0 auto;

          .point {
            height: 21px;
            margin: 2px 0 6px;
            text-align: left;
            line-height: 21px;
            font-size: 12px;
            color: red;

            i {
              position: relative;
              top: 4px;
              display: inline-block;
              width: 18px;
              height: 18px;
              margin-right: 8px;
              background: url("~@/assets/image/login/icon.png") 0 -162px;
            }
          }

          .passwordFocus, .accountFocus {
            border: 1px solid #1E6FFF;
          }

          > div {
            width: 280px;
            border: 1px solid #CBCDD1;
            border-radius: 2px;
            background: 0 0;
            margin-top: 22px;

            input {
              width: 258px;
              position: relative;
              top: 0px;
              left: 2px;
              height: 18px;
              padding: 10px 0 10px 0px;
              line-height: 18px;
              border: none;
              outline: none;
              background: 0 0;
              color: #333;
              font-family: Verdana, Tahoma, Arial;
              font-size: 15px;
            }

            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
              -webkit-appearance: none;
            }

            input[type="number"] {
              -moz-appearance: textfield;
            }
          }

          .login_button {
            cursor: pointer;
            background: #1E6FFF;
            color: #fff;
            height: 40px;
            margin-top: 0;
            line-height: 40px;
            font-size: 17px;
            letter-spacing: -2px;
          }

          .account {
            i {
              width: 21px;
              height: 21px;
              cursor: pointer;
              position: absolute;
              right: 15px;
              top: 10px;
              background: url("~@/assets/image/login/icon.png") -116px -160px no-repeat;
            }
          }
        }
      }

      .qrCode {

      }
    }

    .down {
      line-height: 40px;
      padding: 14px 0 24px;
      overflow: hidden;
      text-align: center;

      a {
        display: inline-block;
        background-image: linear-gradient(90deg, #24ccaa, #31c27c);
        padding: 0 30px;
        border-radius: 20px;
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>