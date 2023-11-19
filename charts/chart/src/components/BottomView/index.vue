<template>
  <div class="bottom-view-container">
    <div class="bottom-view-card">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">关键词搜索</div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="search-chart">
              <div>
                <div>搜索用户数</div>
                <div>93,634</div>
                <v-chart :option="searchUserOptionData" />
              </div>
              <div>
                <div>搜索量</div>
                <div>198,634</div>
                <v-chart :option="searchNumOptionData" />
              </div>
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="bottom-view-card">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <el-radio-group
              class="cate-radio-group-style"
              v-model="radioCate"
              size="small"
            >
              <el-radio-button label="品类"></el-radio-button>
              <el-radio-button label="分类"></el-radio-button>
            </el-radio-group>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <v-chart :option="categoryOptionData" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchUserOptionData: {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [1200, 364, 240, 233, 141, 200, 364, 240, 233, 141],
            areaStyle: {
              color: "rgba(95,187,255,.5)",
            },
            lineStyle: {
              width: 0,
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
      },
      searchNumOptionData: {
        xAxis: {
          type: "category",
          show: false,
          boundaryGap: false,
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [200, 364, 240, 233, 141, 500, 364, 240, 233, 141],
            areaStyle: {
              color: "rgba(95,187,255,.5)",
            },
            lineStyle: {
              width: 0,
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
      },
      radioCate: "品类",
      categoryOptionData: {},
    };
  },
  mounted() {
    this.renderPieData();
  },
  methods: {
    renderPieData() {
      const mockData = [
        {
          legendname: "粉面粥店",
          value: 67,
          percent: "15.04%",
          itemStyle: {
            color: "#e7e702",
          },
          name: "粉面粥店 | 15.04%",
        },
        {
          legendname: "简餐便当",
          value: 97,
          percent: "23.30%",
          itemStyle: {
            color: "#8d7fec",
          },
          name: "简餐便当 | 23.30%",
        },
        {
          legendname: "汉堡披萨",
          value: 92,
          percent: "21.04%",
          itemStyle: {
            color: "#5085f2",
          },
          name: "汉堡披萨 | 21.04%",
        },
      ];
      this.categoryOptionData = {
        title: [
          {
            text: "品类发布",
            textStyle: { fontSize: 14, color: "#666" },
            left: 20,
            top: 20,
          },
          {
            text: "累计订单量",
            subtext: "320",
            x: "34.5%",
            y: "42.5%",
            textAlign: "center",
          },
        ],
        tooltip: {
          trigger: "item",
          // 自定义
          /* formatter: function (params) {
            return params.seriesName;
          }, */
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          // left: "right",
          // height: 40
          left: "70%",
          top: "middle",
        },
        series: [
          {
            name: "品类分布",
            type: "pie",
            data: mockData,
            label: {
              normal: {
                show: true,
                // position: "outter",
                formatter: function (params) {
                  return params.data.legendname;
                },
              },
            },
            center: ["35%", "50%"],
            radius: ["45%", "60%"],
            labelLine: {
              normal: {
                length: 5,
                length2: 3,
                smooth: true,
              },
            },
            clockwise: false,
            itemStyle: {
              borderWidth: 10,
              borderColor: "#fff",
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom-view-container {
  width: 100%;
  display: flex;
  margin-top: 20px;
  .bottom-view-card {
    flex: 1;
    &:first-child {
      margin-right: 10px;
    }
    &:last-child {
      margin-left: 10px;
    }
  }
  .title-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 0 0 20px;
    border-bottom: 1px solid #eee;
    .cate-radio-group-style {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px 0 0;
    }
  }
  .chart-wrapper {
    width: 100%;
    height: 450px;
    .search-chart {
      display: flex;
      & > div {
        flex: 1;
        .echarts {
          margin-top: 40px;
          height: 350px;
        }
      }
      & > div:first-child {
        margin-right: 10px;
      }
      & > div:last-child {
        margin-left: 10px;
      }
    }
  }
}
</style>
