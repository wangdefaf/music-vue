<template>
  <div id="counter">
    <div class="title">
      <span>{{ goods.name }}</span>
      <span>{{ $store.getters.Date(goods.trackUpdateTime) }}</span>
    </div>
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
      <div class="item i3" @click="playerChange(0)">
        <i class="icon"></i>
        <span>批量操作</span>
      </div>
      <div class="item i4">
        <i class="icon"></i>
        <span>评论</span>
      </div>
    </div>

    <div class="songlist">
      <div class="header">
        <div class="topIndex"></div>
        <div class="songName">歌曲</div>
        <div class="singerName">歌手</div>
        <div class="duration">时长</div>
      </div>
      <div v-for="(item,index) in goods.tracks" :class="{'colorChange': index%2}" class="item">
        <div :class="{'active':index< 3}" class="topIndex">{{ index + 1 }}</div>
        <router-link :to="{name:'songDet',params:{id:item.id}}" class="songName" tag="div">
          <el-image :src="item.al.picUrl+'?param=70y70'" class="coverImg">
            <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
          </el-image>
          <div class="song">{{ item.name }}</div>
          <i v-if="item.mv" class="mv" @click="mvClick(item.mv)"></i>
          <div class="songButtons"><i @click.stop="playerChange(index)"></i><i @click.stop="playerChange(index)"></i><i
              @click.stop="playerChange(index)"></i></div>
        </router-link>
        <div class="singerName">
          <router-link v-for="(value,index) in item.ar" :to="{name:'singerDet',params:{'id':value.id}}" tag="span">
            <span v-if="index!==0">/</span> {{ value.name }}
          </router-link>
        </div>
        <div class="duration">{{ $store.getters.formatTime(item.dt) }}</div>
      </div>
    </div>
    <more/>
    <Comment :id="id" :type="2"/>
  </div>
</template>

<script>
import Comment from "@/components/common/Comment/comment";
import More from "@/components/common/more/more";

export default {
  name: "toplistCounter",
  methods: {
    playerChange(index) {
      if (index) {
        window.open(`/player?index=${index}`, 'player')
      } else window.open('/player', 'player')
      localStorage.setItem('playerData', JSON.stringify(this.goods.tracks))
    }
  },
  props: {
    id: {
      type: Number,
      default: 19723756
    },
    goods: {
      type: Object
    }
  },
  components: {
    More,
    Comment
  },
}
</script>

<style lang="scss" scoped>
#counter {
  width: 990px;

  .title {
    line-height: 64px;

    span:nth-child(1) {
      margin-right: 15px;
      font-size: 24px;
    }

    span:nth-child(2) {
      font-size: 14px;
    }
  }

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

    .i3 {
      .icon {
        background-position: -120px 0;
      }
    }

    .i4 {
      .icon {
        background-position: -140px -120px;
      }
    }
  }

  .songlist {
    .header {
      display: flex;
      margin-top: 20px;
      color: #999999;
      background: #fff;
      font-size: 14px;
      line-height: 50px;
    }

    .item {
      display: flex;
      line-height: 80px;
      font-size: 14px;
    }

    .colorChange {
      background: #fff;
    }

    .topIndex {
      width: 100px;
      font-size: 24px;
      text-align: center;

      span {
        font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
      }
    }

    .active {
      color: #FF4222;
    }

    .item:hover {
      .song {
        max-width: 46%;
      }

      .songButtons {
        display: inline-block;
      }
    }

    .songName {
      position: relative;
      display: flex;
      width: 550px;
      padding-right: 40px;

      .song {
        max-width: 60%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
      }

      .mv {
        right: 0px;
        display: inline-block;
        margin-left: 17px;
        margin-top: 32px;
        width: 33px;
        height: 16px;
        background: url("~@/assets/image/public/icon-min.png") -40px -280px;
        cursor: pointer;
      }

      .songButtons {
        position: absolute;
        top: 16px;
        right: 0px;
        display: none;
        float: right;
        width: 150px;
        line-height: 80px;

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

    .singerName {
      width: 180px;
      padding-right: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      span:hover {
        color: #31c27c;
        cursor: pointer;
      }
    }

    .duration {
      width: 120px;
    }
  }

}
</style>