<template>
  <div class="songlist" @click="bodyClick">
    <div
        v-if="isKeepPlay"
        :style="{'top':keepY+'px','left':keepX+'px'}"
        class="playlists">
      <div v-for="(item,index) in userPlayId" :title="item.name" @click.stop="keepPlayClick(item.id)">
        {{ item.name }}
      </div>
    </div>
    <div class="songlist_toolbar">
      <span @click="keepClick"><i class="icon icon1"></i><span>收藏</span></span>
      <span @click.stop="keepPlayShow($event)">
          <i class="icon icon2"></i>
          <span>添加到</span>
      </span>
      <span @click="downClick"><i class="icon icon3"></i><span>下载</span></span>
      <span @click="detClick"><i class="icon icon4"></i><span>删除</span></span>
      <span @click="ClearClick"><i class="icon icon5"></i>清空列表</span>
    </div>
    <div class="header">
      <div class="topIndex">
        <div class="checkbox">
          <input :id="'check'" v-model="checked" type="checkbox" @change="changeAllChecked()"/>
          <label :for="'check'"></label>
        </div>
      </div>
      <div class="songName">歌曲</div>
      <div class="singerName">歌手</div>
      <div class="duration">时长</div>
    </div>
    <div class="swiper">
      <div v-for="(item,index) in playerData" :class="{'colorChange': index%2}" class="item">
        <div class="topIndex">
          <div class="checkbox">
            <input :id="'check'+index" v-model="checkedNames" :value="item.id" type="checkbox"/>
            <label :for="'check'+index"></label>
          </div>
          <span v-if="index!==$store.state.playIndex">{{ index + 1 }}</span>
          <i v-else></i>
        </div>
        <div class="songName">
          <router-link :to="{name:'songDet',params:{id:item.id}}" class="song" target="_blank">{{ item.name }}<span
              v-if="item.alia[0]" style="color: #c9c9c9;margin-left: 10px;">{{ item.alia[0] }}</span></router-link>
          <router-link v-if="item.mv" :to="{name:'mvDet',params:{id:item.id}}" class="mv" tag="i"
                       @click="mvClick(item.mv)"></router-link>
          <div class="songButtons">
            <i @click="playSong(index)"></i>
            <i @click.stop="addSong($event,item.id)"></i>
            <i @click="detSong(index)"></i>
          </div>
        </div>
        <div class="singerName">
          <router-link v-for="(value,index) in item.ar" :to="{name:'singerDet',params:{id:value.id}}" target="_blank">
            {{ value.name }}
            <span v-if="index+1!==item.ar.length">/</span>
          </router-link>
        </div>
        <div class="duration">{{ $store.getters.formatTime(item.dt) }}</div>
      </div>
    </div>
    <div class="prompt">
      <div v-if="isClear" class="clearList">
        <h2>QQ音乐<span @click="isClear=false">×</span></h2>
        <div class="inner">
          <i></i>
          <span>确定要清空列表?</span>
        </div>
        <div class="btn">
          <div @click="isClear=false">取消</div>
          <div class="define" @click="emptyClick">确定</div>
        </div>
      </div>
      <div v-if="isDown" class="clearList">
        <h2>QQ音乐<span @click="isDown=false">×</span></h2>
        <div class="inner">
          <i></i>
          <span>下载歌曲需要在QQ音乐客户端操作!</span>
        </div>
        <div class="btn">
          <div @click="isDown=false">取消</div>
        </div>
      </div>
      <div v-if="isDetBtn || isDownBtn || isKeep || isKeeplist" class="deleteBtn">
        <i></i><br>
        <span>请选择歌曲</span>
      </div>
      <div v-if="isaddTo" class="deleteBtn addTo">
        <i></i><br>
        <span>添加成功</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getPlaylistLike} from "@/network/getdata/Song";

