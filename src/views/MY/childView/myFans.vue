<template>
  <div id="myFans">
    <div class="singer_list">
      <div v-for="(item,index) in followeds" class="singer_item">
        <el-image :src="item.avatarUrl+'?param=140y140'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p class="name">{{ item.nickname }}</p>
        <p class="play_count">{{ $store.getters.playCount(item.followeds) }}人关注</p>
        <div v-if="!item.info" class="button" @click="cancelFollow(index)"><i></i>已关注</div>
        <div v-else class="button not_button" @click="follow(index)"><i></i>关注</div>
      </div>
    </div>
    <div v-show="isPopFollow" class="popFollow">
      <i></i><br>
      <span>关注成功!</span>
    </div>
    <div v-show="isPopNotFollow" class="popFollow">
      <i></i><br>
      取消关注成功!
    </div>
  </div>
</template>

<script>
import {getFollow, getUserFolloweds} from "@/network/getdata/user";

export default {
  name: "myFans",
  data() {
    return {
      followeds: [],
      isPopFollow: false,
      isPopNotFollow: false
    }
  },
  methods: {
    getUserFollowedsFun() {
      getUserFolloweds(this.$cookies.get('userId')).then(res => {
        this.followeds = res.followeds
        this.$emit('emitLoad')
        console.log(res);
      })
    },
    cancelFollow(index) {
      getFollow(this.followeds[index].userId, 0).then(res => {
        this.followeds[index].info = 1
        if (!this.isPopNotFollow) {
          this.isPopNotFollow = true
          setTimeout(() => {
            this.isPopNotFollow = false
          }, 3000)
        }
        console.log(res);
      })
    },
    follow(index) {
      getFollow(this.followeds[index].userId, 1).then(res => {
        this.followeds[index].info = 0
        if (!this.isPopFollow) {
          this.isPopFollow = true
          setTimeout(() => {
            this.isPopFollow = false
          }, 3000)
        }
        console.log(res);
      })
    }
  },
  mounted() {
    this.getUserFollowedsFun()
  }
}
</script>

<style lang="scss" scoped>
#myFans {
  width: 1200px;
  margin: 0 auto;

  .singer_list {
    padding-top: 20px;
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

      .play_count {
        color: #999;
        font-size: 14px;
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

  .popFollow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 146px;
    padding: 37px 46px 25px;
    box-sizing: border-box;
    border-radius: 3px;
    background: rgba(0, 0, 0, .7);
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
      background-position: 0 -150px;
    }
  }
}
</style>