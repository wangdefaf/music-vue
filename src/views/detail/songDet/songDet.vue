<template>
  <div id="albumDet" ref="albumDet">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else class="Counter">
      <div class="albumInfo">
        <div class="cover">
          <el-image :src="songInfo.al.picUrl+'?param=250y250'" class="pic">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
          <i></i>
        </div>
        <div class="info">
          <h2 class="title">{{ songInfo.name }}</h2>
          <div class="singer">
            <i></i>
            <router-link
                :to="{name:'singerDet',
              params:{id:songInfo.ar[0].id}}"
                tag="span"
            >
              {{ songInfo.ar[0].name }}
            </router-link>
          </div>
          <div class="mes">
            <div v-if="songSimi[0].album&&songSimi[0].album.name">专辑: {{ songSimi[0].album.name }}</div>
            <div v-if="songSimi[0].album&&songSimi[0].album.subType">类型: {{ songSimi[0].album.subType }}</div>
            <div v-if="songSimi[0].album&&songSimi[0].album.company">唱片公司: {{ songSimi[0].album.company }}</div>
            <div>发行时间: {{ $store.getters.Date(songInfo.publishTime) }}</div>
          </div>
          <div class="buttons">
            <div class="playAll" @click="playerChange(0)">
              <i></i>
              <span>播放</span>
            </div>
            <div class="keep" @click="playerChange(0)">
              <i></i>
              <span>收藏</span>
            </div>
            <a class="comment" href="#comment">
              <i></i>
              <span>评论</span>
            </a>
          </div>
        </div>
      </div>
      <div class="albumCounter">
        <div class="counter">
          <div v-if="!songLyric[0]" class="lyric not-lyric">
            <h2>歌词</h2>
            <div>暂无歌词</div>
          </div>
          <div v-else class="lyric">
            <h2>歌词</h2>
            <div :class="{'isOpenUp':isOpenUp}" class="lyrics">
              <div v-for="(item,index) in songLyric[0]" class="item">
                <p>{{ item }}</p>
                <p v-if="songLyric[1]">{{ songLyric[1][index] }}</p>
              </div>
            </div>
            <span @click="isOpenUp=!isOpenUp">
            <span v-if="!isOpenUp">[ 展开 ]</span>
            <span v-else>[ 收起 ]</span>
          </span>
          </div>
          <div class="albumComment" name="comment">
            <Comment :id="songInfo.id" :type="0"/>
          </div>
        </div>
        <div class="albumSide">
          <div v-if="songSimi[0]" class="otherAlbums">
            <h2>相似歌曲</h2>
            <div class="count">
              <router-link v-for="(item,index) in songSimi" :to="{name:'songDet',params:{id:item.id}}" class="item"
                           tag="div">
                <el-image :src="item.album.picUrl+'?param=76y76'" class="pic">
                  <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
                </el-image>
                <p>{{ item.name }}</p>
                <span>{{ $store.getters.Date(item.album.publishTime) }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {getSimiSong, getSongDet, getSongLyric} from "@/network/getdata/Song";
import Comment from "@/components/common/Comment/comment";
import Loading from "@/components/common/loading/loading";

export default {
  name: "songDet",
  components: {Loading, Comment},
  data() {
    return {
      songInfo: {al: {picUrl: ''}, ar: [{}]},
      songLyric: [[]],
      songSimi: [],
      songId: null,
      isOpenUp: false,
      isView: false,
      isLoad: true
    }
  },
  methods: {
    // 歌词切割
    lyricChange() {
      for (let i = 0; i < this.songLyric.length; i++) {
        if (this.songLyric[i]) {
          let lyrics = this.songLyric[i].split("\n");//rc代表歌词文件内容的引用
          let lrcObj = {};
          for (let i = 0; i < lyrics.length; i++) {
            let lyric = decodeURIComponent(lyrics[i]);
            let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            let timeRegExpArr = lyric.match(timeReg);
            if (!timeRegExpArr) continue;
            let clause = lyric.replace(timeReg, '');
            for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
              let t = timeRegExpArr[k];
              let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                  sec = Number(Str= ming(t.match(/\:\d*/i)).slice(1));
              let time in * 60 + sec;
              lrcObj[time] = clause;
            }
          }
          if (lyrics[0].charAt(0) == '[') {
            this.songLyric[i] = lrcObj
          } else this.songLyric[i] = lyrics
        }
      }
    },
    playerChange() {
      window.open('/player', 'player')
      let arr = [this.songInfo]
      localStorage.setItem('playerData', JSON.stringify(arr))
    },
    //网络请求
    getSongDetFun(id) {
      return getSongDet(id).then(res => {
        console.log('songDet', res, id);
        this.songInfo = res.songs[0]
        return res.songs[0]
      })
    },
    getSongLyricFun(id) {
      return getSongLyric(id).then(res => {

        if (res.lrc) {
          if (res.tlyric) {
            this.songLyric = [[], []]
            this.$set(this.songLyric, [1], res.tlyric.lyric)
          }
          this.$set(this.songLyric, [0], res.lrc.lyric)
          console.log(this.songLyric[0], '赋完值的歌词1');
          this.lyricChange()
          return res
        } else {
          return '暂无歌词'
        }
      })
    },
    getSimiSongFun(id) {
      return getSimiSong(id).then(res => {
        this.songSimi = res.songs
        console.log('相似歌曲');
        return res.songs
      })
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        this.songId = this.$route.params.id
        this.isLoad = true
        Promise.all([
          this.getSongDetFun(this.songId),
          this.getSongLyricFun(this.songId),
          this.getSimiSongFun(this.songId)
        ]).then(res => {
          this.isLoad = false
          console.log(this.songLyric[0]);
          console.log('请求完成');
        })
      }
    }
  },
  created() {
    this.songId = this.$route.params.id
    this.isLoad = true
    Promise.all([
      this.getSongDetFun(this.songId),
      this.getSongLyricFun(this.songId),
      this.getSimiSongFun(this.songId)
    ]).then(res => {
      this.isLoad = false
      console.log(this.songLyric[0]);
      console.log('请求完成');
    })
  }
}
</script>

