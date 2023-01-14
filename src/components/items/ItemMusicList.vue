<template>
  <div class="itemMusic">
    <div class="itemMusicList">
      <div class="itemLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang" />
        </svg>
        <span>播放全部</span>
        <span class="len">({{itemList.length}})</span>
      </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai-wenjianxiazai-05" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiaoshunxu" />
        </svg>
      </div>
    </div>
    <div class="music-list" v-for="(item,index) in itemList" :key="index" @click="playMusic(index)">
      <span class="sequence">{{index+1}}</span>
      <div class="song">
        <h4>{{item.name}}</h4>
        <span class="singer" v-for="author in item.ar" :key="author">{{author.name}}</span>
      </div>
      <div class="music-icon">
        <svg v-if="item.mv!=0" class="icon" aria-hidden="true">
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
import { mapMutations } from "vuex";
export default {
  setup(props) {
    // return {};
  },
  props: ["itemList"],
  methods: {
    playMusic(index) {
      console.log(this.itemList);
      this.updatePlayList(this.itemList);
      this.updatePlayListIndex(index);
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"])
  }
};
</script>

<style lang="less" scoped>
.itemMusic {
  width: 100%;
  height: 500px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: #ffffff;
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
}
.itemMusicList {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  .itemLeft {
    width: 40%;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
    align-items: center;
    .len {
      color: dimgrey;
    }
  }
  .itemRight {
    width: 20%;
    display: flex;
    padding: 10px 0;
    justify-content: space-between;
  }
}
</style>