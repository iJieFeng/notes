<template>
  <div class="common-card-container">
    <div class="title">{{ title }}</div>
    <div class="value">{{ value }}</div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
    <div class="line"></div>
    <div class="total">合计</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题",
    },
    value: {
      type: String,
      default: "值",
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  height: 50px;
}
</style>
