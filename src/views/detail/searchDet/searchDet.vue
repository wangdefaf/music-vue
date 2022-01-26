<template>
  <div id="searchDet">
    <div class="titleSearch">
      <form class="searchBar">
        <input
            v-model="searchText"
            placeholder="搜索音乐、MV、歌单"
            type="search"
            @blur="searchBlur()"
            @focus="searchFocus()"
            @input="searchRes(searchText)"
        >
        <div class="button">
          <i class="icon search_icon" @click="resClick(searchText)"></i>
        </div>
        <transition name="mybox">
          <div v-show="boxshow" class="box">
            <div v-if="searchResult.order" class="searchResult">
              <div v-for="(item,index) in searchResult.order" :class="['result',item]">
                <div class="title">
                  <div class="icon"><i :class="item"></i></div>
                  <span>{{ resultText[item] }}</span>
                </div>
                <router-link
                    v-for="(val,ind) in searchResult[item]"
                    :to="{name:`${resultOrder(item)}`,params:{id:val.id}}"
                    class="boxItem"
                    tag="div"
                    @click.native="resClick(val.name)">
                  <div class="info">
                <span class="name">
                {{ val.name }}
                <span v-if="val.trank" class="trans">
                  ({{ val.trans }})
                </span>
              </span>
                    <span v-if="val.artist" class="artists">
                -{{ val.artists ? val.artists[0].name : val.artist.name }}
              </span>
                  </div>
                </router-link>
              </div>
            </div>
            <div v-else class="historySearch">
              <div class="title">
                <span>历史搜索</span>
                <span @click="clearHistory"><i></i></span>
              </div>
              <div v-if="searchHistory[0]" class="historySearchCounter">
                <div v-for="(item,index) in searchHistory"
                     class="item"
                     @click="resClick(item)">
                  <span class="name">{{ item }}</span>
                  <span class="icon" @click.stop="detRes(index)"><i></i></span>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </form>
      <div class="searchHot">
        <span>热门搜索：</span>
        <span v-for="(item,index) in searchHot" class="hot" @click="resClick(item.searchWord)">
          {{ item.searchWord }}
        </span>
      </div>
    </div>
    <div class="SearchResCounter">
      <div class="nav">
        <router-link :to="{name:'searchSong'}" class="nav_item" tag="div">
          <span>单曲</span>
        </router-link>
        <router-link :to="{name:'searchSinger'}" class="nav_item" tag="div">
          <span>歌手</span>
        </router-link>
        <router-link :to="{name:'searchAlbum'}" class="nav_item" tag="div">
          <span>专辑</span>
        </router-link>
        <router-link :to="{name:'searchPlaylist'}" class="nav_item" tag="div">
          <span>歌单</span>
        </router-link>
        <router-link :to="{name:'searchMv'}" class="nav_item" tag="div">
          <span>MV</span>
        </router-link>
      </div>

      <div class="counter">
        <div v-if="isLoad" class="load">
          <loading/>
        </div>
        <div v-else>
          <div v-if="!searchData[noneBoole]" class="noneText">
            <p>很抱歉，暂时没有找到与“<span style="color: #31c27c">{{ searchText }}</span>”相关的结果</p>
            <p>QQ音乐建议你：请检查输入的关键词是否有误或者过长</p>
            <p>或到<a href="https://support.qq.com/products/36366">QQ音乐反馈平台</a>，向我们投诉或提出建议。</p>
          </div>
          <div v-else>
            <router-view :data="searchData" style="margin-top: 20px"></router-view>
            <more/>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearch, getSearchHot, getSearchSug} from '@/network/getdata/search'
import More from "@/components/common/more/more";
import Loading from "@/components/common/loading/loading";

