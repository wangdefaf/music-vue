<template>
  <div id="comment">
    <p class="title">评论<span>共<span v-if="Comment.totalCount">{{ Comment.totalCount }}</span>条评论</span></p>
    <div class="writeComment">
      <div class="textInput">
        <div ref="input" class="input" contenteditable @input="keyDownFun($refs.input)"></div>
        <span v-if="!textExceed">剩余<span>{{ commentLength }}</span>字</span>
        <span v-else class="exceed">超出<span>{{ commentLength }}</span>字</span>
      </div>
      <div class="release">
        <div class="button" @click="issueComment($refs.input)">发表评论</div>
      </div>
    </div>
    <div class="comments">
      <div v-if="Comment.comments" class="title">精彩评论</div>
      <div v-if="Comment.comments" class="counter">
        <div v-for="(item,index) in Comment.comments" class="item">
          <img :src="item.user.avatarUrl+'?param=38y38'" alt="" class="avatar">
          <div class="info">
            <div class="name">{{ item.user.nickname }}</div>

            <div class="time">{{ $store.getters.DateY(item.time) }}</div>

            <pre>{{ item.content }}</pre>

            <div class="operate">
              <i :class="{'likeAct':item.parentCommentId}" class="like" @click="likeClick(item)"></i>
              <span
                  style="margin-right: 20px;color: #000">{{
                  item.parentCommentId ? item.likedCount + 1 : item.likedCount
                }}</span>
              <span class="replyText" @click="writeCommentsClick(index)"><span
                  v-if="writeCommentsIndex !== index">回复</span><span v-else>取消</span></span>

            </div>
            <div v-if="writeCommentsIndex === index" class="writeComment">
              <div class="textInput">
                <div ref="commentInput" class="input" contenteditable @input="keyDownFun($refs.commentInput)"></div>
                <span v-if="!textExceed">剩余<span>{{ replyLength }}</span>字</span>
                <span v-else class="exceed">超出<span>{{ replyLength }}</span>字</span>
              </div>
              <div class="release">
                <div class="button" @click="issueComment($refs.commentInput,item.commentId)">发表评论</div>
              </div>
            </div>
            <div v-if="item.showFloorComment.replyCount" :class="{'isreply':item.expressionUrl}" class="reply"
                 @click="replyCLick(item)">
              <span>查看{{ item.showFloorComment.replyCount }}条回复</span><i></i>
            </div>
            <div v-if="item.expressionUrl" class="replyComment">

              <div class="counter">
                <div v-for="(value,index) in item.showFloorComment.comments" class="item">
                  <img :src="value.user.avatarUrl+'?param=38y38'" alt="" class="avatar">
                  <div class="info">
                    <div class="name">{{ value.user.nickname }}</div>

                    <div class="time">{{ $store.getters.DateY(value.time) }}</div>

                    <pre>{{ value.content }}</pre>

                    <div class="operate">
                      <i :class="{'likeAct':value.commentLocationType}" class="like"
                         @click="likeReplyClick(item.commentId,value)"></i>
                      <span
                          style="margin-right: 20px;color: #000">{{
                          value.commentLocationType ? value.likedCount + 1 : value.likedCount
                        }}</span>
                      <span class="replyText" @click="writeReplyClick(index)"><span
                          v-if="writeReplyIndex !== index">回复</span><span v-else>取消</span></span>
                    </div>
                    <div v-if="writeReplyIndex === index" class="writeComment">
                      <div class="textInput">
                        <div ref="replyInput" class="input" contenteditable @input="keyDownFun($refs.replyInput)"></div>
                        <span v-if="!textExceed">剩余<span>{{ replyLength }}</span>字</span>
                        <span v-else class="exceed">超出<span>{{ replyLength }}</span>字</span>
                      </div>
                      <div class="release">
                        <div class="button" @click="issueComment($refs.replyInput,value.commentId)">发表评论</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="item.status" class="icon" @click="moveReplyComment(item)"><span>显示更多回复</span> <i></i></div>
              <div v-else class="icon" @click="item.expressionUrl = false"><span>收起</span> <i></i></div>
            </div>
          </div>
        </div>
      </div>
      <p v-else>还没有人评论，快来抢沙发吧~</p>
    </div>
  </div>
</template>

<script>
import {getIssueComment, getPlayListComment, getPlayListCommentLike, getReplyComment} from "@/network/getdata/Comment";