<style lang="scss" scoped>
#albumDet {
  position: relative;
  width: 1200px;
  min-height: 700px;
  padding-top: 30px;
  margin: 0 auto;

  .albumInfo {
    display: flex;

    .cover {
      position: relative;
      width: 283px;
      height: 250px;
      margin-right: 50px;

      .image-slot {
        width: 250px;
        height: 250px;
      }

      i {
        display: inline-block;
        position: absolute;
        left: 0;
        width: 283px;
        height: 250px;
        background: url("~@/assets/image/album/cover.png");
      }
    }

    .info {
      .title {
        margin-top: 13px;
        line-height: 50px;
        font-size: 31px;
        font-weight: normal;
      }

      .singer {
        line-height: 26px;

        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-right: 7px;
          background: url("~@/assets/image/public/icon-min.png") -20px -240px;
        }

        span {
          cursor: pointer;
          color: #333;
        }

        span:hover {
          color: #31c27c;
        }
      }

      .mes {
        display: flex;
        width: 520px;
        margin: 15px 0;
        flex-wrap: wrap;
        font-size: 14px;

        > div {
          width: 250px;
          margin-right: 10px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }
      }

      .buttons {
        margin-top: 20px;

        > div, > a {
          display: inline-block;
          min-width: 122px;
          cursor: pointerx;
          text-align: center;
          padding: 0 18px;
          border: 1px solid #c9c9c9;
          border-radius: 2px;
          font-size: 14px;
          margin-right: 6px;
          height: 38px;
          line-height: 38px;
          white-space: nowrap;
          box-sizing: border-box;
          overflow: hidden;
        }

        i {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-right: 6px;
          background-image: url("~@/assets/image/public/icon-min.png");
        }

        .playAll {
          color: #fff;
          border: 1px solid #31c27c;
          background-color: #31c27c;

          i {
            width: 13px;
            height: 16px;
            background-position: -80px -220px;
            vertical-align: -3px;
          }
        }

        .playAll:hover {
          background-color: #2caf6f;
          border-color: #2caf6f;
        }

        .keep {
          i {
            width: 16px;
            height: 16px;
            vertical-align: -4px;
            background-position: -60px 0;
          }
        }

        .comment {
          text-decoration: none;

          span {
            color: #000;
          }

          i {
            width: 16px;
            height: 16px;
            background-position: -140px -120px;
            vertical-align: -3px;
          }
        }
      }
    }
  }

  .albumCounter {
    display: flex;

    .counter {
      flex: 71;

      .not-lyric {

      }

      .lyric {
        h2 {
          font-size: 20px;
          font-weight: 400;
          //margin-right: 10px;
          margin: 40px 0 20px;
        }

        .lyrics {
          max-height: 422px;
          overflow: hidden;

          .item {
            line-height: 26px;

            p {
              font-size: 14px;
              color: #4f4f4f;
              line-height: 26px;
            }

          }
        }

        .isOpenUp {
          max-height: 9999px;
        }

        span {
          color: #31c27c;
          cursor: pointer;
        }
      }

      .albumSongs {
        margin: 50px 0 55px;
      }
    }

    .albumSide {
      flex: 29;
      box-sizing: content-box;
      padding-left: 30px;

      .otherAlbums {
        margin-top: 30px;

        h2 {
          font-size: 20px;
          font-weight: 400;
          line-height: 46px;
        }

        .count {
          display: flex;
          margin-top: 10px;
          flex-wrap: wrap;
          line-height: 22px;

          .item {
            width: 76px;
            margin-right: 33px;
            padding-bottom: 14px;
            margin-bottom: 20px;
            font-size: 14px;

            .pic {
              .image-slot {
                width: 76px;
                height: 76px;
              }
            }

            span {
              color: #c9c9c9;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

          .item:hover {
            cursor: pointer
          }
        }
      }
    }

  }

}
</style>