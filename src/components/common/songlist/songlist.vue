<template>
  <div class="songlist">
    <div class="header">
      <div class="topIndex"></div>
      <div class="songName">歌曲</div>
      <div class="singerName">歌手</div>
      <div class="albumName">专辑</div>
      <div class="duration">时长</div>
    </div>
    <div v-for="(item,index) in goods" :class="{'colorChange': index%2}" class="item">
      <div class="topIndex">{{ index + 1 }}</div>
      <div class="songName">
        <router-link :to="{name:'songDet',params:{id:item.id}}" class="song" tag="div">{{ item.name }}<span
            v-if="item.alia[0]" style="color: #c9c9c9;margin-left: 10px;">{{ item.alia[0] }}</span></router-link>
        <router-link v-if="item.mv" :to="{name:'mvDet',params:{id:item.id}}" class="mv" tag="i"
                     @click="mvClick(item.mv)"></router-link>
        <div class="songButtons"><i @click="playerChange(index)"></i><i @click="playerChange(index)"></i><i
            @click="playerChange(index)"></i></div>
      </div>
      <div class="singerName">
        <router-link v-for="(value,index) in item.ar" :to="{name:'singerDet',params:{id:value.id}}" tag="span">
          {{ value.name }}
          <span v-if="index+1!==item.ar.length">/</span>
        </router-link>
      </div>
      <div class="albumName">
        <span>{{ item.al.name }}</span>
      </div>
      <div class="duration">{{ $store.getters.formatTime(item.dt) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "songlist",
  methods: {
    playerChange(index) {
      if (index) {
        window.open(`/player?index=${index}`, 'player')
      } else window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.goods))
    }
  },
  props: {
    goods: {
      type: Array
    }
  }
}
</script>

<style lang="scss" scoped>
.songlist {
  .header {
    display: flex;
    margin-top: 20px;
    color: #999999;
    font-size: 14px;
    line-height: 50px;
  }

  .item {
    display: flex;
    line-height: 50px;
    font-size: 14px;
  }

  .colorChange {
    background: #fff;
  }

  .item:hover {
    .song {
      max-width: 46%;
    }

    .songButtons {
      display: inline-block;
    }
  }

  .topIndex {
    flex: 5;
    font-size: 14px;
    color: #999;

    span {
      font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
    }
  }

  .songName {
    position: relative;
    flex: 37;
    max-width: 320px;
    display: flex;
    padding-right: 40px;

    .song {
      max-width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }

    .song:hover {
      color: #31c27c;
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
        background-position: 0 -40px
      }

      i:hover {
        background-position-x: -40px;
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

  .singerName, .albumName {
    flex: 32;
    padding-right: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span:hover {
      color: #31c27c;
      cursor: pointer;
    }
  }

  .albumName {
    flex: 10
  }

  .duration {
    flex: 11;
    color: #999;
  }
}
</style>