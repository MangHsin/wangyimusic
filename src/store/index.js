import {
  createStore
} from 'vuex';
import {
  getMusicLyric
} from "@/request/api/item.js";
import {
  getPhone
} from '../request/api/home';

export default createStore({
  state: {
    playList: [{
      al: {
        id: 89039055,
        name: "雨爱抖音版",
        pic: 109951164966568500,
        picUrl: "https://p1.music.126.net/2f6UgY8Jc0Dy6jufMdIZeQ==/109951164966568495.jpg",
        pic_str: "109951164966568495"
      },
      id: 1446137141,
      ar: {
        name: "灏灏灏仔"
      }
    }],
    playListIndex: 0,
    isPause: true,
    detailShow: false,
    // 歌词部分
    lyricList: {

    },
    currentTime: 0,
    isLogin: false,
    isFooterShow: true,
    token: '',
    duration: 0
  },
  mutations: {
    pushPlayList(state, value) {
      state.playList.push(value)
    },
    updatePause(state, value) {
      state.isPause = value
    },
    // 更新播放列表拿到更新过后的的playList，里面有多首索引歌曲
    updatePlayList(state, value) {
      state.playList = value
      console.log(state.playList);

    },
    updatePlayListIndex(state, value) {
      state.playListIndex = value;
    },
    updateDetailShow(state, value) {
      state.detailShow = !state.detailShow;
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
      console.log(state.currentTime);

    },
    updateDuration(state, value) {
      state.duration = value
    },
    updateIsLogin(state, value) {
      state.isLogin = value
    },
    updateToken(state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMusicLyric(value);
      console.log(res);
      context.commit("updateLyricList", res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await getPhone(value);
      console.log(res);
      return res;
    }
  },
  modules: {}
})