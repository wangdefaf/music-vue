<template>
  <div id="playerLyric">
    <div class="player_info">
      <div class="cover">
        <el-image :src="playlist[playIndex].al.picUrl+'?param=186y186'" class="pic">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <i></i>
      </div>
      <div class="info">
        <p>歌曲名：
          <router-link :to="{name:'songDet',params:{id:playlist[0].id}}" target="_blank">
            {{ playlist[playIndex].name }}
          </router-link>
        </p>
        <p>歌手：
          <router-link :to="{name:'singerDet',params:{id:playlist[0].ar[0].id}}" target="_blank">
            {{ playlist[playIndex].ar[0].name }}
          </router-link>
        </p>
        <p>专辑：<span>{{ playlist[playIndex].al.name }}</span></p>
      </div>
    </div>
    <div v-if="songLyric[0]"
         class="player_lyric"
         draggable="true">
      <div
          ref="lyric"
          class="lyric"
      >
        <div
            v-for="(item,index) in songLyric[0]"
            :ref="'lyricItem'"
            :class="{'on':index==LyricIndex}"
            class="item"
        >
          <p>{{ item }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getSongLyric} from "@/network/getdata/Song";

export default {
  name: "plyerLyric",
  data() {
    return {
      songLyric: [[], []],
      LyricIndex: 0,//当前播放的歌词的时间
      LyricArrIndex: 0,//当前播放的是第几句
    }
  },
  watch: {
    '$store.state.playIndex'(index) {
      let value = this.$store.state.playlist
      this.getSongLyricFun(value[index].id)
      this.$store.commit('songCurrentTimeChange', 0)
    },
    '$store.state.playlist'(value) {
      let index = this.$store.state.playIndex
      this.getSongLyricFun(value[index].id)
      this.$store.commit('songCurrentTimeChange', 0)
    },
    '$store.state.songCurrentTime'(value) {
      if (this.songLyric[0][value]) {
        this.LyricIndex = value
        let LyricArr = Object.getOwnPropertyNames(this.songLyric[0])//把歌词对象索引转化为数组
        this.LyricArrIndex = LyricArr.indexOf(this.LyricIndex + '')//获取当前播放到第几句
        if (this.LyricArrIndex >= 4) {
          this.$refs.lyric.style.bottom = (this.LyricArrIndex - 4) * 35 + 'px'
        }
      }
    }
  },
  computed: {
    playlist() {
      return this.$store.state.playlist
    },
    playIndex() {
      return this.$store.state.playIndex
    },
    itemHeight() {
      // return this.$refs.lyricItem[this.LyricArrIndex].offsetHeight
    }
  },
  methods: {
    getSongLyricFun(id) {
      getSongLyric(id).then(res => {
        console.log(res, '歌词');
        this.$set(this.songLyric, [0], res.lrc.lyric)
        this.$set(this.songLyric, [1], res.tlyric.lyric)
        this.lyricChange()
      })
    },
    // 歌词切割
    lyricChange() {
      for (let i = 0; i < this.songLyric.length; i++) {
        if (this.songLyric[i]) {
          console.log(this.songLyric, '又进来咯');
          let lyrics = this.songLyric[i].split("\n");//rc代表歌词文件内容的引用
          let lrcObj = {};
          for (let i = 0; i < lyrics.length; i++) {
            let lyric = decodeURIComponent(lyrics[i]);
            let timeReg = /\[\d*:\d*(([.:])\d*)*]/g;
            let timeRegExpArr = lyric.match(timeReg);
            if (!timeRegExpArr) continue;
            let clause = lyric.replace(timeReg, '');
            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
              let t = timeRegExpArr[k];
              let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                  sec = Number(String(t.match(/:\d*/i)).slice(1));
              let time = min * 60 + sec;
              lrcObj[time] = clause;
            }
          }
          this.$set(this.songLyric, [i], lrcObj)
        }
      }
    },
  },
  created() {
    let value = this.$store.state.playlist
    this.getSongLyricFun(value[0].id)
  }
}
</script>

<style lang="scss" scoped>
#playerLyric {
  .player_info {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 24px;

    .cover {
      position: relative;
      width: 186px;
      height: 186px;
      margin: 0 auto;

      .image-slot {
        width: 186px;
        height: 186px;
      }

      i {
        display: inline-block;
        position: absolute;
        left: 9px;
        top: 0;
        width: 201px;
        height: 180px;
        background: url("~@/assets/image/album/cover.png");
        background-size: 201px 180px;
      }
    }

    .info {
      margin-top: 15px;
      text-align: center;
      color: #e1e1e1cc;

      a {
        text-decoration: none;
        color: #e1e1e1cc;
        cursor: pointer;
      }

      a:hover {
        color: #fff;
      }
    }
  }

  .player_lyric {
    position: relative;
    margin-top: 40px;
    height: 345px;
    overflow: scroll;
    text-align: center;
    line-height: 35px;
    cursor: -webkit-grab;
    -webkit-mask-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0) 0, hsla(0, 0%, 100%, .6) 15%, #fff 25%, #fff 75%, hsla(0, 0%, 100%, .6) 85%, hsla(0, 0%, 100%, 0));

    .lyric {
      height: auto;
      position: relative;
      transition: all 0.1s ease-out 0s;

      .item {
        height: auto;

        p {
          font-size: 15px;
          color: #e1e1e1cc;
        }
      }

      .on {
        p {
          color: #31c27c;
        }
      }
    }

  }
}

::-webkit-scrollbar {
  display: none;
}

</style>