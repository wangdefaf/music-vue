<template>
  <div id="singerDetCounter">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else id="Counter">
      <div class="singerInfo">
        <el-image :src="singerInfo.artist.cover+'?param=250y250'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <div class="info">
          <div class="name">{{ singerInfo.artist.name }}</div>
          <div :title="singerInfo.artist.briefDesc" class="summary">{{ singerInfo.artist.briefDesc }}</div>
          <div class="amount">
            <div>单曲<span class="number">{{ singerInfo.artist.musicSize }}</span></div>
            <div>专辑<span class="number">{{ singerInfo.artist.albumSize }}</span></div>
            <div>MV<span class="number">{{ singerInfo.artist.mvSize }}</span></div>
          </div>
          <div class="button">
            <div class="play" @click="playerChange">
              <i></i>
              <span>播放歌手热门歌曲</span>
            </div>
            <div v-if="!isFollw" class="like" @click="follow">
              <i></i>
              <span>关注</span>
            </div>
            <div v-else class="like" @click="cancelFollow">
              <i></i>
              <span>已关注</span>
            </div>
          </div>
        </div>
      </div>
      <div class="counter">
        <h2>热门歌曲</h2>
        <songlist :goods="singerSong"></songlist>
        <more/>
      </div>
      <div v-if="singerAlbums[0]" class="Albums singerInfos">
        <div class="title">专辑</div>
        <div class="counter">
          <div v-for="(item,index) in singerAlbums" class="info">
            <el-image :src="item.picUrl+'?param=224y224'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
            <p>{{ item.name }}</p>
            <span>{{ $store.getters.Date(item.publishTime) }}</span>
            <div class="hoverInfo">
              <img src="~@/assets/image/public/playIcon.png"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="singerMV[0]" class="mv singerInfos">
        <div class="title">
          MV
        </div>
        <div class="counter">
          <div v-for="(item,index) in singerMV" class="info">
            <el-image :src="item.imgurl+'?param=224y127'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
            <p>{{ item.name }}</p>
            <span>{{ item.artistName }}</span><br>
            <span class="icon"></span>
            <span>{{ $store.getters.playCount(item.playCount) }}</span>
            <div class="hoverInfo">
              <img src="~@/assets/image/public/playIcon.png"/>
            </div>
          </div>
        </div>
      </div>
      <div v-if="singerSimi[0]" class="simi singerInfos">
        <div class="title">
          相似歌手
        </div>
        <div class="counter">
          <router-link v-for="(item,index) in singerSimi" :to="{name:'singerDet',params:{id:item.id}}" class="info"
                       tag="div" @click.native="TopBack()">
            <el-image :src="item.picUrl+'?param=140y140'" class="coverImg">
              <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
            </el-image>
            <br>
            <span>{{ item.name }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getArtistAlbum, getArtistDet, getArtistMV, getArtistSimi, getHotSong} from "@/network/getdata/Singer";
import {getFollow} from "@/network/getdata/user";
import Songlist from "@/components/common/songlist/songlist";
import More from "@/components/common/more/more";
import Loading from "@/components/common/loading/loading";