export default {
  name: "searchDet",
  components: {Loading, More},
  data() {
    return {
      boxshow: false,
      searchText: '腾讯盛典',//当前搜索框内容
      searchHot: '',//当前热搜列表
      searchHistory: [],
      searchResult: [],
      searchData: {},
      isLoad: true,
      resultText: {
        songs: '单曲',
        artists: '歌手',
        albums: '专辑',
        playlists: '歌单'
      }
    }
  },
  created() {
    if (this.$route.query.text) {
      this.searchText = this.$route.query.text
    }
    this.getSearchFun()
    this.getSearchHotFun()
    if (!localStorage.historySearch) {
      localStorage.setItem('historySearch', [])
      this.searchHistory = []
    } else {
      this.searchHistory = JSON.parse(localStorage.historySearch)
    }
  },
  computed: {
    noneBoole() {
      return this.$route.path.substring(8) + 'Count'
    }
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(this.$route.path.substring(8));
        if (val.name.slice(0, 6) === oldval.name.slice(0, 6)) {
          this.getSearchFun()
          console.log('改变完成', '二级路由');
        }
        if (this.$route.query.text) {
          console.log('改变完成', '参数值');
          this.searchText = this.$route.query.text
          this.getSearchFun()
          this.searchHistory = JSON.parse(localStorage.historySearch)
        }
      }
    }
  },
  methods: {
    //搜索框焦点
    searchFocus() {
      this.boxshow = true
      this.searchHistory = JSON.parse(localStorage.historySearch)
    },
    //失去焦点
    searchBlur() {
      this.boxshow = false
    },
    //input值改变
    searchRes(val) {
      console.log(val);
      if (val) {
        this.getSearchSug(val)
        console.log(val)
      } else {
        this.searchResult = []
      }
    },
    //点击搜索
    resClick(val) {
      console.log('点击了', val);
      if (val) {
        this.searchText = val
        this.searchHistory.push(val)
        localStorage.historySearch = JSON.stringify(this.searchHistory)
        this.getSearchFun()
      }
    },
    //删除本地搜索记录
    clearHistory() {
      localStorage.historySearch = '[]'
      this.searchHistory = []
    },
    //当前搜索热点
    getSearchHotFun() {
      getSearchHot().then(res => {
        this.searchHot = res.data.splice(0, 5)
      })
    },
    //搜索建议
    getSearchSug(key) {
      getSearchSug(key).then(res => {
        this.searchResult = res.result
      })
    },
    //搜索结果
    getSearchFun() {
      this.isLoad = true
      let model;
      let limit
      //判断请求内容，model代表内容类型代码 limit代表数量
      if (this.$route.name === 'searchSong') {
        model = 1;
        limit = 10
      }//请求歌曲
      else if (this.$route.name === 'searchAlbum') {
        model = 10;
        limit = 12
      }//请求专辑
      else if (this.$route.name === 'searchSinger') {
        model = 100;
        limit = 15
      }//请求歌手
      else if (this.$route.name === 'searchPlaylist') {
        model = 1000;
        limit = 15
      }//请求歌单
      else if (this.$route.name === 'searchMv') {
        model = 1004;
        limit = 12
      }//请求mv
      getSearch(this.searchText, model, limit).then(res => {
        this.searchData = res.result
        this.isLoad = false
        console.log(res.result, '搜索结果');
      })
    },
    //order转换
    resultOrder(val) {
      if (val === 'songs') return 'songDet';
      else if (val === 'artists') return 'singerDet';
      else if (val === 'albums') return 'AlbumDet';
      else if (val === 'playlists') return 'playlistDet';
    },
  },

}
</script>

