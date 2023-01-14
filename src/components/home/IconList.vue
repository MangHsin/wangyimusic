<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang" />
      </svg>
      <span>排行榜</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-rili" />
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji" />
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-yinlegedan-" />
      </svg>
      <span>歌单</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.iconList {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-around;
  span {
    display: block;
    text-align: center;
  }
  .icon {
    width: 50px;
    height: 50px;
  }
}
</style>