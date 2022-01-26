<template>
  <div id="video">
    <audio
        ref="video"
        :src="songUrl"
        autoplay
        @ended="videoEnded"
        @timeupdate="videoTimeChange()"
    />
    <div class="videoTool">
      <div class="playButtonL">
        <i class="preSong" @click="preSong"></i>
        <i
            v-if="$refs.video&&$refs.video.paused+''"
            :class="{'pause':isPaused}"
            class="play"
            @click="playPause()"></i>
        <i class="nextSong" @click="nextSong"></i>
      </div>
      <div class="sliderVideo">
        <div class="info">
            <span class="name">
              <router-link :to="{name:'songDet',params:{id:playlist[playIndex].id}}"
                           target="_blank">{{ playlist[playIndex].name }}</router-link> -
              <router-link :to="{name:'singerDet',params:{id:playlist[playIndex].ar[0].id}}"
                           target="_blank">{{ playlist[playIndex].ar[0].name }}</router-link>
            </span>
          <span v-if="$refs.video&&$refs.video.currentTime" class="duration">
              {{ currentTime }} /
              {{ $store.getters.second($refs.video.duration) }}
            </span>
        </div>
        <el-slider
            v-model="sliderNum"
            :format-tooltip="formatTooltip"
            class="slider"
            @change="sliderNumChange"
        ></el-slider>
      </div>
      <div class="playButtonR">
        <div :title="playTitle[playMode]" class="loop" @click="loopClick">
          <i :class="'playmode'+playMode"></i>
        </div>
        <div class="songlike" @click="likeSong(playlist[playIndex])">
          <i :class="{islike:playlist[playIndex].rtype}"></i>
        </div>
        <div id="sound">
          <i
              v-if="$refs.video&&$refs.video.volume+1"
              :class="{'isMute':!sound}"
              class="notMute"
              @click="muteClick"></i>
          <el-slider
              v-model="sound"
              :show-tooltip="false"
              class="slider"
              @input="soundChange"
          ></el-slider>
        </div>
      </div>
    </div>
    <div v-if="isPlay" class="warn">
      <div class="clearList">
        <h2>QQ音乐提醒您<span @click="isPlayClick">×</span></h2>
        <div class="inner">
          <i></i>
          <span>由于您的浏览器设置，音乐无法自动播放，请手动点击播放。</span>
        </div>
        <div class="btn">
          <div @click="isPlayClick">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSongLike, getSongUrl} from "@/network/getdata/Song";
import Loading from "@/components/common/loading/loading";

