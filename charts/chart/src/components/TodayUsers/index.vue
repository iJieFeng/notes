<template>
  <div class="today-users-container">
    <common-card title="今日交易用户数" value="80,365">
      <template v-slot:chart>
        <div
          id="today-users-chart"
          :style="{ width: '100%', height: '100%' }"
        ></div>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from "../../mixins/commonCardMixin";

export default {
  mixins: [commonCardMixin],
  mounted() {
    const chartDom = document.getElementById("today-users-chart");
    const chart = this.$echarts.init(chartDom);
    const option = {
      color: ["#3398DB"],
      series: [
        {
          type: "bar",
          data: [
            410, 82, 200, 334, 330, 220, 150, 82, 200, 134, 298, 330, 150, 100,
          ],
          barWidth: "50%",
        },
      ],
      xAxis: {
        type: "category",
        data: [
          "00.00",
          "01.00",
          "02.00",
          "03.00",
          "04.00",
          "05.00",
          "06.00",
          "04.00",
          "08.00",
          "09.00",
          "10.00",
          "11.00",
          "12.00",
          "13.00",
        ],
        show: false,
      },
      yAxis: {
        show: false,
      },
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    };
    chart.setOption(option);
  },
};
</script>

<style lang="scss" scoped>
</style>
