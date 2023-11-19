<template>
  <div class="sales-view-container">
    <el-card>
      <template v-slot:header>
        <div class="menu-wrapper">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            class="menu-sales-style"
          >
            <el-menu-item index="1">销售额</el-menu-item>
            <el-menu-item index="2">访问量</el-menu-item>
          </el-menu>

          <div class="menu-right">
            <el-radio-group v-model="radioDate" size="small">
              <el-radio-button label="今日"></el-radio-button>
              <el-radio-button label="本周"></el-radio-button>
              <el-radio-button label="本月"></el-radio-button>
              <el-radio-button label="今年"></el-radio-button>
            </el-radio-group>
            <el-date-picker
              style="margin-left: 20px"
              size="small"
              v-model="dateValue"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
            >
            </el-date-picker>
          </div>
        </div>
      </template>
      <template>
        <div class="sales-data-wrapper">
          <v-chart :option="salesOptionData"></v-chart>
          <div class="rank-wrapper">
            <div class="rank-title">排行榜</div>
            <div class="rank-list">
              <div class="rank-item" v-for="item in rankData" :key="item.id">
                <div>{{ item.id }}</div>
                <div>{{ item.name }}</div>
                <div>{{ item.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      radioDate: "今日",
      dateValue: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      salesOptionData: {
        title: {
          text: "年度销售额",
          textStyle: {
            fontSize: 12,
            color: "#666",
          },
          left: 20,
          top: 10,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          axisTick: {
            alignWithLabel: true,
            lineStyle: {
              color: "#999",
            },
          },
          axisLine: {
            lineStyle: {
              color: "#999",
            },
          },
          axisLabel: {
            color: "#333",
          },
          position: "bottom",
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "#eee",
            },
          },
        },
        series: [
          {
            type: "bar",
            data: [200, 200, 150, 260, 241, 365, 200, 100, 150, 260, 241, 165],
            barWidth: "35%",
          },
        ],
        grid: {
          top: 70,
          right: 60,
          bottom: 20,
          left: 60,
        },
        color: ["#3398DB"],
      },
      rankData: [
        { id: 1, name: "麦当劳", value: "323,234" },
        { id: 2, name: "麦当劳", value: "323,234" },
        { id: 3, name: "麦当劳", value: "323,234" },
        { id: 4, name: "麦当劳", value: "323,234" },
        { id: 5, name: "麦当劳", value: "323,234" },
        { id: 6, name: "麦当劳", value: "323,234" },
        { id: 7, name: "麦当劳", value: "323,234" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.sales-view-container {
  margin-top: 20px;
  .menu-wrapper {
    position: relative;
    .menu-sales-style {
      width: 100%;
      padding-left: 20px;
      .el-menu-item {
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
      }
    }
    .menu-right {
      height: 50px;
      display: flex;
      align-items: center;
      position: absolute;
      justify-content: flex-end;
      right: 10px;
      top: 0;
    }
  }
  .sales-data-wrapper {
    display: flex;
    height: 270px;

    .echarts {
      flex: 0 0 80%;
      height: 100%;
    }

    .rank-wrapper {
      flex: 1;
      height: 100%;
      overflow: hidden;
      .rank-list {
        .rank-item {
          display: flex;
          align-items: center;
          margin: 10px 0;
          & > div:nth-of-type(1) {
            display: flex;
            align-items: center;
            width: 24px;
            height: 24px;
          }
          & > div:nth-of-type(3) {
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
