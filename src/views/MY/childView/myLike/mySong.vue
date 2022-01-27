<template>
  <div id="mySong">
    <div v-if="songList[0]" class="counter">
      <div class="buttons">
        <div class="playAll" @click="playerChange">
          <i></i>
          <span>播放全部</span>
        </div>
        <div class="keep" @click="playerChange">
          <i></i>
          <span>添加到</span>
        </div>
        <a class="comment" @click="playerChange">
          <i></i>
          <span>下载到</span>
        </a>
      </div>
      <songlist v-if="songList[0]" :goods="songList"></songlist>
      <more/>
    </div>
    <div v-else class="notMV">
      <i></i>
      <p>什么也没有，<a href="/Home">音乐馆</a>发现好音乐</p>
    </div>
  </div>
</template>

<script>
import {getPlayListDet} from "@/network/getdata/PlayListGet";
import Songlist from "@/components/common/songlist/songlist";
import More from "@/components/common/more/more";

export default {
  name: "mySong",
  data() {
    return {
      songList: {}
    }
  },
  components: {More, Songlist},
  watch: {
    playlistId() {
      this.getUserPlaylistFun()
    }
  },
  methods: {
    getUserPlaylistFun() {
      console.log(this.playlistId);
      getPlayListDet(this.playlistId, this.$cookies.get("token")).then(res => {
        this.songList = res.playlist.tracks.splice(0, 15)
        console.log(res, '我喜欢的歌单');
      })
    },
    playerChange() {
      window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.songList))
      console.log(localStorage.getItem('playerData'));
    },
  },
  props: {
    playlistId: {
      type: Number,
    }
  },
  mounted() {
    console.log('欢迎来到My,Like,Song页面',);
  },
  created() {

  }
}
</script>

<style lang="scss" scoped>
#mySong {
  .buttons {
    margin-top: 25px;

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

  .notMV {
    font-size: 20px;
    color: #666;
    line-height: 38px;
    text-align: center;
    padding: 90px 0 100px;

    i {
      display: block;
      width: 213px;
      height: 203px;
      margin: 0 auto 27px;
      background: url("~@/assets/image/login/notIcon.png");
    }

    a {
      color: #31c27c;
      text-decoration: none;
    }
  }
}
</style>