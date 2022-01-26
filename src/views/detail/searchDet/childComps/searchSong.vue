<template>
  <div id="searchSong">
    <div class="buttons">
      <span class="item i0" @click="playerChange(0)">
        <i class="icon"></i>
        <span>播放全部</span>
      </span>
      <div class="item i1" @click="playerChange(0)">
        <i class="icon"></i>
        <span>添加到</span>
      </div>
      <div class="item i2" @click="playerChange(0)">
        <i class="icon"></i>
        <span>下载</span>
      </div>
    </div>
    <songlist :goods="data.songs"></songlist>
  </div>
</template>

<script>
import Songlist from "@/components/common/songlist/songlist";

export default {
  name: "searchSong",
  components: {Songlist},
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    playerChange(index) {
      if (index) {
        window.open(`/player?index=${index}`, 'player')
      } else window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.data.songs))
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
#searchSong {
  .buttons {
    display: flex;

    .item {
      cursor: pointer;
      margin-right: 6px;
      padding: 0 23px;
      line-height: 38px;
      font-size: 14px;
      border: 1px solid #c9c9c9;
      text-decoration: none;

      .icon {
        position: relative;
        top: 3px;
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background: url("~@/assets/image/public/icon-min.png");
      }
    }

    .i0 {
      background: #31c27c;
      color: #fff;

      .icon {
        background-position: -79px -220px;
      }
    }

    .i1 {
      .icon {
        background-position: -20px 0;
      }
    }

    .i2 {
      .icon {
        background-position: -40px -220px;
      }
    }
  }

}
</style>