export default {
  name: "playerSonglist",
  data() {
    return {
      checked: false,
      isClear: false,
      isDown: false,
      isDetBtn: false,
      isDownBtn: false,
      isKeep: false,
      isKeeplist: false,
      isKeepPlay: false,
      isKeepPlayO: false,
      isaddTo: false,
      nowlike: 0,
      keepX: 0,
      keepY: 0,
      checkedNames: [],//选中元素列表
      checkedIdArr: [],//客户端歌曲id列表
      playerData: []//客户端歌曲列表
    }
  },
  computed: {
    playIndex() {
      return this.$store.state.playlist
    }
  },
  methods: {
    //播放歌曲
    playSong(index) {
      this.$store.commit('playIndexChange', index)
    },
    //全选 or 全不选
    changeAllChecked() {
      if (this.checked) this.checkedNames = this.checkedIdArr
      else this.checkedNames = []
    },
    //打开清空窗口
    ClearClick() {
      this.playerData[0] ? this.isClear = true : this.isClear = false
    },
    //清空列表
    emptyClick() {
      localStorage.setItem('playerData', JSON.stringify([]))
      this.playerData = []
      this.checkedIdArr = []
      this.isClear = false
    },
    //删除按钮
    detClick() {
      if (this.checkedNames[0]) {
        if (this.checkedNames.length === this.checkedIdArr.length) {
          this.emptyClick()
        } else {
          this.checkedNames.forEach(item => {
            let num = this.checkedIdArr.findIndex(value => value === item)
            this.playerData.splice(num, 1)
            this.checkedIdArr.splice(num, 1)
          })
          this.checkedNames = []
          localStorage.setItem('playerData', JSON.stringify(this.playerData))
        }
      } else {
        setTimeout(() => {
          this.isDetBtn = false
        }, 2000)
        this.isDetBtn = true
      }
    },
    //下载按钮
    downClick() {
      if (this.checkedNames[0]) {
        this.isDown = true
      } else {
        setTimeout(() => this.isDownBtn = false, 2000)
        this.isDownBtn = true
      }
    },
    //收藏歌曲
    keepClick() {
      if (this.checkedNames[0]) {
        if (this.$cookies.get('userId')) {
          getPlaylistLike('add', this.userPlayId[0].id, this.checkedNames.join()).then(data => {
            this.isaddTo = true
            setTimeout(() => this.isaddTo = false, 2000)
          })
        } else {
          this.$emit('showLogin')
        }
      } else {
        setTimeout(() => this.isKeep = false, 2000)
        this.isKeep = true
      }
    },
    //显示添加歌单页面
    keepPlayShow(e) {
      if (this.checkedNames[0]) {
        this.keepX = e.layerX + 120
        this.keepY = e.layerY + 30
        this.isKeepPlay = true
      } else {
        setTimeout(() => this.isKeeplist = false, 2000)
        this.isKeeplist = true
      }
    },
    addSong(e, id) {
      console.log(id);
      this.keepX = e.pageX - 80
      this.keepY = e.pageY - 60
      this.isKeepPlay = true
      this.nowlike = id
    },
    detSong(index) {
      this.playerData.splice(index, 1)
      this.checkedIdArr.splice(index, 1)
      localStorage.setItem('playerData', JSON.stringify(this.playerData))
    },
    //添加歌单
    keepPlayClick(id) {
      console.log(this.nowlike);
      let songid
      if (this.nowlike === 0) {
        songid = this.checkedNames.join()
      } else songid = this.nowlike
      console.log(songid, '当前id');
      getPlaylistLike('add', id, songid).then(data => {
        this.isaddTo = true
        this.songid = 0
        setTimeout(() => this.isaddTo = false, 2000)
      })
      this.isKeepPlay = false
    },
    bodyClick() {
      this.isKeepPlay = false
      this.isKeepPlayO = false

    }
  },
  watch: {
    "checkedNames"() {
      this.checked = this.checkedNames.length === this.checkedIdArr.length;
    },
    "playerData"() {
      this.$store.commit('playlistChange', this.playerData)
    }
  },
  mounted() {
    if (this.$route.query.index) {
      this.$store.commit('playIndexChange', this.$route.query.index)
    }
    this.playerData = JSON.parse(localStorage.getItem('playerData'))
    this.playerData.forEach((item, index) => {
      this.checkedIdArr[index] = item.id
    })
  },
  props: {
    userPlayId: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.songlist {
  color: hsla(0, 0%, 88.2%, .8);

  .playlists {
    position: absolute;
    left: 105px;
    top: 50px;
    width: 168px;
    overflow: scroll;
    padding: 5px 0;
    box-shadow: 0 0 10px 0 #bfbfbf;
    border: 1px solid #bfbfbf;
    z-index: 100;
    background: #fff;

    div {
      height: 36px;
      line-height: 36px;
      padding-left: 40px;
      padding-right: 15px;
      margin-bottom: 1px;
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #000;
    }

    div:hover {
      color: #fff;
      background: #31c27c;
    }
  }

  .songlist_toolbar {
    > span, > div {
      display: inline-block;
      margin-right: 6px;
      padding: 0 23px;
      height: 38px;
      line-height: 38px;
      white-space: nowrap;
      cursor: pointer;
      box-sizing: content-box;
      overflow: hidden;
      border-radius: 2px;
      border: 1px solid hsla(0, 0%, 100%, .2);
      font-size: 14px;

      .icon {
        position: relative;
        top: 3px;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background: url("~@/assets/image/public/icon-min.png");
      }

      .icon1 {
        background-position: -60px 0;
      }

      .icon2 {
        background-position: -20px 0;
      }

      .icon3 {
        background-position: -40px -220px;
      }

      .icon4 {
        background-position: -100px 0;
      }

      .icon5 {
        background-position: -120px 0;
      }
    }

    > span:hover, > div:hover {
      border: 1px solid hsla(0, 0%, 100%, 1);

      > span {
        color: #fff;
      }

      .icon1 {
        background-position: -60px -20px;
      }

      .icon2 {
        background-position: -20px -20px;
      }

      .icon3 {
        background-position: -40px -240px;
      }

      .icon4 {
        background-position: -100px -20px;
      }

      .icon5 {
        background-position: -120px -20px;
      }
    }
  }

  .checkbox {
    position: relative;
    margin-top: 6px;

    label {
      width: 14px;
      height: 14px;
      border: 1px solid hsla(0, 0%, 88.2%, .4);
      position: absolute;
      left: 0;
      top: 10px;
    }

    label:hover {
      border: 1px solid #fff;
    }

    input {
      width: 14px;
      height: 14px;
      visibility: hidden;
    }

    input:checked + label { // 这段代码是当input选中时,给input的相邻标签label加一个背景图片
      border: 1px solid #fff;
      background: url("~@/assets/image/public/icon-min.png") -60px -80px;
    }
  }

  .header {
    display: flex;
    padding-left: 10px;
    margin-top: 20px;
    font-size: 14px;
    line-height: 50px;
  }

  .songName {
    position: relative;
    flex: 37;
    max-width: 278px;
    display: flex;
    padding-right: 40px;

    .song {
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      color: #e1e1e1cc;
    }

    .song:hover {
      color: #ffffff;
    }

    .mv {
      right: 0;
      display: inline-block;
      margin-left: 17px;
      margin-top: 18px;
      width: 33px;
      height: 16px;
      background: url("~@/assets/image/public/icon-min.png") -40px -280px;
      cursor: pointer;
    }

    .songButtons {
      position: absolute;
      top: 10px;
      right: 0;
      display: none;
      float: right;
      width: 150px;
      line-height: 50px;

      i {
        display: inline-block;
        width: 36px;
        height: 36px;
        cursor: pointer;
        margin-right: 5px;
        background: url("~@/assets/image/toplist/buttonlcon.png");
      }

      i:nth-child(2) {
        background-position: 0 -80px
      }

      i:nth-child(3) {
        background-position: 0 -160px
      }

      i:hover {
        background-position-x: -120px;
      }
    }

    .coverImg {
      width: 70px;
      margin-right: 20px;

      img {
        width: 70px;
        height: 70px;
      }
    }
  }

  .singerName {
    flex: 32;
    padding-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    a {
      color: #e1e1e1cc;
    }

    a:hover {
      color: #fff;
      cursor: pointer;
    }
  }

  .duration {
    flex: 11;
  }

  .topIndex {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    flex: 5;
    font-size: 14px;

    span {
      font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
    }

    i {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: url("~@/assets/image/player/wave.gif");
      margin-top: 20px;
    }
  }

  .swiper {
    height: 550px;
    overflow: scroll;

    .item {
      display: flex;
      padding-left: 10px;
      line-height: 50px;
      font-size: 14px;
    }

    .colorChange {
      background-color: rgba(224, 213, 213, .1);
    }

    .item:hover {
      .song {
        max-width: 46%;
      }

      .songButtons {
        display: inline-block;
      }
    }
  }

  .prompt {
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
          bottom: 15px;
          color: #999;
          font-size: 14px;
        }
      }

      .btn {
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

    .deleteBtn {
      height: 146px;
      padding: 37px 46px 25px;
      box-sizing: border-box;
      border-radius: 3px;
      background: rgba(0, 0, 0, .7);
      border: none;
      text-align: center;
      font-size: 14px;
      line-height: 22px;
      color: #fff;

      i {
        display: inline-block;
        width: 46px;
        height: 46px;
        margin: 0 12px 16px;
        background: url("~@/assets/image/login/icon_popup.png");
        background-position: 0 70px;
      }
    }

    .addTo {
      i {
        background-position: 0 140px
      }
    }
  }
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .1);
}

::-webkit-scrollbar-corner {
  display: none;
}
</style>
