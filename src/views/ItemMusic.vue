<template>
  <div>
    <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
    <ItemMusicList :itemList="state.itemList" />
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { onMounted, reactive } from "vue";
import { getMusicItemList, getMusicDetail } from "@/request/api/item.js";
import ItemMusicTop from "@/components/items/ItemMusicTop.vue";
import ItemMusicList from "@/components/items/ItemMusicList.vue";
export default {
  setup() {
    const state = reactive({
      playlist: {},
      itemList: {}
    });
    onMounted(async () => {
      console.log(useRoute()); //括号别忘了
      let id = useRoute().query.id;
      console.log(id);
      // 获取歌单
      let res = await getMusicItemList(id);
      console.log(res);
      state.playlist = res.data.playlist;
      console.log(state.playlist);
      // 获取歌单所有歌曲
      let result = await getMusicDetail(id);
      console.log(result);
      state.itemList = result.data.songs;
      console.log(state.itemList);
      // 防止页面刷新，数据丢失，存在sessionStorage里
      sessionStorage.setItem("itemDetail", JSON.stringfy(state));
    });
    return { state };
  },
  components: {
    ItemMusicTop,
    ItemMusicList
  }
};
</script>