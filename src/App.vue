<template>
  <div>
    <router-view />
    <FooterMusic />
  </div>
</template>
<script>
import FooterMusic from "@/components/items/FooterMusic.vue";
export default {
  components: {
    FooterMusic
  }
};
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  // 设置内边距不会撑开盒子
  box-sizing: border-box;
}
.icon {
  width: 25px;
  height: 25px;
}
a {
  color: black;
}
</style>
