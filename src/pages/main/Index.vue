<template>
  <div class="index_div">
    <div class="all_div">
      <el-card shadow="hover" v-for="(item,index) in total" :key="index">
        <div class="all_box">
          <i :class="item.img"></i>
          <div class="total_div">
            <h5>{{item.title}}</h5>
            <p>{{item.num}}</p>
          </div>
        </div>
      </el-card>
    </div>
    <div id="myChart" :style="{width: '100%', height: '400px'}"></div>
  </div>
</template>

<script>
// var myChart = this.$echarts.init(document.getElementById('main'));
import { totaldata } from "@/api/apis";
import echarts from "echarts";
import { getYearDate } from "@/utils/utils";
export default {
  data() {
    return {
      total: [
        {
          img: "el-icon-document",
          title: "总订单",
          num: "200",
        },
        {
          img: "el-icon-coin",
          title: "总销售额",
          num: "15,000",
        },
        {
          img: "el-icon-document-copy",
          title: "今日订单数",
          num: "100",
        },
        {
          img: "el-icon-money",
          title: "今日销售额",
          num: "9,000",
        },
      ],
      resData: [],
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById("myChart"));
    // 绘制图表
    // axio
    totaldata().then((res) => {
      let dateArr = res.data.xData;
      this.resData = [];
      //  this.resALLOrder.push(res.data.totalOrder)
      // this.resALLPrice.push(res.data.totalAmount)
      for (let f of dateArr) {
        this.resData.push(getYearDate(f));
      }
      this.total[0].num = res.data.totalOrder;
      this.total[1].num = res.data.totalAmount;
      this.total[2].num = res.data.todayOrder;
      this.total[3].num = res.data.totayAmount;

      //表格
      let option = {
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
          data: ["当日订单", "当日销售额"],
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
            name: "当日订单",
            type: "line",
            areaStyle: {},
            data: res.data.amountData,
          },
          {
            name: "当日销售额",
            type: "line",
            areaStyle: {},
            data: res.data.orderData,
          },
        ],
      };

      myChart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
.all_div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-card {
    width: 24%;
    .all_box {
      width: 100%;
      display: flex;
      justify-content: space-between;
      i {
        font-size: 80px;
        color: #1296db;
      }

      .total_div {
        font-size: 24px;
        h5 {
          line-height: 40px;
          color: #cccccc;
        }
        p {
          font-weight: bold;
        }
      }
    }
  }
  .el-card:nth-child(2) {
    i {
      color: #d4237a;
    }
  }
  .el-card:nth-child(4) {
    i {
      color: #1afa29;
    }
  }
}
#myChart {
  background: #fff;
  margin-top: 30px;
  padding-top: 10px;
}
</style>