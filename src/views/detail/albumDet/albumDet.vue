<template>
  <div id="albumDet" @click="presentClick">
    <div v-if="isLoad" class="load">
      <loading/>
    </div>
    <div v-else id="Counter">
      <div class="albumInfo">
        <div class="cover">
          <el-image :src="alubumSongs.album.picUrl+'?param=250y250'" class="pic">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
          <i></i>
        </div>
        <div class="info">
          <h2 class="title">{{ alubumSongs.album.name }}</h2>
          <div class="singer">
            <i></i>
            <router-link v-for="(val,ind) in alubumSongs.album.artists" :to="{name:'singerDet',params:{id:val.id}}"
                         tag="span">
              {{ val.name }}
            </router-link>
          </div>
          <div class="mes">
            <div>发行时间: {{ $store.getters.Date(alubumSongs.album.publishTime) }}</div>
            <div>唱片公司: {{ alubumSongs.album.company }}</div>
            <div>类型: {{ alubumSongs.album.subType }}</div>
          </div>
          <div class="buttons">
            <div class="playAll" @click="playerChange">
              <i></i>
              <span>播放全部</span>
            </div>
            <div class="keep" @click="playerChange">
              <i></i>
              <span>收藏</span>
            </div>
            <a class="comment" href="#comment">
              <i></i>
              <span>评论({{ alubumSongs.album.info.commentCount }})</span>
            </a>
          </div>
        </div>
      </div>
      <div class="albumCounter">
        <div class="counter">
          <div class="albumSongs">
            <songlist :goods="alubumSongs.songs"/>
          </div>
          <div class="albumComment" name="comment">
            <Comment :id="alubumSongs.album.id" :type="3"/>
          </div>
        </div>
        <div class="albumSide">
          <div class="present">
            <h2>简介</h2>
            <div class="count">
              {{ alubumSongs.album.description }}
            </div>
            <div ref="present" class="counter">
              <i></i>
              <h2>简介</h2>
              <p>{{ alubumSongs.album.description }}</p>
            </div>
            <span ref="more" @click.stop="moreClick">[ 更多 ]</span>
          </div>
          <div v-if="alubumArtist[0]" class="otherAlbums">
            <h2>该歌手的其他专辑</h2>
            <div class="count">
              <router-link v-for="(item,index) in alubumArtist" :to="{name:'AlbumDet',params:{id:item.id}}" class="item"
                           tag="div">
                <el-image :src="item.picUrl+'?param=76y76'" class="pic">
                  <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png"
                       style="width: 76px;height: 76px">
                </el-image>
                <p>{{ item.name }}</p>
                <span>{{ $store.getters.Date(item.publishTime) }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import {getAlbum, getArtistAlbum} from "@/network/getdata/album";
import Comment from "@/components/common/Comment/comment";
import Songlist from "@/components/common/songlist/songlist";
import Loading from "@/components/common/loading/loading";

export default {
  name: "albumDet",
  components: {Loading, Songlist, Comment},
  data() {
    return {
      alubumInfo: {album: {}, product: {}},
      alubumSongs: {album: {info: {}}},
      alubumArtist: [],
      isLoad: true
    }
  },
  methods: {
    presentClick() {
      this.$refs.present.style.display = 'none'
    },
    moreClick() {
      this.$refs.present.style.display = 'block'
    },
    playerChange() {
      window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.alubumSongs.songs))
      console.log(localStorage.getItem('playerData'));
    },
    //网络请求
    getAlbumFun(id) {
      return getAlbum(id).then(res => {
        this.alubumSongs = res
        return res.album.artist.id
      }).then((id) => {
        getArtistAlbum(id, 7).then(res => {
          this.alubumArtist = res.hotAlbums.slice(1);
          this.isLoad = false
        })
      })
    },

  },
  watch: {
    $route() {
      if (this.$route.params.id) {
        let id = this.$route.params.id
        this.isLoad = true
        this.getAlbumFun(id)
      }
    }
  },
  created() {
    let id = this.$route.params.id
    this.getAlbumFun(id)
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
      padding-left: 70px;

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

          p {
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
            font-size: 14px;

            p {
              margin: 5px 0;
            }

            span {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #c9c9c9;
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