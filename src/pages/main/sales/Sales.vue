<template>
  <div>
    <div class="title_div">
      <p class="title">时间范围</p>
      <el-date-picker
        v-model="searchDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <el-button type="primary">查询</el-button>
    </div>
    <div id="salesbox" :style="{width: '100%', height: '430px'}"></div>
  </div>
</template>

<script>
import { totaldata } from "@/api/apis";
import { getYearDate } from "@/utils/utils";
//getDate
export default {
  data() {
    return {
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
      searchDate: [],
      dateArr: ["2020-05-30 00:00:00", "2020-10-10 00:00:00"],
      resData: [],
      resPrice: [],
      resOrder: [],
      resALLOrder: [],
      resALLPrice: [],

    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("salesbox"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "销售统计",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["总订单", "总销售额", "当日订单", "当日销售额"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.resData,
          },
        ],
        yAxis: [
          {
            type: "value",

          },
        ],
        series: [
          {
            name: "总订单",
            type: "line",
            areaStyle: {},
            data: this.resALLOrder,
          },
          {
            name: "总销售额",
            type: "line",
            areaStyle: {},
            data: this.resALLPrice,
          },
          {
            name: "当日订单",
            type: "line",
            areaStyle: {},
            data: this.resOrder,
          },
          {
            name: "当日销售额",
            type: "line",
            areaStyle: {},
            data: this.resPrice,
          },
        ],
      });
    },
    //渲染
    randsales() {
      totaldata().then((res) => { 
        let dateArr = res.data.xData;
        this.resData = [];
        //  this.resALLOrder.push(res.data.totalOrder)
        // this.resALLPrice.push(res.data.totalAmount)
        for (let f of dateArr) {
          this.resData.push(getYearDate(f));
        }
        this.resPrice = res.data.orderData;
        this.resOrder = res.data.amountData;

        this.drawLine();
      });
    },
  },
  created() {
    this.randsales();
  },
};
</script>

<style lang="less" scoped>
.title_div {
  display: flex;
  width: 540px;
  justify-content: space-between;
  .title {
    color: #777;
    line-height: 40px;
    text-align: center;
  }
}
#salesbox {
  margin-top: 20px;
  padding: 10px 0;
  background: #ffffff;
}
</style>