<template>
  <div id="playerDet">
    <div :style="{'background-image':`url(${playlist[playIndex]?playlist[playIndex].al.picUrl:null}?param=300y300)`}"
         class="bg"></div>
    <player-nav :userInfo="userInfo" class="playerNav"/>
    <div id="Counter">
      <div class="leftCounter">
        <player-songlist :userPlayId="userPlayId" class="songlist" @showLogin="showLogin"/>
      </div>
      <div class="rightCounter">
        <player-lyric></player-lyric>
      </div>
    </div>
    <div class="playerDiv">
      <player-bar class="player-bar"/>
    </div>
    <login v-if="isLoginView" @closeView="closeView"></login>
  </div>
</template>

<script>
import {getUserDet, getUserPlaylist} from "@/network/getdata/user";
import Login from "@/components/common/Login/login";
import Songlist from "@/components/common/songlist/songlist";
import PlayerSonglist from "./childComps/playerSonglist";
import PlayerNav from "./childComps/playerNav";
import PlayerLyric from "./childComps/playerLyric";
import PlayerBar from "./childComps/playerBar";

export default {
  name: "playerDet",
  components: {PlayerBar, PlayerLyric, Login, PlayerSonglist, Songlist, PlayerNav},
  data() {
    return {
      userInfo: {},
      isLoginView: false,
      userPlayId: []
    }
  },
  methods: {
    closeView() {
      this.isLoginView = false
    },
    showLogin() {
      this.isLoginView = true
    },
    getUserDetFun() {
      return getUserDet(this.$cookies.get('userId')).then(res => {
        this.userInfo = res.profile
      })
    },
    getUserPlaylistFun() {
      getUserPlaylist(this.$cookies.get('userId')).then(res => {
        res.playlist.forEach(item => {
          if (res.playlist[0].creator.nickname === item.creator.nickname) {
            this.userPlayId.push(item)
          }
        })
        console.log(res.playlist[0], '我的喜欢');
      })
    }
  },
  watch: {
    'localStorage'() {
      console.log('你回家了, 我在等你呢');
    }
  },
  computed: {
    playlist() {
      return this.$store.state.playlist
    },
    playIndex() {
      return this.$store.state.playIndex
    }
  },
  created() {
    window.name = 'player'
    this.$store.commit('playlistChange', JSON.parse(localStorage.getItem('playerData')))
    this.getUserDetFun()
    this.getUserPlaylistFun()
  }
}
</script>

<style lang="scss" scoped>
#playerDet {
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  min-height: 100vh;
  background: #000000;

  .playerDiv {
    width: 83%;
    margin: 0 auto;
    position: relative;

    .player-bar {
      position: fixed;
      bottom: 0;
    }
  }

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgb(162, 160, 160);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    opacity: 60%;
    filter: blur(65px);
    z-index: 1;
  }

  .playerNav {
    margin-bottom: 30px;
  }

  #Counter {
    display: flex;
    width: 83%;
    margin: 0 auto;

    > div {
      overflow: hidden;
    }

    .leftCounter {
      flex: 75;

      .songlist {
        position: relative;
        z-index: 10;
      }
    }

    .rightCounter {
      flex: 25;
      z-index: 10;
      padding-left: 60px;
    }
  }

}
</style>