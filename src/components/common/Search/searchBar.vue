<template>
  <div class="search_bar">
    <input
        v-model="searchText"
        placeholder="搜索音乐、MV、歌单"
        type="search"
        @blur="searchBlur()"
        @focus="searchFocus()"
        @input="searchRes(searchText)"
    >
    <router-link
        :to="{path:'/search',query:{text:searchText}}"
        class="icon search_icon"
        tag="i"
        @click="resClick(searchText)"
    ></router-link>
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
        <div v-else class="searchResS">
          <div class="searchRes">
            <router-link
                v-for="(value,index) in searchHot"
                :to="{path:'/search',query:{text:value.searchWord}}"
                class="boxItem"
                tag="div"
                @click.native="resClick(value.searchWord)"
            >
              <span class="serial">{{ index + 1 }}</span>
              <span class="name">{{ value.searchWord }}</span>
              <span class="score">{{ $store.getters.playCount(value.score) }}</span>
            </router-link>
          </div>
          <div v-if="searchHistory[0]" class="historySearch">
            <div class="title">
              <span>历史搜索</span>
              <span @click="clearHistory"><i></i></span>
            </div>
            <router-link
                v-for="(item,index) in searchHistory"
                :to="{path:'/search',query:{text:item}}"
                class="item"
                tag="div"
                @click.native="resClick(item)">
              <span class="name">{{ item }}</span>
              <span class="icon" @click.stop="detRes(index)"><i></i></span>
            </router-link>
          </div>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import {getSearchHot, getSearchSug} from '@/network/getdata/search'

export default {
  name: "searchBar",
  data() {
    return {
      boxshow: false,
      searchText: '',
      searchHot: [],
      searchResult: [],
      searchHistory: [],
      resultText: {
        songs: '单曲',
        artists: '歌手',
        albums: '专辑',
        playlists: '歌单'
      }
    }
  },
  methods: {
    searchFocus() {//获取焦点
      this.boxshow = true
      if (!this.searchHot[0]) {
        this.getSearchHotFun()
      }
    },
    searchBlur() {//失去焦点
      this.boxshow = false
    },
    detRes(index) {//删除搜索记录某一项
      this.searchHistory.splice(index, 1);
      localStorage.historySearch = JSON.stringify(this.searchHistory)
    },
    clearHistory() {//删除所有搜索记录
      localStorage.historySearch = '[]'
      this.searchHistory = []
    },
    resClick(val) {//点击搜索
      if (val) {
        this.searchHistory.push(val)
        localStorage.historySearch = JSON.stringify(this.searchHistory)
      }
    },
    searchRes(val) {//input值改变
      if (val) {
        this.getSearchSug(val)
        console.log(val)
      } else {
        this.searchResult = []
      }
    },
    resultOrder(val) {
      if (val === 'songs') return 'songDet';
      else if (val === 'artists') return 'singerDet';
      else if (val === 'albums') return 'AlbumDet';
      else if (val === 'playlists') return 'playlistDet';
    },
    getSearchHotFun() {//热门搜索
      getSearchHot().then(res => {
        this.searchHot = res.data.splice(0, 5)
      })
    },
    getSearchSug(key) {//搜索建议
      getSearchSug(key).then(res => {
        this.searchResult = res.result
      })
    }
  },
  created() {
    if (!localStorage.historySearch) {
      localStorage.setItem('historySearch', [])
      this.searchHistory = []
    } else {
      this.searchHistory = JSON.parse(localStorage.historySearch)
    }
  }
}
</script>

<style lang="scss" scoped>
.search_bar {
  position: relative;
  top: 25px;
  width: 173px;
  height: 30px;
  margin-right: 40px;
  padding: 0 10px;
  border: 1px #c4c4c4 solid;
  line-height: 30px;
  font-size: 14px;

  input {
    border: 0;
    background: #f7f7f7ee;
    outline: none;
  }

  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button {
    display: none;
  }

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

  .box {
    position: relative;
    top: 0;
    right: 11px;
    width: 193px;
    max-height: 999px;
    overflow: hidden;
    background: #f7f7f7;
    border: 1px #c4c4c4 solid;
    z-index: 9999;

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

    .searchRes {
      .boxItem {
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        cursor: pointer;

        span {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .serial {
          width: 18px;
          font-size: 14px;
          color: #ff4222;
        }

        .name {
          color: #333;
          max-width: 110px;
        }

        .score {
          float: right;
          color: #999;
          font-size: 12px;
        }
      }

      .boxItem:hover {
        background: #31c27c;

        span {
          color: #fff;
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
        cursor: pointer;
        padding-left: 10px;

        .name {
          color: #333;
          max-width: 110px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
</style>