export default {
  name: "playerBar",
  components: {Loading},
  data() {
    return {
      sliderNum: 0,
      isPaused: true,
      playIcon: false,
      isloop: false,
      isPlay: true,
      sound: 50,
      snapSound: 50,
      songUrl: '',
      playMode: 0,
      currentTime: '00:00',
      playTitle: ['列表循环', '单曲循环', '顺序循环', '随机播放']
    }
  },
  computed: {
    playlist() {
      return this.$store.state.playlist
    },
    playIndex() {
      return this.$store.state.playIndex
    },
    videoPaused() {
      return this.$refs.video.paused
    }
  },
  methods: {
    preSong() {
      let index = this.$store.state.playIndex
      let length = this.$store.state.playlist.length - 1
      if (index === 0) {
        this.$store.commit('playIndexChange', length)
      } else {
        this.$store.commit('playIndexChange', index - 1)
      }
    },
    nextSong() {
      let index = this.$store.state.playIndex
      let length = this.$store.state.playlist.length - 1
      if (index === length) {
        this.$store.commit('playIndexChange', 0)
      } else {
        this.$store.commit('playIndexChange', index + 1)
      }
    },
    isPlayClick() {
      //交互
      this.isPlay = false
      this.$refs.video.play()
      this.isPaused = this.$refs.video.paused
    },
    //收藏歌曲
    likeSong(item) {
      if (this.$cookies.get('userId')) {
        getSongLike(item.id, Boolean(item.rtype)).then(data => {
          item.rtype ? item.rtype = 0 : item.rtype = 1
          console.log(data);
        })
      } else {
        this.$emit('showLogin')
      }
    },
    //video相关操作方法
    playPause() {//点击暂停
      let video = this.$refs.video
      video.paused ? video.play() : video.pause()
      this.isPaused = video.paused

    },
    videoEnded() {//mv播放完毕
      // playTitle:['列表循环','单曲循环','顺序循环','随机播放']
      console.log('播放完毕');
      let playlist = this.$store.state.playlist
      let index = this.$store.state.playIndex
      switch (this.playMode) {
        case 0://列表循环
          if (index !== playlist.length - 1) {
            index++
          } else index = 0
          this.$store.commit('playIndexChange', index)
          console.log(index, '列表循环');
          break;
        case 1://单曲循环
          this.$refs.video.currentTime = 0
          break;
        case 2://顺序循环
          if (index !== playlist.length - 1) {
            index++
          } else index = 0
          this.$store.commit('playIndexChange', index)
          console.log(index, '列表循环');
          break;
        case 3://随机播放
          let playindex = Math.floor(Math.random() * playlist.length);
          this.$store.commit('playIndexChange', playindex)
          console.log('随机播放');
          break;
      }
      this.$refs.video.play()
    },
    videoTimeChange() {//mv进度变化的时候触发
      let myVideo = this.$refs.video
      let num = myVideo.currentTime / myVideo.duration * 100
      let g = Math.floor(myVideo.currentTime);
      this.$store.commit('songCurrentTimeChange', g)
      this.currentTime = this.$store.getters.second(myVideo.currentTime)
      this.sliderNum = parseInt(num);
    },
    sliderNumChange(val) {//拖拽mv进度条触发
      this.$refs.video.currentTime = parseInt(val / 100 * this.$refs.video.duration)
      this.$refs.video.play()
      console.log(val, '改变后');
    },
    soundChange(value) {//拖拽音量进度条触发
      this.$refs.video.volume = value / 100
      value !== 0 ? this.snapSound = value : this.snapSound = 50
    },
    muteClick() {
      this.sound ? this.sound = 0 : this.sound = this.snapSound
      console.log(this.snapSound);
    },
    loopClick() {//点击切换循环模式
      this.playMode !== 3 ? this.playMode++ : this.playMode = 0
      console.log(this.playMode);
    },
    formatTooltip(val) {//格式化进度条提示
      let num = parseInt(this.$refs.video.duration / 100 * val)
      return this.$store.getters.second(num)
    },
    //网络请求
    getMvUrlFun(id) {
      getSongUrl(id).then(res => {
        this.songUrl = res.data[0].url
        console.log(res.data, this.songUrl, 'MV地址');
      })
    },

  },
  created() {
    let value = this.$store.state.playlist
    this.getMvUrlFun(value[0].id)
  },
  watch: {
    '$store.state.playIndex'(index) {
      let value = this.$store.state.playlist
      this.getMvUrlFun(value[index].id)
      console.log('state值改变了歌词', value[index].id);
    },
    '$store.state.playlist'(value) {
      let index = this.$store.state.playIndex
      this.getMvUrlFun(value[index].id)
      console.log('state值改变了歌词', value[index].id);
    }
  }
}
</script>

