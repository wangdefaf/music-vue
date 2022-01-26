<template>
  <div id="video">
    <div id="videoPlay" @mouseenter="moveVideo()" @mouseleave="overVideo()">
      <video
          ref="video"
          :src="mvUrl.url"
          autoplay
          height="675"
          width="1200"
          @click="playPause()"
          @ended="videoEnded"
          @playing="videoPlaying()"
          @timeupdate="videoTimeChange()"
          @waiting="videoWaiting()"
      />
      <div v-if="isVideoTool" class="videoTool">
        <div class="sliderVideo">
          <el-slider
              v-model="sliderNum"
              :format-tooltip="formatTooltip"
              class="slider"
              @change="sliderNumChange"
          ></el-slider>
        </div>
        <div class="playButtons">
          <div class="leftButton">
            <div class="playButton" @click="playPause()">
              <i :class="{'pause':!isPaused}"></i>
            </div>
            <div class="duration">
          <span
              v-if="$refs.video&&$refs.video.currentTime">
          {{ $store.getters.second($refs.video.currentTime) }} /
          {{ $store.getters.second($refs.video.duration) }}
        </span>
            </div>
          </div>
          <div class="rightButton">
            <div class="sound">
              <div class="sliderDiv">
                <div class="slider">
                  <el-slider
                      v-model="sound"
                      :show-tooltip="false"
                      height="94px"
                      vertical
                      @input="soundChange"
                  ></el-slider>
                  <div class="arrow"></div>
                </div>
              </div>
              <i v-if="$refs.video&&$refs.video.volume+1" :class="{'isMute':!$refs.video.volume}"></i>
            </div>
            <div class="loop" @click="loopClick">
              <i :class="{'isLoop':isloop}"></i>
            </div>
            <div class="resolution">
              <div v-if="isResolution">
              <span v-for="(item,index) in resolution" :class="{'isColor':index === resolutionInd}"
                    @click="cutoverResolution(index,item.br)">
                {{ item.text }}{{ item.br }}P
              </span>
                <div class="arrow"></div>
              </div>
              <span v-if="resolution[0]&&resolution[0].text"
                    @click="resolutionClick">{{ resolution[resolutionInd].text }}</span>
            </div>
            <div class="fullScreen" @click="fullScreen()">
              <i></i>
            </div>
          </div>
        </div>

      </div>
      <div v-if="isLoad" class="load">
        <loading/>
      </div>
    </div>
    <div id="videoInfo">
      <div class="left">
        <h1 :title="mvDet.name">{{ mvDet.name }}</h1>
        <span>播放量: {{ $store.getters.playCount(mvDet.playCount) }}</span>
      </div>
      <div class="right">
        <div class="like">
          <i></i>
        </div>
        <span></span>
        <div class="comment">
          <a href="#comment">
            <span>{{ mvDet.commentCount >= 999 ? '999+' : mvDet.commentCount }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getMvDet, getMvSimi, getMvUrl} from "@/network/getdata/MV";
import Loading from "@/components/common/loading/loading";

