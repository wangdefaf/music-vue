<template>
  <div class="MainCounter">
    <div v-for="(value,index) in goods" :style="{'background-position-x': 224*index+1 + 'px'}" class="info">
      <div class="title">
        <div>巅峰榜</div>
        <p>{{ topName[index] }}</p>
      </div>
      <div class="playIcon">
        <img src="~@/assets/image/public/playIcon.png">
        <div></div>
      </div>
      <div v-for="(item,ind) in value" class="item">
        <div>{{ ind + 1 }}</div>
        <div>
          <router-link :to="{name:'songDet',params:{id:item.id}}" tag="span">{{ item.name }}</router-link>
          <br>
          <div class="singer">
            <router-link v-for="(value, index) in item.ar" :to="{name:'singerDet',params: item.id}" tag="span">
              {{ value.name }}
              <span v-if="item.ar.length-1!==index" class="icon"> / </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import HomeCounter from "@/components/content/Home/HomeCounter/homeCounter";

export default {
  name: "MainCounter",
  data() {
    return {
      topName: ['热歌', '新歌', '流行指数', '心动音乐', '个性推荐']
    }
  },
  components: {HomeCounter},
  props: {
    goods: {
      type: Array
    }
  },
  mounted() {
    console.log(this.goods, 'Main数据');
  }
}
</script>

<style lang="scss" scoped>
.MainCounter {
  display: flex;
  justify-content: space-between;
  width: 1200px;
  height: 500px;
  margin: 0 auto;
  color: #fff;

  .info {
    width: 164px;
    padding: 0 30px;
    font-size: 14px;
    background: url("~@/assets/image/home/topbg.jpg") 224px 0;

    .title {
      font-size: 20px;
      text-align: center;
      margin-top: 55px;

      p {
        margin-top: 10px;
        font-size: 22px;
      }
    }

    .playIcon {
      position: relative;
      width: 39px;
      height: 49px;
      margin: 0 auto;

      margin-top: 10px;
      margin-bottom: 10px;
      padding: 0 5px;
      cursor: pointer;

      img {
        width: 35px;
        height: 35px;
        transition: all .3s;
        opacity: 0;
      }

      div {
        position: absolute;
        top: 20px;
        left: 0;
        display: block;
        width: 100%;
        height: 2px;
        transition: all .3s;
        background: #fff;
      }
    }

    .item {
      display: flex;
      margin-bottom: 15px;

      div:nth-child(1) {
        margin-right: 12px;
      }

      div:nth-child(2) {
        .singer {
          width: 138px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          cursor: pointer;
        }

        span {
          display: inline-block;
          margin-bottom: 15px;
          cursor: pointer;
        }

        span:hover {
          color: #31c27c;
        }

        .icon {
          margin: 0;
        }
      }
    }
  }

  .info:hover .playIcon {
    img {
      transition: all .5s;
      opacity: 1;
      transform: scale(1.4);
    }

    div {
      display: none;
    }
  }
}

</style>