export default {
  name: "Comment",
  data() {
    return {
      commentLength: 300,
      replyLength: 300,
      writeCommentsIndex: -1,
      writeReplyIndex: -1,
      textExceed: false,
      ask: true,
      reply: null,
      pageNo: 1,
      goods: {},
      Comment: {totalCount: ''},

    }
  },
  methods: {
    //方法
    keyDownFun(dom) {//输入框输入事件
      let TextLength
      if (dom[0]) {
        TextLength = dom[0].innerText.length
        this.replyLength = 300 - TextLength
      } else {
        TextLength = dom.innerText.length
        this.commentLength = 300 - TextLength
      }
      this.textExceed = TextLength > 300
    },
    issueComment(dom, id) {
      if (!id) {
        getIssueComment(this.id, dom.innerText, 1, this.type, this.$cookies.get('token')).then(res => {
          dom.innerText = ''
          this.writeReplyIndex = -1
          console.log('提交', res);
        })
      } else {
        getIssueComment(this.id, dom[0].innerText, 1, this.type, this.$cookies.get('token')).then(res => {
          dom[0].innerText = ''
          this.writeReplyIndex = -1
          this.writeCommentsIndex = -1
          console.log('提交', dom);
        })
      }
      this.commentLength = 300
      this.replyLength = 300
    },
    //楼层评论回复点击
    writeCommentsClick(index) {
      this.$refs.input.innerText = ''
      this.commentLength = 300
      this.replyLength = 300
      this.writeReplyIndex = -1
      this.writeCommentsIndex === index ? this.writeCommentsIndex = -1 : this.writeCommentsIndex = index
    },

    writeReplyClick(index) {
      // 显示单条评论输入框
      this.commentLength = 300
      this.replyLength = 300
      this.writeCommentsIndex = -1
      this.writeReplyIndex === index ? this.writeReplyIndex = -1 : this.writeReplyIndex = index
    },
    likeClick(item) {//评论点赞
      item.parentCommentId = !item.parentCommentId
      let t = item.parentCommentId ? 1 : 0
      getPlayListCommentLike(this.id, item.commentId, t, this.type, this.$cookies.get('token')).then(res => {
        console.log('qaa');
      })
    },
    likeReplyClick(id, item) {//回复评论点赞
      item.commentLocationType = !item.commentLocationType
      let t = item.commentLocationType ? 1 : 0
      getPlayListCommentLike(id, item.commentId, t, this.type, this.$cookies.get('token')).then(res => {
      })
    },
    replyCLick(item) {//回复数据展示
      getReplyComment(this.id, item.commentId, this.type, 10).then(res => {
        item.status = res.data.hasMore
        item.showFloorComment.comments = []
        item.showFloorComment.comments = res.data.comments
        item.CommentTime = res.data.comments.slice(-1)[0].time
        item.expressionUrl = !item.expressionUrl
      })
    },
    // 加载更多回复数据
    moveReplyComment(item) {
      getReplyComment(this.id, item.commentId, this.type, 20, item.CommentTime).then(res => {
        item.status = res.data.hasMore
        item.CommentTime = res.data.comments.slice(-1)[0].time
        item.showFloorComment.comments.push(...res.data.comments)
      })
    },
    //网络请求
    getPlayListCommentFun() {//歌单评论
      getPlayListComment(this.id, this.pageNo, this.type, 2, 40).then(res => {
        this.Comment = res.data
      })
    },
    getPlayListCommentPlus() {//无限滚动歌单评论
      this.pageNo++
      getPlayListComment(this.id, this.pageNo, this.type, 2, 40).then(res => {
        if (res.code === 200) {
          this.Comment.comments.push(...res.data.comments)
        } else {
          this.ask = false
        }
      })
    },
    //滚动事件
    scrollCb() {
      // 首先找出子元素总高度 scrollHeight
      // 再找出可视区域高度 clientHeight
      // 滚动条纵向偏移量 scrollTop
      // 当 总高 - 可视区域高度 - 纵向偏移量 < 某个最小阈值 的时候，触发无限滚动
      const dom = document.documentElement
      const totalHeight = dom.scrollHeight;
      const clientHeight = dom.clientHeight;
      const scrollTop = dom.scrollTop;
      if (totalHeight - clientHeight - scrollTop < 510 && this.ask) {
        this.getPlayListCommentPlus();
      }
    },
    //防抖节流
    throttle(fn, delay) {
      let valid = true
      return function () {
        if (!valid) {
          //休息时间 暂不接客
          return false
        }
        // 工作时间，执行函数并且在间隔期内把状态位设为无效
        valid = false
        setTimeout(() => {
          fn()
          valid = true;
        }, delay)
      }
    },
  },
  props: {
    id: {},
    type: {
      type: Number
    }
  },
  watch: {
    id() {
      if (this.id) {
        this.pageNo = 1
        this.getPlayListCommentFun()
      }
    }
  },
  created() {
    this.getPlayListCommentFun()
  },
  mounted() {
    window.onscroll = this.throttle(this.scrollCb, 100)
  },
}
</script>

