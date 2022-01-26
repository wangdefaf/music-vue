<template>
  <footer>
    <div class="counter">
      <div class="top">
        <div class="top_item">
          <p>下载QQ音乐客户端</p>
          <div class="icons">
            <div v-for="(item,index) in title" class="icon">
              <i :style="{'background-position-x':-93*index+1 + 'px'}"></i><br>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="top_item">
          <p>特色产品</p>
          <div class="icons">
            <div v-for="(item,index) in titleOne" class="icon">
              <i :style="{'background-position-x':432 + 92 * index + 'px'}"></i><br>
              <span>{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="top_item top_tag">
          <p>合作链接</p>
          <div class="icons tags">
            <div v-for="(item,index) in tag" class="icon tag">
              <span>{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div>
          <span v-for="(item,index) in b_list">{{ item }}</span>
        </div>
        <div><span>Copyright © 1998 - 2021 Tencent. All Rights Reserved.</span></div>
        <div>
          <span v-for="(item,index) in b_list2">{{ item }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "footerBar",
  data() {
    return {
      title: ['PC版', 'Mac版', 'Android版', 'iPhone版'],
      titleOne: ['全民K歌', 'Super Sound', 'QPlay', 'Fan直播伴侣'],
      tag: ['CJ ENM', '腾讯视频', '手机QQ空间', '最新版QQ',
        '腾讯社交广告', '电脑管家', 'QQ浏览器', '腾讯微云', '腾讯云',
        '企鹅FM', '智能电视网', '当贝市场', '酷我音乐', '酷狗听书'],

      b_list: ['关于腾讯', '| About Tencent', '| 服务条款',
        '| 用户服务协议', '| 隐私政策', '| 权利声明', '| 广告服务',
        '| 腾讯招聘', '| 客服中心', '| 网站导航'],

      b_list2: ['腾讯公司 版权所有', '｜营业执照', '｜网络文化经营许可证：粤网文[2020]3396-195号']

    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  padding-top: 80px;
  padding-bottom: 24px;
  background: #333;
  color: #999;

  .counter {
    width: 1200px;
    margin: 0 auto;

    .top {
      display: flex;
      justify-content: space-between;

      .top_item {
        > p {
          padding-left: 20px;
          margin-bottom: 30px;
          font-size: 15px;
        }

        .icons {
          display: flex;
          font-size: 14px;

          .icon {
            width: 90px;
            text-align: center;
            cursor: pointer;

            i {
              display: inline-block;
              width: 48px;
              height: 48px;
              margin-bottom: 15px;
              background: url("~@/assets/image/home/footerIcon.png");
            }
          }

          .icon:hover i, span {
            background-position-y: 47px;
          }

          .icon:hover span {
            color: #31c27c;
          }
        }

        .tags {
          width: 300px;
          flex-wrap: wrap;

          .tag {
            text-align: left;
            margin-bottom: 22px;
          }
        }

      }

      .top_tag {
        p {
          padding: 0;
        }
      }
    }

    .bottom {
      margin-top: 100px;
      text-align: center;

      div {
        margin: 20px 0;

        span {
          margin: 0 5px;
          cursor: pointer;
        }

        span:hover {
          color: #31c27c;
        }
      }
    }
  }

}
</style>