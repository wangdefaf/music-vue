<template>
  <div id="albumDet" @click="presentClick">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else id="Counter">
      <div class="albumInfo">
        <div class="cover">
          <el-image :src="playlistInfo.coverImgUrl+'?param=250y250'" class="pic">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
        </div>
        <div class="info">
          <h2 class="title">{{ playlistInfo.name }}</h2>
          <div class="singer">
            <i></i>
            <span v-if="playlistInfo.creator&&playlistInfo.creator.nickname">{{ playlistInfo.creator.nickname }}</span>
          </div>
          <div class="mes">
            <div>创建时间: {{ $store.getters.Date(playlistInfo.createTime) }}</div>
            <div>标签: <span v-for="(item,index) in playlistInfo.tags">{{ item }} </span></div>
            <div>播放量: {{ $store.getters.playCount(playlistInfo.playCount) }}</div>
          </div>
          <div class="buttons">
            <div class="playAll" @click="playerChange(0)">
              <i></i>
              <span>播放全部</span>
            </div>
            <div class="keep" @click="playerChange(0)">
              <i></i>
              <span>收藏</span>
            </div>
            <a class="comment" href="#comment">
              <i></i>
              <span>评论({{ playlistInfo.commentCount }})</span>
            </a>
          </div>
        </div>
      </div>
      <div class="albumCounter">
        <div class="counter">
          <div class="albumSongs">
            <songlist :goods="playlistInfo.tracks"/>
          </div>
          <more></more>
          <div class="albumComment" name="comment">
            <Comment :id="playlistInfo.id" :type="2"/>
          </div>

        </div>
        <div class="albumSide">
          <div class="present">
            <h2>简介</h2>
            <div class="count">
              {{ playlistInfo.description }}
            </div>
            <div ref="present" class="counter">
              <i></i>
              <h2>简介</h2>
              <pre>{{ playlistInfo.description }}</pre>
            </div>
            <span ref="more" @click.stop="moreClick">[ 更多 ]</span>
          </div>
          <div v-if="playlistR[0]" class="otherAlbums">
            <h2>相似歌单</h2>
            <div class="count">
              <router-link v-for="(item,index) in playlistR" :to="{name:'playlistDet',params:{id:item.id}}" class="item"
                           tag="div">
                <el-image :src="item.coverImgUrl+'?param=76y76'" class="pic">
                  <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png"
                       style="width: 76px;height: 76px">
                </el-image>
                <p>{{ item.name }}</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {getPlayListDet, getRelatedPlaylist} from "@/network/getdata/PlayListGet";
import Comment from "@/components/common/Comment/comment";
import Songlist from "@/components/common/songlist/songlist";
import More from "@/components/common/more/more";
import Loading from "@/components/common/loading/loading";

export default {
  name: "playlistDet",
  components: {Loading, More, Songlist, Comment},
  data() {
    return {
      playlistInfo: {
        creator: {
          nickname: ''
        }
      },
      isLoad: true,
      playlistR: []
    }
  },
  methods: {
    playerChange() {
      window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.playlistInfo.tracks))
    },
    presentClick() {
      this.$refs.present.style.display = 'none'
    },
    moreClick() {
      this.$refs.present.style.display = 'block'
    },
    //网络请求
    getPlayListDetFun(id) {
      return getPlayListDet(id).then(res => {
        this.playlistInfo = res.playlist
        console.log(this.playlistInfo);
      })
    },
    getRelatedPlaylistFun(id) {
      return getRelatedPlaylist(id).then(res => {
        this.playlistR = res.playlists
        console.log(res.playlists)
      })
    }

  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.isLoad = true
        Promise.all([
          this.getPlayListDetFun(id),
          this.getRelatedPlaylistFun(id)
        ]).then(res => {
          console.log(res);
          this.isLoad = false
        })
      }
    }
  },
  created() {
    let id = this.$route.params.id
    Promise.all([
      this.getPlayListDetFun(id),
      this.getRelatedPlaylistFun(id)
    ]).then(res => {
      this.isLoad = false
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
        width: 520px;
        flex-wrap: wrap;
        font-size: 14px;

        > div {
          width: 166px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 30px;
        }

        span {
          cursor: pointer;
        }

        span:hover {
          color: #31c27c;
        }
      }

      .buttons {
        margin-top: 20px;

        > div, > a {
          display: inline-block;
          min-width: 122px;
          cursor: pointer;
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

        > div {
          cursor: pointer;
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

      .albumSongs {
        margin: 50px 0 55px;
      }
    }

    .albumSide {
      flex: 29;
      box-sizing: content-box;

      > div h2 {
        font-size: 20px;
        font-weight: 400;
        line-height: 46px;
      }

      .present {
        position: relative;
        font-size: 14px;
        line-height: 22px;

        .count {
          max-height: 88px;
          overflow: hidden;
        }

        span:hover {
          cursor: pointer;
          color: #31c27c;
        }

        .counter {
          display: none;
          position: absolute;
          top: 85px;
          right: 350px;
          width: 580px;
          background: #fff;
          box-shadow: 0 0 4px rgba(0, 0, 0, .2);
          border-radius: 4px;
          border: 1px solid #ddd;
          z-index: 99;
          padding: 30px 5px 30px 10px;

          i {
            position: absolute;
            top: 50px;
            right: -11px;
            width: 11px;
            height: 17px;
            background: url('~@/assets/image/public/arrow.png') 0 0 no-repeat;
          }

          h2 {
            font-size: 20px;
            font-weight: 400;
            padding-bottom: 10px;
            margin: 0 24px 0 19px;
          }

          pre {
            line-height: 22px;
            min-height: 22px;
            text-align: justify;
            word-break: break-all;
            margin: 0 4px 0 19px;
            padding-right: 10px;
            max-height: 350px;
            overflow-y: auto;
            overflow-x: hidden;
          }
        }
      }

      .otherAlbums {
        margin-top: 30px;

        .count {
          display: flex;
          margin-top: 10px;
          flex-wrap: wrap;

          .item {
            width: 76px;
            margin-right: 33px;
            padding-bottom: 14px;
            margin-bottom: 20px;
            font-size: 10px;

            p {
              margin: 5px 0;
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