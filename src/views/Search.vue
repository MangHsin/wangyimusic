<template>
  <div>
    <div class="searchTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangzuojiantou" />
      </svg>
      <input type="text" placeholder="周杰伦" v-model="searchWord" @keydown.enter="inputKey" />
    </div>
    <div class="searchHistory">
      <span>历史</span>
      <span v-for="item in keywordList" :key="item" @click="searchHistory(item)">{{item}}</span>
      <svg class="icon" aria-hidden="true" @click="deleteHistory">
        <use xlink:href="#icon-shanchu" />
      </svg>
    </div>
    <div
      class="music-list"
      v-for="(item,index) in searchResult"
      :key="index"
      @click="switchMusic(item)"
    >
      <span class="sequence">{{index+1}}</span>
      <div class="song">
        <h4>{{item.name}}</h4>
        <span class="singer" v-for="author in item.artists" :key="author">{{author.name}}</span>
      </div>
      <div class="music-icon">
        <svg v-if="item.mvid!=0" class="icon" aria-hidden="true">
          <use xlink:href="#icon-shipinbofang" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang" />
        </svg>
      </div>
    </div>
  </div>
</template>
<script>
import { getSearch } from "@/request/api/home.js";
export default {
  data() {
    return {
      searchWord: "",
      keywordList: [],
      searchResult: []
    };
  },
  mounted() {
    this.keywordList = JSON.parse(localStorage.getItem("keywordList"))
      ? JSON.parse(localStorage.getItem("keywordList"))
      : [];
  },
  methods: {
    async inputKey() {
      this.keywordList.unshift(this.searchWord);
      //   console.log(this.keywordList);
      //   localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
      localStorage.setItem("keywordList", JSON.stringify(this.keywordList));
      let res = await getSearch(this.searchWord);
      this.searchResult = res.data.result.songs;
      console.log(res);
      this.searchWord = "";
    },
    async searchHistory(item) {
      let res = await getSearch(item);
      this.searchResult = res.data.result.songs;
      console.log(res);
    },
    deleteHistory() {
      localStorage.removeItem("keywordList");
      this.keywordList = [];
    },
    switchMusic(item) {
      item.al = item.album;
      item.al.picUrl = item.album.artist.img1v1Url;
      this.$store.commit("pushPlayList", item);
      this.$store.commit(
        "updatePlayListIndex",
        this.$store.state.playList.length - 1
      );
    }
  }
};
</script>
<style lang="less" scoped>
.music-list {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  // width: 50%;
  .sequence {
    width: 12%;
    // flex: 1;
    text-align: center;
    color: rgba(110, 106, 106, 0.788);
  }
  .song {
    // display: flex;
    // flex-direction: column;
    flex: 1;
    .singer {
      padding-right: 10px;
      color: rgba(110, 106, 106, 0.788);
    }
    .music-icon {
      // flex: 4.5;
      width: 24%;
    }
  }
}
</style>