<style lang="scss" scoped>
#video {
  width: 83%;
  margin: 0 auto;
  height: 66px;
  position: relative;
  z-index: 10;
  font-size: 14px;

  i {
    display: inline-block;
    background: url("~@/assets/image/player/icon.png");
    cursor: pointer;
  }

  .warn {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: rgba(0, 0, 0, .3);

    > div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #bfbfbf;
    }

    .clearList {
      width: 440px;
      background: #fff;

      h2 {
        position: relative;
        text-align: center;
        line-height: 55px;
        font-weight: normal;
        font-size: 16px;
        color: #333;
        border-bottom: 1px solid #f2f2f2;
      }

      h2 span {
        position: absolute;
        right: 10px;
        top: -10px;
        color: hsla(0, 0%, 88.2%, .8);
        font-size: 22px;
        font-weight: 800;
        cursor: pointer;
      }

      h2 span:hover {
        color: #31c27c;
      }

      .inner {
        margin-top: 30px;
        padding: 0 40px;
        position: relative;
        margin-bottom: 48px;

        i {
          display: inline-block;
          width: 48px;
          height: 48px;
          margin-right: 20px;
          background: url("~@/assets/image/login/icon_popup.png");
        }

        span {
          position: relative;
          bottom: 10px;
          display: inline-block;
          width: 80%;
          color: #999;
          font-size: 14px;
        }
      }

      .btn {
        cursor: pointer;
        padding: 0 20px 0;
        height: 60px;
        text-align: right;

        > div {
          display: inline-block;
          min-width: 122px;
          border: 1px solid #c9c9c9;
          margin: 0 3px;
          padding: 0 23px;
          height: 38px;
          font-size: 14px;
          color: #333;
          text-align: center;
          line-height: 38px;
          white-space: nowrap;
          box-sizing: border-box;
          overflow: hidden;
          border-radius: 2px;
        }

        .define {
          color: #fff;
          background: #31c27c;
          cursor: pointer;
        }

        .define:hover {
          background: #2caf6f;;
        }

        > div:hover {
          background: #ededed;
        }
      }
    }
  }

  .videoTool {
    display: flex;
    width: 100%;
    z-index: 5;

    .playButtonL {
      flex: 12;
      padding-top: 13px;
      min-width: 150px;

      > i {
        opacity: .8;
      }

      > i:hover {
        opacity: 1;
      }

      .preSong {
        width: 19px;
        height: 20px;
        background-position: 0 -30px;
      }

      .play, .pause {
        width: 21px;
        height: 29px;
        margin: 0 35px;
        background-position: -30px 0;
      }

      .pause {
        background-position: 0 0;
      }

      .nextSong {
        width: 19px;
        height: 20px;
        background-position: 0 -52px;
      }

      .nextSong, .preSong {
        margin-bottom: 5px;
      }
    }

    .sliderVideo {
      flex: 60;
      font-size: 14px;
      color: #e1e1e1cc;

      .info {
        width: 100%;
        position: relative;
        line-height: 38px;

        .name {
          a {
            color: #e1e1e1cc;
            cursor: pointer;
          }

          a:hover {
            color: #31c27c;
          }
        }

        .duration {
          position: absolute;
          right: 5px;
        }
      }

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

    .playButtonR {
      position: relative;
      display: flex;
      flex: 28;
      padding-top: 25px;

      i {
        display: inline-block;
        background: url("~@/assets/image/player/icon.png");
      }

      > div {
        margin: 0 15px;
      }

      #sound {
        display: flex;

        > i {
          width: 26px;
          height: 21px;
          opacity: .8;
          margin-right: 10px;
        }

        .notMute {
          background-position: 0 -144px;
        }

        .isMute {
          background-position: 0 -182px;
        }
      }

      #sound:hover {
        i:hover {
          opacity: 1;
        }
      }

      .slider {
        position: relative;
        top: 8px;
        margin-left: 5px;
        width: 80px;

        ::v-deep .el-slider__bar {
          height: 4px;
          cursor: pointer;
          background: #fff;
          transition: height .1s;
        }

        ::v-deep .el-slider__runway {
          width: 100%;
          height: 4px;
          background: hsla(0, 0%, 100%, .1);
          margin: 0;
          transition: height .1s;
          vertical-align: middle;
        }

        ::v-deep .el-slider__button {
          border: 0;
        }

        ::v-deep .el-slider__runway:hover {
          height: 4px;
          transition: height .1s;

          .el-slider__bar {
            transition: height .1s;
          }
        }
      }

      .songlike {
        i {
          width: 23px;
          height: 21px;
          opacity: .8;
          background-position: 0 -96px;
        }

        .islike {
          opacity: 1;
          background-position: -30px -96px;
        }
      }

      .loop {
        width: 26px;
        margin-left: 30px;

        i {
          width: 26px;
          height: 21px;
          opacity: .8;
          background-position-x: 155px;
        }

        .playmode0 {
          width: 26px;
          height: 25px;
          background-position: 0 -205px;
        }

        .playmode1 {
          width: 26px;
          height: 25px;
          background-position: 0 -232px;
        }

        .playmode2 {
          width: 23px;
          height: 20px;
          background-position: 0 -260px;
        }

        .playmode3 {
          width: 25px;
          height: 19px;
          background-position: 0 -74px;
        }

      }

      .loop:hover {
        i {
          opacity: 1;
        }
      }
    }
  }
}

</style>