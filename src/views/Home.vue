<template>
  <div>
    <TopNav></TopNav>
    <Swipe></Swipe>
    <IconList></IconList>
    <MusicList></MusicList>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from "@/components/home/TopNav.vue";
import Swipe from "@/components/home/Swipe.vue";
import IconList from "@/components/home/IconList.vue";
import MusicList from "@/components/home/MusicList.vue";
export default {
  name: "Home",
  components: {
    TopNav,
    Swipe,
    IconList,
    MusicList
  }
};
</script>