export default {
  name: "videoVue",
  components: {Loading},
  data() {
    return {
      sliderNum: 0,
      isPaused: false,
      playIcon: false,
      isloop: false,
      isLoad: false,
      isResolution: false,
      isVideoTool: false,
      resolution: [],
      resolutionInd: 0,
      sound: 50,
      mvDet: {},
      mvSimi: [],
      mvUrl: {},
    }
  },
  methods: {
    //video相关操作方法
    moveVideo() {
      this.isVideoTool = true
      console.log('鼠标经过触发');
    },
    overVideo() {
      this.isVideoTool = false
      console.log('鼠标离开触发');
    },
    playPause() {//点击暂停
      let myVideo = this.$refs.video
      myVideo.paused ? myVideo.play() : myVideo.pause()
      myVideo.paused ? this.isPaused = true : this.isPaused = false
      console.log(myVideo.paused, this.$refs.video);
    },
    fullScreen() {
      let videoBox = this.$refs.video
      if (videoBox.requestFullscreen) {
        videoBox.requestFullscreen();
      } else if (videoBox.mozRequestFullScreen) {
        videoBox.mozRequestFullScreen();
      } else if (videoBox.webkitRequestFullScreen) {
        videoBox.webkitRequestFullScreen();
      }
    },
    videoEnded() {//mv播放完毕
      console.log('播放完毕');
      if (!this.isloop) {
        this.$refs.video.currentTime = 0
        this.$refs.video.pause()
        this.isPaused = true
      } else {
        this.$refs.video.currentTime = 0
        this.$refs.video.play()
      }
    },
    videoTimeChange() {//mv进度变化的时候触发
      let myVideo = this.$refs.video
      let num = myVideo.currentTime / myVideo.duration * 100
      this.sliderNum = parseInt(num);
    },
    sliderNumChange(val) {//拖拽mv进度条触发
      this.$refs.video.currentTime = parseInt(val / 100 * this.$refs.video.duration)
      this.$refs.video.play()
      console.log(val, '改变后');
    },
    videoWaiting() {//加载mv触发
      console.log('开始缓冲');
      this.isLoad = true
      this.isPaused = true
    },
    videoPlaying() {//加载完毕
      this.isLoad = false
      this.isPaused = false
      console.log('加载完毕');
    },
    soundChange() {//拖拽音量进度条触发
      this.$refs.video.volume = this.sound / 100
    },
    loopClick() {//点击切换循环模式
      this.isloop = !this.isloop
    },
    resolutionClick() {//点击显示清晰度切换界面
      this.isResolution = !this.isResolution
    },
    cutoverResolution(index, br) {//点击切换分辨率
      this.resolutionInd = index
      this.isResolution = false
      this.getMvUrlFun(this.$route.params.id, br)
    },
    formatTooltip(val) {//格式化进度条提示
      let num = parseInt(this.$refs.video.duration / 100 * val)
      return this.realFormatSecond(num)
    },
    realFormatSecond(timeDisplay) {//格式化 xx:xx
      //分钟
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    },
    //网络请求
    getMvDetFun(id) {
      getMvDet(id).then(res => {
        this.mvDet = res.data
        res.data.brs.sort((a, b) => {
          return b.br - a.br
        })
        this.resolution = res.data.brs
        for (let item of this.resolution) {
          if (item.br === 240) item.text = '标清'
          else if (item.br === 480) item.text = '高清'
          else if (item.br === 720) item.text = '超清'
          else if (item.br === 1080) item.text = '全高清'
        }
        console.log(this.mvDet, '详情');
      })
    },
    getMvSimiFun(id) {
      getMvSimi(id).then(res => {
        this.mvSimi = res.mvs
        console.log(this.mvSimi, '相似');
      })
    },
    getMvUrlFun(id, br) {
      getMvUrl(id, br).then(res => {
        this.mvUrl = res.data
        console.log(this.mvUrl, 'MV地址');
      })
      return this.mvUrl
    },

  },
  mounted() {
    this.$refs.video.play()
  },
  beforeRouteLeave() {
    this.$refs.video.pause()
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.getMvDetFun(id)
        this.getMvSimiFun(id)
        this.getMvUrlFun(id)
      }
    }
  },
  created() {
    let id = this.$route.params.id
    this.getMvDetFun(id)
    this.getMvSimiFun(id)
    this.getMvUrlFun(id)
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  position: absolute;
  bottom: -8px;
  left: 15px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(0, 0, 0, .8);
}

