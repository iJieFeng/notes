<template>
  <div class="home">
    <top-view></top-view>
    <sales-view></sales-view>
    <bottom-view></bottom-view>
    <map-view></map-view>
  </div>
</template>
<script>
import TopView from "../components/TopView";
import SalesView from "../components/SalesView";
import BottomView from "../components/BottomView";
import MapView from "../components/MapView";

export default {
  name: "Home",
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView,
  },
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 20px;
  background: #eee;
}
</style>
