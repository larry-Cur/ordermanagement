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
      <el-button type="primary" @click="searchClick">查询</el-button>
    </div>
    <div id="salorderbox" :style="{width: '100%', height: '430px'}"></div>
  </div>
</template>

<script>
import { ordertotal } from "@/api/apis";
import { getYearDate,getDate } from "@/utils/utils";
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
      dateArr:[ "2020-05-30 00:00:00", "2020-10-10 00:00:00"],
      resData: [],
      resPrice: [],
    };
  },
  methods: {
    //searchClick查询
    searchClick(){
      let searchArr=this.searchDate
      this.dateArr=[]
      for(let k of searchArr){
        this.dateArr.push(getDate(k))
      }
      this.randOrder()
    },

    //表格
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("salorderbox"));
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["订单金额"],
        },
        xAxis: [
          {
            type: "category",
            data:this.resData,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "金额",
            min: 0,
            max: Math.ceil(Math.max(...this.resPrice)),
            interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          //this.resData.orderAmount
          {
            name: "订单金额",
            type: "bar",
            data: this.resPrice,
          },
        ],
      });
    },
    //渲染
    randOrder() {
      let dateArr1 = JSON.stringify(this.dateArr);
      ordertotal(dateArr1).then((res) => {
        let dArr = res.data.data;
         this.resData=[]
          this.resPrice=[]
        for (let j of dArr) {
          this.resData.push(getYearDate(j.orderTime))
          this.resPrice.push(j.orderAmount)
        }
        this.drawLine();
      });
    },
  },
  created() {
    this.randOrder();
  },
};
</script>

<style lang="less" scoped>
#salorderbox {
  margin-top: 20px;
  padding: 10px 0;
  background: #ffffff;
}
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
</style>