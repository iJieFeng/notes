# Vue3实现图片滚轮缩放

```vue
<template>
  <div class="home" style="margin: 50px">首页</div>
  <div class="wrap" @mousewheel.prevent="rollImg">
    <img :src="url" alt ref="image" @mousedown.prevent="moveImg" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const url = ref("https://ysh-sh.oss-cn-shanghai.aliyuncs.com/test/share/ic_share_20_bg.png");

const image = ref(null);
const rollImg = (e) => {
  let transform = image.value.style.transform;
  let zoom =
    transform.indexOf("scale") != -1
      ? +transform.split("(")[1].split(")")[0]
      : 1;
  zoom += e.wheelDelta / 1200;
  if (zoom > 0.1 && zoom < 2) {
    image.value.style.transform = "scale(" + zoom + ")";
  }
};

const moveImg = (e) => {
  let x = e.clientX;
  let y = e.clientY;
  let left = x - e.target.offsetLeft;
  let top = y - e.target.offsetTop;
  document.onmousemove = (ev) => {
    e.target.style.left = ev.clientX - left + "px";
    e.target.style.top = ev.clientY - top + "px";
  };
  document.onmouseup = () => {
    document.onmousemove = null;
  };
};
</script>

<style lang="less" scoped>
.wrap {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  position: absolute;
  cursor: move;
}
</style>
```