export default {
  name: "singerDet",
  components: {Loading, More, Songlist},
  data() {
    return {
      singerInfo: {artist: {}},
      singerSong: [],
      singerAlbums: [],
      singerMV: [],
      singerSimi: [],
      isFollw: false,
      id: null,
      isLoad: true
    }
  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.isLoad = true
        Promise.all([
          this.getArtistDetFun(id),
          this.getHotSongFun(id),
          this.getArtistAlbumFun(id),
          this.getArtistMVFun(id),
          this.getArtistSimiFun(id)
        ]).then(res => {
          this.isLoad = false
          console.log(res);
        })
      }
    }
  },
  created() {
    let id = this.$route.params.id
    this.isLoad = true
    Promise.all([
      this.getArtistDetFun(id),
      this.getHotSongFun(id),
      this.getArtistAlbumFun(id),
      this.getArtistMVFun(id),
      this.getArtistSimiFun(id)
    ]).then(res => {
      console.log(res, '请求完成');
      this.isLoad = false
    })
  },
  methods: {
    TopBack() {
      let clock = setInterval(function () {
        if (document.documentElement.scrollTop !== 0) {
          document.documentElement.scrollTop -= 40;
        } else {
          clearInterval(clock);
        }
      }, 2);
    },
    playerChange() {
      window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.singerSong))
      console.log(localStorage.getItem('playerData'));
    },
    follow() {
      // showLogin
      if (this.$cookies.get('userId')) {
        getFollow(this.singerInfo.artist.id, 1).then(res => {
          this.isFollw = true
        })
      } else this.$emit('showLogin')
    },
    cancelFollow() {
      if (this.$cookies.get('userId')) {
        getFollow(this.singerInfo.artist.id, 0).then(res => {
          this.isFollw = false
        })
      } else this.$emit('showLogin')

    },
    //网络请求
    getHotSongFun(id) {
      return getHotSong(id).then(res => {
        return this.singerSong = res.songs.splice(0, 10)
        // console.log(res,'热门歌前十曲');
      })
    },
    getArtistDetFun(id) {
      return getArtistDet(id).then(res => {
        console.log(res.data, '歌手详情')
        return this.singerInfo = res.data;
      })
    },
    getArtistAlbumFun(id) {
      return getArtistAlbum(id, 5).then(res => {
        return this.singerAlbums = res.hotAlbums
        // console.log(res.hotAlbums,'专辑');
      })
    },
    getArtistMVFun(id) {
      return getArtistMV(id).then(res => {
        return this.singerMV = res.mvs.splice(0, 5)
        // console.log(res.mvs,'mv');
      })
    },
    getArtistSimiFun(id) {
      return getArtistSimi(id).then(res => {
        return this.singerSimi = res.artists.splice(0, 5)
        // console.log(res,'相似歌手');
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#singerDetCounter {
  position: relative;
  width: 1200px;
  min-height: 700px;
  margin: 40px auto 35px auto;

  .singerInfo {
    display: flex;
    margin-bottom: 30px;

    .coverImg {
      margin-right: 55px;
      border-radius: 50%;

      .image-slot {
        width: 250px;
        height: 250px;
      }
    }

    .info {
      padding-top: 31px;

      .name {
        font-size: 38px;
      }

      .summary {
        width: 895px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
      }

      .amount {
        display: flex;

        div {
          height: 25px;
          border-right: 1px solid #c5c5c5;
          padding-right: 20px;
          margin-right: 20px;
          font-size: 18px;
          cursor: pointer;

          .number {
            margin-left: 10px;
            font-size: 25px;
          }
        }

        div:hover {
          color: #31c27c;
        }

        div:nth-child(3) {
          border: none;
        }
      }

      .button {
        margin-top: 20px;

        > div {
          display: inline-block;
          padding: 0 18px;
          margin-right: 10px;
          background: #31c27c;
          line-height: 38px;
          font-size: 14px;
          cursor: pointer;
          color: #fff;

          i {
            display: inline-block;
            width: 13px;
            height: 16px;
            margin-right: 6px;
            vertical-align: middle;
            background: url("~@/assets/image/public/icon-min.png") -80px -220px;
          }
        }

        .like {
          color: #000;
          border: 1px solid #c9c9c9;
          background: #fff;

          i {
            background-position: -40px -80px;
          }
        }
      }
    }
  }

  > .counter {
    h2 {
      margin-top: 25px;
      font-size: 24px;
      font-weight: normal;
    }

    font-size: 24px;
    line-height: 60px;
  }

  .singerInfos {
    margin-bottom: 20px;

    .title {
      padding-left: 10px;
      font-size: 24px;
      line-height: 50px;
    }

    .counter {
      display: flex;
    }
  }

  .Albums {
    .counter {
      .info {
        position: relative;
        width: 224px;
        height: 291px;
        margin: 0 8px;
        font-size: 14px;

        .coverImg {
          .image-slot {
            width: 224px;
            height: 224px;
          }
        }

        p {
          margin: 8px 0;
        }

        span {
          color: #999;
        }

        .hoverInfo {
          position: absolute;
          top: 0;
          width: 224px;
          height: 224px;
          background: rgba(0, 0, 0, 0.3);
          text-align: center;
          opacity: 0;
          cursor: pointer;
          transition: all .5s;

          img {
            width: 35px;
            height: 35px;
            margin-top: 87px;
            transition: all .5s;
          }
        }
      }

      .info:hover .hoverInfo {
        opacity: 1;
        transition: all .5s;

        img {
          transform: scale(2);
          transition: all .5s;
        }
      }
    }
  }

  .mv {
    .info {
      position: relative;
      width: 224px;
      margin: 10px 8px;
      font-size: 14px;

      .coverImg {
        .image-slot {
          width: 224px;
          height: 127px;
        }
      }

      p, span {
        cursor: pointer;
      }

      p {
        width: 224px;
        margin: 6px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .icon {
        display: inline-block;
        width: 19px;
        height: 12px;
        margin-right: 5px;
        margin-top: 5px;
        background: url("~@/assets/image/public/icon-min.png") 20px -20px;
      }

      span {
        color: #999;
      }

      span:hover {
        color: #31c27c;
      }

      p:hover {
        color: #31c27c;
      }

      .hoverInfo {
        position: absolute;
        top: 0;
        width: 224px;
        height: 127px;
        background: rgba(0, 0, 0, 0.3);
        text-align: center;
        opacity: 0;
        cursor: pointer;
        transition: all .5s;

        img {
          width: 35px;
          height: 35px;
          margin-top: 47px;
          transition: all .5s;
        }
      }
    }

    .info:hover .hoverInfo {
      opacity: 1;
      transition: all .5s;

      img {
        transform: scale(2);
        transition: all .5s;
      }
    }
  }

  .simi {
    .counter {
      justify-content: space-between;

      .info {
        width: 244px;
        margin-right: 20px;
        padding: 25px 0;
        text-align: center;

        .coverImg {
          border-radius: 50%;
          margin-bottom: 20px;

          .image-slot {
            width: 140px;
            height: 140px;
          }
        }

        span {
          text-align: center;
        }
      }
    }
  }
}
</style>