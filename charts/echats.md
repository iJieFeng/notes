# ECharts开发记录

## ECharts

官网：https://echarts.apache.org/handbook/zh/basics/download

安装：npm install echarts --save

案例：![image-20220222150227842](C:\Users\pc\AppData\Roaming\Typora\typora-user-images\image-20220222150227842.png)

代码：

```js
// 1.引入 js 库
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
```

```vue
<!-- 2.编写渲染容器 DOM，添加 width 和 height 样式属性 -->
<div id="main" style="width: 600px;height:400px;"></div>
```

```js
// 3.获取渲染 DOM 对象
const chartDom = document.getElementById("main");
// 4.初始化 ECharts 对象
const chart = this.$echarts.init(chartDom);
// 5.编写 option 参数
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'cross' }
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月'
      ]
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '降水量',
      min: 0,
      max: 250,
      position: 'right',
      axisLabel: {
        formatter: '{value} ml'
      }
    },
    {
      type: 'value',
      name: '温度',
      min: 0,
      max: 25,
      position: 'left',
      axisLabel: {
        formatter: '{value} °C'
      }
    }
  ],
  series: [
    {
      name: '降水量',
      type: 'bar',
      yAxisIndex: 0,
      data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3]
    },
    {
      name: '温度',
      type: 'line',
      smooth: true,
      yAxisIndex: 1,
      data: [
        6.0,
        10.2,
        10.3,
        11.5,
        10.3,
        13.2,
        14.3,
        16.4,
        18.0,
        16.5,
        12.0,
        5.2
      ]
    }
  ]
}; 
// 6.调用 setOption 完成渲染
chart.setOption(option)
```



## Vue-Echarts

gitHub：https://github.com/ecomfe/vue-echarts

安装：

```js
npm install echarts vue-echarts
npm i -D @vue/composition-api
```

引入：

```js
import VueECharts from 'vue-echarts'
Vue.component('v-chart', VueECharts)
```

使用：

```vue
<v-chart :option="optionsData"></v-chart>
```

```js
export default {
  data() {
    return {
      optionsData: {
        xAxis: {
          type: "category",
        },
        yAxis: {},
        series: [
          {
            type: "line",
            data: [100, 200, 300],
          },
        ],
      },
    };
  },
};
```

## v-charts

适用于快速生成图标，并且不需要修改样式的需求

官网：https://v-charts.js.org/#/

安装：

```
npm i v-charts echarts -S
```

引入：

```js
// 完整引入
import VCharts from 'v-charts'
Vue.use(VCharts)

// 按需引入
// plugins/v-charts.js
import Vue from "vue";
import VeLine from "v-charts/lib/line.common";
import VeBar from "v-charts/lib/bar.common";
import VeHistogram from "v-charts/lib/histogram.common";
...
Vue.component("ve-line", VeLine); // 折线图
Vue.component("ve-bar", VeBar); // 条形图
Vue.component("ve-histogram", VeHistogram); // 条形图
...
// main.js
import './plugins/vcharts.js'
```

使用：

```vue
<ve-line :data="chartData"></ve-line>
```

```js
export default {
  data() {
    return {
      chartData: {
        columns: ["日期", "销售额"],
        rows: [
          { 日期: "1月1日", 销售额: 123 },
          { 日期: "1月2日", 销售额: 1223 },
          { 日期: "1月3日", 销售额: 2123 },
          { 日期: "1月4日", 销售额: 4123 },
          { 日期: "1月5日", 销售额: 3123 },
          { 日期: "1月6日", 销售额: 7123 },
        ],
      },
    };
  },
};
```
