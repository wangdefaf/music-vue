<template>
  <div id="mySinger">
    <div v-if="singerList[0]" class="singer_list">
      <div v-for="(item,index) in singerList" class="singer_item">
        <el-image :src="item.img1v1Url+'?param=140y140'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p class="name">{{ item.name }}</p>
        <div v-if="!item.info" class="button" @click="cancelFollow(index)"><i></i>已关注</div>
        <div v-else class="button not_button" @click="follow(index)"><i></i>关注</div>
      </div>
    </div>
    <div v-else class="notMV">
      <i></i>
      <p>什么也没有，<a href="/Home">音乐馆</a>发现好音乐</p>
    </div>
  </div>
</template>

<script>
import {getArtistSublist, getFollow} from "@/network/getdata/user";

export default {
  name: "mySinger",
  data() {
    return {
      singerList: []
    }
  },
  methods: {
    getArtistSublistFun() {
      getArtistSublist(this.$cookies.get('token')).then(res => {
        this.singerList = res.data
        console.log(res, '歌手关注列表');
      })
    },
    cancelFollow(index) {
      getFollow(this.singerList[index].userId, 0, this.$cookies.get('token')).then(res => {
        this.singerList[index].info = 1
        if (!this.isPopNotFollow) {
          this.$emit('PopNotFollowClick', true)
          setTimeout(() => {
            this.$emit('PopNotFollowClick', false)
          }, 3000)
        }
        console.log(res);
      })
    },
    follow(index) {
      getFollow(this.singerList[index].userId, 1, this.$cookies.get('token')).then(res => {
        this.singerList[index].info = 0
        if (!this.isPopFollow) {
          this.$emit('PopFollowClick', true)
          setTimeout(() => {
            this.$emit('PopFollowClick', false)
          }, 3000)
        }
        console.log(res);
      })
    }
  },
  mounted() {
    this.getArtistSublistFun()
  }
}
</script>

<style lang="scss" scoped>
.singer_list {
  display: flex;
  flex-wrap: wrap;

  .singer_item {
    width: 20%;
    text-align: center;
    padding: 25px 0;
    margin-bottom: 20px;

    .coverImg {
      border-radius: 50%;
      width: 140px;
      height: 140px;

      .image-slot {
        border-radius: 50%;
        width: 140px;
        height: 140px;
      }
    }

    .name {
      margin: 20px 30px 4px;
      min-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .button {
      width: 120px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      border: 1px solid #c9c9c9;
      margin: 9px auto 0;
      cursor: pointer;

      i {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-right: 6px;
        background: url("~@/assets/image/public/icon-min.png");
        background-position: -20px -180px;
        vertical-align: -4px;
      }
    }

    .not_button {
      i {
        vertical-align: -3px;
        background-position: 0 -180px;
      }
    }

    .button:hover {
      background: #ededed;
    }
  }
}
</style>