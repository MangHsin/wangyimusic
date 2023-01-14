<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao_o" />
      </svg>
    </div>
    <div class="topContent">
      <span @click="$router.push('/infoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.topNav {
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .active {
    font-weight: bold;
  }
}
.topNav .topContent {
  width: 75%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>