<style lang="scss" scoped>
.title {
  line-height: 62px;
  font-size: 24px;

  > span {
    margin-left: 12px;
    color: #999;
    font-size: 14px;
  }
}

.writeComment {
  .textInput {
    position: relative;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    padding: 10px 15px 28px 15px;

    .exceed {
      color: #000;
    }

    > span {
      position: absolute;
      bottom: 7px;
      right: 14px;
      font-size: 14px;
      color: #999;

      > span {
        color: #31c27c;
      }
    }

    .input {
      min-height: 66px;
      height: auto;
      font-size: 14px;
      line-height: 21px;
      color: #000;
      background-color: #f5f5f5;
      border-radius: 2px;
      outline: none;
      overflow: hidden;
    }

    .input:empty::before {
      color: #000;
      content: '说说你的看法吧';
      font-size: 14px;
      font-family: poppin, Tahoma, Arial, \5FAE\8F6F\96C5\9ED1, sans-serif;
    }

    .input:focus {
      //box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    }
  }

  .release {
    position: relative;
    height: 27px;
    margin-top: 16.6px;

    .button {
      position: absolute;
      right: 5px;
      float: right;
      width: 80px;
      background: #31c27c;
      line-height: 27px;
      color: #fff;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }

    .button:hover {
      background: #2caf6f;
    }
  }


}

.comments {
  margin-top: 16.5px;

  > p {
    font-size: 16px;
    line-height: 144px;
    text-align: center;
  }

  .title {
    font-size: 16px;
    line-height: 34px;
    padding-bottom: 10px;
  }

  .counter {
    .item {
      display: flex;
      border-top: 1px solid #e2e2e2;
      padding: 15px 0;

      .info {
        width: 100%;
        color: #999;
        font-size: 14px;

        .name {
          height: 26px;
        }

        .time {
          margin-bottom: 10px;
        }

        pre {
          white-space: pre-wrap;
          color: #000;
          line-height: 2;
          font-family: auto;
        }

        .operate {
          margin-top: 8px;
          margin-bottom: 10px;
          line-height: 25px;

          .like {
            display: inline-block;
            width: 17px;
            height: 17px;
            margin-right: 5px;
            vertical-align: text-top;
            background: url("~@/assets/image/comment/comment.png") -25px -25px;
            cursor: pointer;
          }

          .likeAct {
            background-position-x: 0;
          }

          .replyText:hover {
            cursor: pointer;
            color: #2caf6f;
          }
        }

        .reply {
          cursor: pointer;
          margin-top: 8px;
          margin-bottom: 10px;

          i {
            display: inline-block;
            width: 10px;
            height: 6px;
            margin-left: 8px;
            vertical-align: middle;
            background: url("~@/assets/image/public/icon-min.png") 80px 76px;
          }
        }

        .reply:hover {
          color: #2caf6f;

          i {
            background-position: 60px 76px;
          }
        }

        .isreply {
          i {
            background-position: 80px 66px;
          }
        }

        .isreply:hover {
          i {
            background-position: 60px 66px;
          }
        }
      }

      .replyComment {
        .icon {
          cursor: pointer;
          color: #999;

          i {
            display: inline-block;
            width: 15px;
            height: 15px;
            vertical-align: top;
            background: url("~@/assets/image/public/icon-min.png") 101px 20px;
            margin-left: 2px;
          }
        }

        .icon:hover {
          color: #2caf6f;

          i {
            background-position-x: 21px;
          }
        }
      }

      .avatar {
        width: 38px;
        height: 38px;
        margin-right: 18px;
        border-radius: 50%;
      }
    }
  }
}


</style>