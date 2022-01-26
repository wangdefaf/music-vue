<template>
  <div id="myUser">
    <div class="user_list">
      <div v-for="(item,index) in userList" class="user_item">
        <el-image :src="item.avatarUrl+'?param=140y140'" class="coverImg">
          <img slot="placeholder" class="image-slot" src="~@/assets/image/public/loadImg.png">
        </el-image>
        <p class="name">{{ item.nickname }}</p>
        <p class="play_count">{{ $store.getters.playCount(item.followeds) }}人关注</p>
        <div v-if="!item.time" class="button" @click="cancelFollow(index)"><i></i>已关注</div>
        <div v-else class="button not_button" @click="follow(index)"><i></i>关注</div>
      </div>
    </div>
  </div>
</template>

<script>

import {getFollow, getUserFollows} from "@/network/getdata/user";

export default {
  name: "myUser",
  data() {
    return {
      userList: [],
      isPopFollow: false,
      isPopNotFollow: false
    }
  },
  methods: {
    getUserFollowsFun() {
      getUserFollows(this.$cookies.get('userId')).then(res => {
        this.userList = res.follow
        console.log(res, '用户关注列表');
      })
    },
    cancelFollow(index) {
      getFollow(this.userList[index].userId, 0).then(res => {
        this.userList[index].time = 1
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
      getFollow(this.userList[index].userId, 1).then(res => {
        this.userList[index].time = 0
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
    this.getUserFollowsFun()
  }
}
</script>

<style lang="scss" scoped>
#myUser {
  .user_list {
    display: flex;
    flex-wrap: wrap;

    .user_item {
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

      .play_count {
        color: #999;
        font-size: 14px;
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
}
</style>