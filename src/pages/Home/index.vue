<template>
  <div>
    <!-- 已经在main.js中注册为全局组件，就不用再引入了。 -->
    <TypeNav />
    <ListContainer></ListContainer>
    <Recommand></Recommand>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorlist" :key="floor.id" :list="floor"></Floor>
    <Brank></Brank>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import Recommand from "@/pages/Home/Recommand";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brank from "@/pages/Home/Brank";
import { mapState } from "vuex";

export default {
  name: "home",
  components: {
    ListContainer,
    Recommand,
    Rank,
    Like,
    Floor,
    Brank,
  },
  mounted() {
    this.$store.dispatch("getFloorList");
    // 获取用户信息
    // this.$store.dispatch('getUserInfo');
    // 现在不用在每个路由组件都发送一次获取用户信息的actions了，已经放在了全局守卫那里请求actions了。
  },
  computed: {
    ...mapState({
      floorlist: (state) => {
        return state.home.floorlist;
      },
    }),
  },
};
</script>

<style>
</style>