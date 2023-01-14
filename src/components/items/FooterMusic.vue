<template>
  <div class="FooterMusic">
    <div class="FooterLeft" @click="popOut">
      <img class="pic" :src="playList[playListIndex].al.picUrl" alt />
      <span class="song">{{playList[playListIndex].name}}</span>
      <span
        class="author"
        v-for="author in playList[playListIndex].ar"
        :key="author"
      >- {{ author.name}}</span>
    </div>
    <div class="FooterRight">
      <svg v-if="isPause" class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-24gf-play" />
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="play">
        <use xlink:href="#icon-zanting" />
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-24gf-playlistHeart" />
      </svg>
    </div>
    <!-- <audio
      controls
      :src="`https://music.163.com/song/url/v1?id=${playList[playListIndex].id}&level=standard `"
    ></audio>-->
    <audio
      ref="audio"
      :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
    ></audio>
    <!-- 顶部弹出 -->
    <van-popup :show="detailShow" position="top" :style="{ height: '100%',width:'100%' }">
      <MusicDetail
        :musicList="playList[playListIndex]"
        :play="play"
        :isPause="isPause"
        :addDuration="addDuration"
      ></MusicDetail>
    </van-popup>
  </div>
</template>
<script>
import MusicDetail from "./MusicDetail.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      interval: 0
    };
  },
  computed: {
    ...mapState([
      "playList",
      "playListIndex",
      "isPause",
      "detailShow",
      "currentTime",
      "duration"
    ])
  },
  mounted() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    // this.updateTime();
    this.addDuration();
  },
  updated() {
    this.$store.dispatch("getLyric", this.playList[this.playListIndex].id);
    this.addDuration();
  },
  methods: {
    play() {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updatePause(false);
        this.updateTime();
      } else {
        this.$refs.audio.pause();
        this.updatePause(true);
        clearInterval(this.interval);
      }
    },
    popOut() {
      if (!this.detailShow) {
        this.updateDetailShow();
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration);
    },
    updateTime() {
      setInterval(() => {
        this.interval = this.updateCurrentTime(this.$refs.audio.currentTime);
      }, 1000);
    },
    ...mapMutations([
      "updatePause",
      "updateDetailShow",
      "updateCurrentTime",
      "updateDuration"
    ])
  },
  watch: {
    // 监听下标，如果发生改变就自动播放
    playListIndex() {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        //如果是暂停状态，改变图标
        this.updatePause(false);
      }
    },
    // 监听歌单列表，发生改变就自动播放
    playList() {
      // console.log(this.isPause);
      if (this.isPause) {
        this.$refs.audio.autoplay = true;
        this.updatePause(false);
      }
    }
    // isPause() {
    //   if (this.isPause) {
    //     this.$refs.audio.play();
    //     this.updatePause(false);
    //   } else {
    //     this.$refs.audio.pause();
    //     this.updatePause(true);
    //   }
    // }
  },
  components: {
    MusicDetail
  }
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 70px;
  background-color: #ffffff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  display: flex;
  padding: 10px;
}
.FooterLeft {
  flex: 5;
  display: flex;
  .author,
  .song {
    line-height: 50px;
  }
  .author {
    padding: 0 5px;
    color: darkgrey;
  }
  .pic {
    border-radius: 50%;
    padding: 0 10px;
  }
}
.FooterRight {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>