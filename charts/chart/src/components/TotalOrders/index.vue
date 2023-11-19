<template>
  <div class="total-orders-container">
    <common-card title="累计订单量" value="36,562,232">
      <template v-slot:chart>
        <!-- <div
          id="total-orders-chart"
          :style="{ width: '100%', height: '100%' }"
        ></div> -->
        <v-chart :option="getOptionsData()"></v-chart>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from "../../mixins/commonCardMixin";

export default {
  mixins: [commonCardMixin],
  data() {
    return {
      msg: "CNM",
    };
  },
  mounted() {
    /* const chartDom = document.getElementById("total-orders-chart");
    const chart = this.$echarts.init(chartDom);
    const option = {
      xAxis: {
        type: "category",
        boundaryGap: false,
        show: false,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [
            620, 1432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530,
            220, 620,
          ],
          areaStyle: {
            color: "purple",
          },
          lineStyle: {
            with: 0,
          },
          itemStyle: {
            opacity: 0,
          },
          smooth: true,
        },
      ],
      grid: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    };
    chart.setOption(option); */
  },
  methods: {
    getOptionsData() {
      return {
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [
              620, 1432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530,
              220, 620,
            ],
            areaStyle: {
              color: "purple",
            },
            lineStyle: {
              with: 0,
            },
            itemStyle: {
              opacity: 0,
            },
            smooth: true,
          },
        ],
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
