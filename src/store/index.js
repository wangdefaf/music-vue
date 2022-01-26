import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playlist: [],//player 歌曲列表
    playIndex: 0,//player 歌曲索引
    songCurrentTime: 0,//当前播放的时间
  },
  getters: {
    playCount: (state) => (count) => {
      count = count + ''
      if (count.length >= 5) return count.substring(0, count.length - 4) + '万'
      return count
    },
    Date: (state) => (str) => {
      Date.prototype.toLocaleString = function () {
        return this.getFullYear() + '-' + (this.getMonth() + 1) + "-" + this.getDate();
      };
      let unixTimestamp = new Date(str);
      return unixTimestamp.toLocaleString();
    },
    DateY: (state) => (str) => {
      Date.prototype.toLocaleString = function () {
        return this.getFullYear() + "年" + (this.getMonth() + 1) + "月" +
            this.getDate() + "日 " + this.getHours() + ":" + this.getMinutes();
      };
      let unixTimestamp = new Date(str);
      return unixTimestamp.toLocaleString();
    },
    //获取歌曲时间 毫秒转换分：秒
    formatTime: (state) => (time) => {
      // 取整
      time = ~~time
      var formatTime
      if (time < 10) {
        formatTime = '00:0' + time
      } else if (time < 60) {
        formatTime = '00:' + time
      } else {
        var m = ~~parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
        if (m < 10) {
          m = '0' + m
        }
        var s = ~~parseInt((time % (1000 * 60)) / 1000)
        if (s < 10) {
          s = '0' + s
        }
        formatTime = m + ':' + s
      }
      return formatTime
    },
    second: (state) => (timeDisplay) => {
      //分钟
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds
    }
  },
  mutations: {
    playlistChange(state, data) {
      state.playlist = data
    },
    playIndexChange(state, data) {
      state.playIndex = data
    },
    songCurrentTimeChange(state, data) {
      state.songCurrentTime = data
    }
  },
  actions: {},
  modules: {}
})
