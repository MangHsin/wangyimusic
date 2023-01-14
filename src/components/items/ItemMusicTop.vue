<template>
  <div class="item-display">
    <div class="ItemMusicTop">
      <img :src="playlist.coverImgUrl" alt class="bgImage" />
      <div class="ItemLeft">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-xiangzuojiantou" />
        </svg>
        <span>歌单</span>
      </div>
      <div class="ItemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo1" />
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang" />
        </svg>
      </div>
    </div>
    <div class="Itemdescription">
      <img :src="playlist.coverImgUrl" alt class="discripImage" />
      <div class="descipContent">
        <p>{{playlist.name}}</p>
        <div class="avator-intro">
          <img :src="playlist.creator.avatarUrl" alt class="avatar" />
          <span>{{playlist.creator.nickname}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyoujiantou" />
          </svg>
        </div>
        <!-- <p>{{playlist.creator.signature}}</p> -->
      </div>
    </div>
    <div class="ItemButton">
      <p class="sign">{{playlist.creator.signature}}</p>
      <div class="btn-display">
        <van-button>
          <svg class="icon btn-icon" aria-hidden="true">
            <use xlink:href="#icon-zhuanfa" />
          </svg>
          <span>{{playlist.shareCount}}</span>
        </van-button>
        <van-button icon="chat">{{playlist.commentCount}}</van-button>
        <van-button icon="star">{{playlist.subscribedCount}}</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    if ((props.playlist.creator = "")) {
      props.playlist.creator = JSON.parse(
        sessionStorage.getItem().playlist
      ).creator;
    }
    console.log(props);
  },
  props: ["playlist"]
};
</script>

<style lang="less" scoped>
.item-display {
  padding: 10px;
}
.ItemMusicTop {
  position: relative;
  width: 100%;
  height: 70px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .ItemRight,
  .ItemLeft {
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  span {
    color: #ffffff;
    font-size: 0.35rem;
  }
  .icon {
    fill: #ffffff;
  }
}
.bgImage {
  width: 100%;
  height: 280px;
  position: fixed;
  z-index: -1;
  //   虚化背景
  filter: blur(30px);
}
.Itemdescription {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  padding: 10px;
  .discripImage {
    width: 100px;
    height: 100px;
    border-radius: 10px;
  }
  .descipContent {
    width: 250px;
    span,
    p {
      color: #ffffff;
    }
    .avator-intro {
      display: flex;
      align-items: center;
    }
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    .icon {
      width: 25px;
      height: 25px;
      fill: #ffffff;
    }
  }
}
.ItemButton {
  padding: 10px;
  .sign {
    color: #ffffff;
    white-space: nowrap;
    overflow: hidden;
    padding-bottom: 20px;
  }
  .btn-display {
    display: flex;
    justify-content: space-between;
  }
  .van-button {
    width: 120px;
    border-radius: 30px;
    background-color: black;
    color: white;
    border: none;
    .btn-icon {
      vertical-align: sub;
      width: 15px;
      height: 15px;
    }

    // position: relative;
    // img {
    //   position: absolute;
    //   top: 13px;
    //   left: 20px;
    // }
    // .iconStyle {
    //   width: 15px;
    //   height: 15px;
    // }
  }
}
</style>