<style lang="scss" scoped>
#searchDet {
  .titleSearch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 247px;
    background: url("~@/assets/image/search/bg_search.jpg");
    background-size: cover;

    .searchBar {
      width: 639px;
      height: 50px;
      background: #fff;
      border: 1px #c4c4c4 solid;
      line-height: 50px;
      font-size: 14px;

      input {
        width: 554px;
        height: 50px;
        border: 0;
        margin-left: 15px;
        outline: none;
      }

      input::-webkit-search-decoration,
      input::-webkit-search-cancel-button {
        display: none;
      }

      .button {
        float: right;
        width: 50px;
        height: 50px;
        text-align: center;

        .icon {
          display: inline-block;
          position: relative;
          top: 2px;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }

        .search_icon {
          background: url("~@/assets/image/public/icon-min.png") 0px -40px;
        }

        .search_icon:hover {
          background: url("~@/assets/image/public/icon-min.png") -0px -60px;
        }
      }

      .box {
        position: relative;
        top: 0;
        right: 1px;
        width: 100%;
        max-height: 999px;
        background: #f7f7f7;
        border: 1px #c4c4c4 solid;
        z-index: 999;
        overflow: hidden;

        > div {
          padding: 5px 0;
        }

        .searchResult {
          .result {
            > div {
              height: 36px;
              line-height: 36px;
              padding: 0 11px 0 41px;
            }

            .title {
              padding: 0 11px 0 0;
              color: #999;

              .icon {
                display: inline-block;
                width: 41px;
                text-align: center;

                i {
                  display: inline-block;
                  width: 16px;
                  height: 16px;
                  background: url("~@/assets/image/public/icon-min.png");
                }

                .songs {
                  background-position: -20px -220px;
                }

                .artists {
                  background-position: -20px -240px;
                }

                .albums {
                  background-position: -40px 0;
                }

                .playlists {
                  background-position: 0 -220px;
                }
              }
            }

            .boxItem {
              box-sizing: border-box;
              width: 100%;
              font-size: 14px !important;

              .info {
                cursor: pointer;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;

                .name {
                  color: #000;

                  .trans {
                    color: #999;
                  }
                }

                .artists {
                  color: #999;
                }
              }
            }

            .boxItem:hover {
              background: #31c27c;

              .info {
                color: #fff !important;
              }

              span {
                color: #fff !important;
              }
            }
          }

        }

        .historySearch {
          color: #999;
          font-size: 14px;

          .title {
            height: 36px;
            line-height: 36px;
            padding-left: 10px;

            span {
              display: inline-block;
            }

            span:nth-child(2) {
              float: right;
              width: 40px;
              cursor: pointer;
              text-align: center;

              i {
                display: inline-block;
                width: 16px;
                height: 16px;
                background: url("~@/assets/image/public/icon-min.png") -100px 0;
              }
            }

            span:nth-child(2):hover {
              i {
                background-position: -20px -60px;
              }
            }
          }

          .item {
            height: 36px;
            line-height: 36px;
            padding-left: 10px;

            .name {
              color: #333;
              max-width: 140px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              cursor: pointer;
            }

            .icon {
              display: none;
              float: right;
              width: 40px;
              height: 36px;
              line-height: 36px;
              cursor: pointer;
              text-align: center;

              i {
                display: inline-block;
                width: 12px;
                height: 12px;
                background: url("~@/assets/image/public/icon-min.png") 0 -240px;
              }
            }
          }

          .item:hover {
            background: #31c27c;

            span {
              color: #fff;
            }

            .icon {
              display: block;
            }
          }
        }
      }

      .mybox-enter-active {
        transition: all .3s ease;
      }

      .mybox-leave-active {
        transition: all .8s ease;
      }

      .mybox-enter, .mybox-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
      {
        max-height: 0;
      }

    }

    .searchHot {
      margin-top: 15px;
      line-height: 23px;
      text-align: center;
      color: #fff;
      font-size: 14px;

      .hot {
        cursor: pointer;
        margin-right: 20px;
      }
    }
  }

  .SearchResCounter {
    width: 1200px;
    margin: 0 auto;

    .nav {
      display: flex;
      height: 56px;
      line-height: 56px;

      .nav_item {
        display: inline-block;
        font-size: 16px;
        margin-right: 55px;
        cursor: pointer;
      }

      .active {
        color: #31c27c;
      }

      .nav_item:hover {
        color: #31c27c;
      }
    }

    .counter {
      position: relative;
      min-height: 400px;

      .load {
        position: relative;
        top: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        width: 100%;
        height: 400px;
      }

      .noneText {
        padding-top: 55px;
        text-align: center;
        font-size: 22px;
        color: #666;
        line-height: 40px;
        height: 350px;

        a {
          color: #31c27c;
        }
      }
    }

  }
}
</style>