#video {
  width: 100%;
  background: #333;

  #videoPlay {
    width: 1200px;
    margin: 0 auto;
    position: relative;

    > video {
      background: #000;
    }

    font-size: 14px;

    i {
      display: inline-block;
      background: url("~@/assets/image/video/icon.png");
      cursor: pointer;
    }

    .load {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #0f0f0f;

      .videoTool {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 52px;
        z-index: 5;

        .sliderVideo {
          height: 6px;

          .slider {
            width: 100%;

            ::v-deep .el-slider__bar {
              height: 3px;
              cursor: pointer;
              background: #31c27c;
              transition: height .1s;
            }

            ::v-deep .el-slider__runway {
              width: 100%;
              height: 3px;
              margin: 0;
              background: rgba(255, 255, 255, .2);
              transition: height .1s;
              vertical-align: middle;
            }

            ::v-deep .el-slider__button {
              border: 0;
            }

            ::v-deep .el-slider__button-wrapper {
              display: none;
            }

            ::v-deep .el-slider__runway:hover {
              height: 6px;
              transition: height .1s;

              .el-slider__button-wrapper {
                display: block;
              }

              .el-slider__bar {
                height: 6px;
                transition: height .1s;
              }
            }
          }

        }

        .playButtons {
          position: relative;

          > div {
            display: flex;
            position: absolute;
          }

          .leftButton {
            left: 0;

            .playButton {
              width: 50px;
              height: 45px;
              text-align: center;
              line-height: 45px;

              i {
                width: 14px;
                height: 20px;
              }

              .pause {
                background-position-x: -17px
              }
            }

            .duration {
              margin-left: 16px;
              font-size: 14px;
              color: #fff;
              line-height: 38px;
            }

            .playButton:hover {
              i {
                background-position-y: -20px;
              }
            }
          }

          .rightButton {
            right: 0;

            .sound {
              width: 50px;
              height: 45px;
              line-height: 45px;

              i {
                width: 25px;
                height: 20px;
                background-position-x: 70px;
              }

              .isMute {
                width: 27px;
                background-position-x: 100px;
              }

              .sliderDiv {
                position: absolute;
                top: -135px;
                left: -12px;
                padding-bottom: 20px;

                .slider {
                  position: relative;
                  display: none;
                  padding: 10px 22px 10px 22px;
                  background: rgba(0, 0, 0, .8);

                  ::v-deep .el-slider__bar {
                    width: 3px;
                    cursor: pointer;
                    background: #31c27c;
                    transition: height .1s;
                  }

                  ::v-deep .el-slider__runway {
                    width: 3px;
                    margin: 0;
                    background: rgba(255, 255, 255, .2);
                    transition: height .1s;
                    vertical-align: middle;
                  }

                  ::v-deep .el-slider__button {
                    width: 11px;
                    height: 11px;
                    border: 0;
                    position: relative;
                    right: 2px;
                  }

                  ::v-deep .el-slider__runway:hover {
                    .el-slider__button-wrapper {
                      display: block;
                    }
                  }

                  .arrow {
                    position: absolute;
                    bottom: -8px;
                    left: 15px;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid rgba(0, 0, 0, .8);
                  }
                }
              }
            }

            .sound:hover {
              .slider {
                display: block;
              }

              i:hover {
                background-position-y: -21px;
              }
            }

            .loop {
              width: 50px;
              height: 45px;
              line-height: 45px;

              i {
                width: 24px;
                height: 21px;
                background-position-x: 154px;
              }
            }

            .loop:hover {
              i {
                background-position-y: -21px;
              }
            }

          }
        }
      }
    }

    .videoTool {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 52px;
      z-index: 5;

      .sliderVideo {
        height: 6px;

        .slider {
          width: 100%;

          ::v-deep .el-slider__bar {
            height: 3px;
            cursor: pointer;
            background: #31c27c;
            transition: height .1s;
          }

          ::v-deep .el-slider__runway {
            width: 100%;
            height: 3px;
            margin: 0;
            background: rgba(255, 255, 255, .2);
            transition: height .1s;
            vertical-align: middle;
          }

          ::v-deep .el-slider__button {
            border: 0;
          }

          ::v-deep .el-slider__button-wrapper {
            display: none;
          }

          ::v-deep .el-slider__runway:hover {
            height: 6px;
            transition: height .1s;

            .el-slider__button-wrapper {
              display: block;
            }

            .el-slider__bar {
              height: 6px;
              transition: height .1s;
            }
          }
        }

      }

      .playButtons {
        position: relative;

        > div {
          display: flex;
          position: absolute;
        }

        .leftButton {
          left: 0;

          .playButton {
            width: 50px;
            height: 45px;
            text-align: center;
            line-height: 45px;

            i {
              width: 14px;
              height: 20px;
            }

            .pause {
              background-position-x: -17px
            }
          }

          .duration {
            margin-left: 16px;
            font-size: 14px;
            color: #fff;
            line-height: 38px;
          }

          .playButton:hover {
            i {
              background-position-y: -20px;
            }
          }
        }

        .rightButton {
          text-align: center;
          right: 0;

          .sound {
            width: 50px;
            height: 45px;
            line-height: 45px;

            i {
              width: 25px;
              height: 20px;
              background-position-x: 70px;
            }

            .isMute {
              width: 27px;
              background-position-x: 100px;
            }

            .sliderDiv {
              position: absolute;
              top: -135px;
              left: 3px;
              padding-bottom: 20px;

              .slider {
                position: relative;
                display: none;
                padding: 10px 22px 10px 22px;
                background: rgba(0, 0, 0, .8);

                ::v-deep .el-slider__bar {
                  width: 3px;
                  cursor: pointer;
                  background: #31c27c;
                  transition: height .1s;
                }

                ::v-deep .el-slider__runway {
                  width: 3px;
                  margin: 0;
                  background: rgba(255, 255, 255, .2);
                  transition: height .1s;
                  vertical-align: middle;
                }

                ::v-deep .el-slider__button {
                  width: 11px;
                  height: 11px;
                  border: 0;
                  position: relative;
                  right: 2px;
                }

                ::v-deep .el-slider__runway:hover {
                  .el-slider__button-wrapper {
                    display: block;
                  }
                }
              }
            }
          }

          .sound:hover {
            .slider {
              display: block;
            }

            i:hover {
              background-position-y: -21px;
            }
          }

          .loop {
            width: 50px;
            height: 45px;
            line-height: 45px;

            i {
              width: 26px;
              height: 21px;
              background-position-x: 155px;
            }

            .isLoop {
              background-position-x: 128px;
            }
          }

          .loop:hover {
            i {
              background-position-y: -21px;
            }
          }

          .resolution {
            width: 74px;
            height: 37px;
            line-height: 37px;
            text-align: center;
            font-size: 14px;
            color: #fff;
            cursor: pointer;

            > span {
              display: inline-block;
              width: 56px;
              height: 25px;
              border: 1px solid currentColor;
              border-radius: 56px;
              margin: 6px 8px 0 8px;
              line-height: 25px;
            }

            > div {
              position: absolute;
              bottom: 70px;
              right: 27px;
              width: 117px;
              padding: 3px 0;
              background: rgba(0, 0, 0, .8);
              border-radius: 3px;
              font-size: 14px;
              box-sizing: border-box;

              span {
                display: block;
                text-align: center;
                cursor: pointer;
                color: #999;
                height: 36px;
                line-height: 36px;
              }

              .isColor {
                color: #31c27c;
              }

              .arrow {
                left: 50px;
              }
            }
          }

          .resolution:hover {
            color: #31c27c;

            > span {
              border: 1px solid #31c27c;
            }
          }

          .fullScreen {
            width: 50px;
            height: 45px;
            line-height: 45px;

            i {
              width: 19px;
              height: 19px;
              background-position-x: 230px;
              background-position-y: -1px;
            }
          }

          .fullScreen:hover {
            i {
              background-position-y: -22px;
            }
          }
        }
      }
    }
  }

  #videoInfo {
    position: relative;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    height: 78px;
    color: #fff;
    line-height: 78px;

    > div {
      display: flex;
    }

    .left {
      h1 {
        max-width: 450px;
        margin: 0;
        margin-right: 10px;
        font-size: 22px;
        font-weight: 400;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      span {
        font-size: 14px;
        color: #999;
      }
    }

    .right {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;

      > span {
        display: inline-block;
        width: 20px;
        height: 11px;
        margin-right: 20px;
        border-right: 1px dotted #5b5b5c;
        vertical-align: middle;
      }

      .like {
        i {
          display: inline-block;
          width: 20px;
          height: 19px;
          background: url("~@/assets/image/public/icon-min.png") 40px 156px;
          cursor: pointer;
        }

        i:hover {
          background-position: 40px 136px;
        }
      }

      .comment {
        width: 30px;

        a {
          position: relative;
          display: inline-block;
          width: 21px;
          height: 20px;
          margin-right: 40px;
          background: url("~@/assets/image/comment/comment.png") -25px -100px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;

          span {
            display: inline-block;
            position: absolute;
            width: 30px;
            right: -25px;
            top: -42px;
            font-size: 10px;
          }
        }

        a:hover {
          background-position: -25px -150px;

          span {
            color: #31c27c;
          }
        }
      }
    }
  }
}

</style>