<template>
  <div class="musicList">
    <div class="musicTop">
      <span class="title">推荐歌单</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangyoujiantou" />
      </svg>
    </div>
    <div class="music-pic">
      <van-swipe :loop="false" :width="160" :show-indicators="false">
        <van-swipe-item v-for="result in state.results" :key="result">
          <router-link :to="{path:'/itemMusic',query:{id:result.id}}">
            <img :src="result.picUrl" />
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-bofang1" />
            </svg>
            <span class="playCount">{{changeCount(result.playCount)}}</span>
            <span>{{result.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { reactive, onMounted } from "vue";
import { getMusicList } from "@/request/api/home.js";
export default {
  setup() {
    const state = reactive({
      results: []
    });
    onMounted(async () => {
      // axios.get("http://localhost:3000/banner?type=2").then(res => {
      //   console.log(res);
      //   state.images = res.data.banners;
      // });
      let res = await getMusicList();
      console.log(res);

      state.results = res.data.result;
    });
    function changeCount(num) {
      if (num > 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num > 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { state, changeCount };
  }
};
</script>
<style lang="less" scoped>
.musicList {
  width: 100%;
  padding: 0 15px;
  .musicTop {
    height: 50px;
    display: flex;
    align-items: center;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
    margin-right: 2px;
  }
}
.musicTop .icon {
  width: 15px;
  height: 15px;
}
.van-swipe {
  padding: 0;
  .icon {
    position: absolute;
    top: 9px;
    left: 60px;
    width: 15px;
    height: 15px;
  }
  .van-swipe-item {
    padding-right: 10px;
  }
}
.music-pic {
  width: 100%;
  height: 200px;
  img {
    width: 150px;
    height: 150px;
    border-radius: 10px;
  }
}
.playCount {
  position: absolute;
  top: 5px;
  right: 15px;
  color: #ffffff;
  font-weight: bold;
}
</style>