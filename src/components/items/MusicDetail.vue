<template>
  <div class="MusicDetail">
    <img :src="musicList.al.picUrl" alt class="bgImage" />
    <div class="head">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-xiangxiajiantou" />
      </svg>
      <div class="title">
        <!-- <Vue3Marquee class="song">{{playList[playListIndex].al.name}}</Vue3Marquee> -->
        <p class="song">{{musicList.al.name}}</p>
        <span class="author" v-for="author in musicList.ar" :key="author">{{author.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou" />
        </svg>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang" />
      </svg>
    </div>
    <div class="detailContent" v-show="!isLyricShow" @click="showLyric">
      <img
        src="@/assets/needle-ab.png"
        class="needle-pic"
        :class="{needle_pic_active:!isPause}"
        alt
      />
      <img src="@/assets/disc-plus.png" class="cd" alt />
      <img
        class="img_ar"
        :src="musicList.al.picUrl"
        :class="{img_ar_active:!isPause,img_ar_paused:isPause}"
        alt
      />
    </div>
    <div class="lyric" ref="musicLyric" v-show="isLyricShow" @click="showLyric">
      <p
        v-for="item in lyric"
        :key="item"
        :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.next)}"
      >{{item.lrc}}</p>
    </div>
    <div class="detailFooter">
      <div class="footerTop">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-05" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangxiajiantou" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang" />
        </svg>
      </div>
      <div class="progressBar">
        <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05" />
      </div>
      <div class="footer">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-" />
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishou-yuanshijituantubiao" />
        </svg>
        <svg v-if="isPause" class="icon" aria-hidden="true" @click="play">
          <use xlink:href="#icon-zanting1" />
        </svg>
        <svg v-else class="icon" aria-hidden="true" @click="play">
          <use xlink:href="#icon-zanting" />
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayishou-yuanshijituantubiao" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-playlistMusic2" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
import { reactive, onMounted } from "vue";
import { getLyric } from "@/request/api/item.js";
// import { Vue3Marquee } from "vue3-marquee";
// import "vue3-marquee/dist/style.css";
export default {
  // setup(props) {
  //   const state = reactive({
  //     results: []
  //   });
  //   onMounted(async () => {
  //     let res = await getLyric();
  //     console.log(res);

  //     state.results = res.data.result;
  //   });
  //   return state;
  // },
  data() {
    return {
      isLyricShow: false
    };
  },
  mounted() {
    this.addDuration();
  },
  props: ["musicList", "isPause", "play", "addDuration"],
  computed: {
    // ...mapState(["isPause", "detailShow"]),
    ...mapState([
      "lyricList",
      "currentTime",
      "playListIndex",
      "playList",
      "duration"
    ]),
    // ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    lyric() {
      let arr;
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[\r\n]/g).map((item, i) => {
          // console.log(item);
          let min = item.slice(1, 3);
          let sec = item.slice(4, 6);
          let mill = item.slice(7, 10);
          let lrc = item.slice(11, item.length);
          let time =
            parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9);
            lrc = item.slice(10, item.length);
            time =
              parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
          }
          console.log(min, sec, mill, lrc);
          console.log(this.isLyricShow);

          return { min, sec, mill, lrc, time };
        });
        arr.forEach((item, i) => {
          if (i == arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.next = 1000000;
          } else {
            item.next = arr[i + 1].time;
          }
        });
      }
      console.log(arr);
      return arr;
    }
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector("p.active");
      console.log([p]);
      if (p) {
        if (p.offsetTop > 400) {
          this.$refs.musicLyric.scrollTop = p.offsetTop - 400;
        }
      }
      if (newValue == this.duration) {
        if (this.playListIndex == this.playList.length - 1) {
          this.updatePlayListIndex(0);
          this.play();
        } else {
          this.updatePlayListIndex(this.playListIndex + 1);
        }
      }
    }
  },
  methods: {
    backHome() {
      this.isLyricShow = false;
      this.updateDetailShow();
    },
    showLyric() {
      this.isLyricShow = !this.isLyricShow;
      console.log("111");
    },
    goPlay(num) {
      let index = this.playListIndex + num;
      if (index < 0) {
        index = this.playList.length - 1;
      } else if (index == this.playList.length) {
        index = 0;
      }
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updateDetailShow", "updatePlayListIndex"])
  }
  // components: {
  //   Vue3Marquee
  // }
};
</script>
<style lang="less" scoped>
.MusicDetail {
  position: relative;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 10px;
}
.title svg {
  fill: gray;
  width: 10px;
  height: 10px;
  //   vertical-align: middle;
}
.song {
  color: #ffffff;
}
.author {
  color: gray;
  text-align: center;
}
.bgImage {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  //   虚化背景
  filter: blur(80px);
}
.range {
  width: 100%;
  height: 3px;
}
.lyric,
.detailContent {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .needle-pic {
    width: 100px;
    height: 150px;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-10deg);
    transition: all 2s;
  }
  .needle_pic_active {
    width: 100px;
    height: 150px;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(12deg);
    transition: all 2s;
  }
  .cd {
    width: 250px;
    height: 250px;
    position: absolute;
    bottom: 40px;
    z-index: -1;
  }

  .img_ar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    bottom: 84px;
    animation: rotate_ar 10s linear infinite;
    // z-index: -1;
  }
  .img_ar_active {
    animation-play-state: running;
  }
  .img_ar_paused {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
}
.lyric {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  overflow: scroll;
  p {
    color: white;
    margin-bottom: 20px;
  }
  .active {
    color: #ffffff;
    font-size: 20px;
  }
}
.footer,
.footerTop {
  display: flex;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;
  svg {
    fill: #ffffff;
  }
}
</style>