<template>
  <div class="order">
    <!-- 查看详情 -->
    <el-dialog title="提示" :visible.sync="oderdetil" width="50%">
      <el-row class="detail_row">
        <el-col :span="3" class="detail_col">订单号：</el-col>
        <el-col :span="5">{{detail.orderNo}}</el-col>
        <el-col :span="3" class="detail_col">下单时间:</el-col>
        <el-col :span="5">{{detail.orderTime1}}</el-col>
        <el-col :span="3" class="detail_col">手机号:</el-col>
        <el-col :span="5">{{detail.phone}}</el-col>
      </el-row>
      <el-row class="detail_row">
        <el-col :span="3" class="detail_col">收货人:</el-col>
        <el-col :span="5">{{detail.consignee}}</el-col>
        <el-col :span="3" class="detail_col">配送地址:</el-col>
        <el-col :span="5">{{detail.deliverAddress}}</el-col>
        <el-col :span="3" class="detail_col">送达时间:</el-col>
        <el-col :span="5">{{detail.deliveryTime1}}</el-col>
      </el-row>
      <el-row class="detail_row">
        <el-col :span="3" class="detail_col">用户备注:</el-col>
        <el-col :span="5">{{detail.remarks}}</el-col>
        <el-col :span="3" class="detail_col">订单金额:</el-col>
        <el-col :span="5">{{detail.orderAmount}}</el-col>
        <el-col :span="3" class="detail_col">订单状态:</el-col>
        <el-col :span="5">{{detail.orderState}}</el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="oderdetil = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog title="修改订单" :visible.sync="dialogFormVisible">
      <el-form :model="changetable">
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="changetable.orderNo" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-time-picker
              v-model="changetable.orderTime"
              :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input v-model="changetable.phone" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="changetable.consignee" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input v-model="changetable.deliverAddress" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="送达时间" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-time-picker
              v-model="changetable.deliveryTime"
              :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-col :span="12">
            <el-input v-model="changetable.remarks" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-input v-model="changetable.orderAmount" autocomplete="off"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-col :span="10">
            <el-select v-model="changetable.orderState" placeholder="订单状态">
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changegoodClick" lain="true">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜索表单 -->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row>
        <el-form-item label="订单号">
          <el-col :span="24">
            <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="收货人">
          <el-col :span="24">
            <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="手机号">
          <el-col :span="24">
            <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-col :span="24">
            <el-select v-model="formInline.orderState" placeholder="订单状态">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-row>
      <span class="time_span">选择时间</span>
      <el-date-picker
        v-model="formInline.date"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" id="orderseach_btn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="list_div">
      <el-table :data="orderlist" border style="width: 100%" max-height="420" v-loading="loading">
        <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
        <el-table-column prop="orderTime1" label="下单时间"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="consignee" label="收货人"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址"></el-table-column>
        <el-table-column prop="deliveryTime1" label="送达时间"></el-table-column>
        <el-table-column prop="remarks" label="用户备注"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
        <el-table-column prop="orderState" label="订单状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="changeClick(scope.row)" lain="true">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :page-sizes="[5, 10, 20]"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { orderlist, orderedit } from "@/api/apis";
import { getHoursDate, getDate } from "@/utils/utils";

export default {
  data() {
    return {
      loading: true,
      pageSize: 5,
      currentPage: 1,
      total: 10,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      oderdetil: false,
      detail: {},
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: null,
      },
      changetable: {
        // id: "",
        // orderNo: "",
        // orderTime:"",
        // phone: "",
        // consignee: "",
        // deliverAddress: "",
        // deliveryTime: "",
        // remarks: "",
        // orderAmount: "",
        // orderState: "",
      },
      orderlist: [],
    };
  },
  methods: {
    //查看
    handleClick(row) {
      this.detail = row;
      this.oderdetil = true;
    },
    // 编辑
    changeClick(row) {
      this.dialogFormVisible = true;
      this.changetable = row;
    },
    //确认编辑
    changegoodClick() {
      let orderTime = getDate(this.changetable.orderTime);
      let deliveryTime = getDate(this.changetable.deliveryTime);
      let {
        id,
        orderNo,
        phone,
        consignee,
        deliverAddress,
        remarks,
        orderAmount,
        orderState,
      } = this.changetable;
      orderedit(
        id,
        orderNo,
        orderTime,
        phone,
        consignee,
        deliverAddress,
        deliveryTime,
        remarks,
        orderAmount,
        orderState
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.dialogFormVisible = false;
          //渲染函数
          this.randorder();
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      //渲染函数
      this.randorder();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      //渲染函数
      this.randorder(this.paramsex);
    },
    //查询
    onSubmit() {
      // let strdata = [];
      // let arr = this.formInline.date;
      // for (let d of arr) {
      //   strdata.push(getDate(d));
      //   console.log(strdata);
      // }
      // strdata = JSON.stringify(strdata);
      let { orderNo, consignee, phone, orderState } = this.formInline;

      //额外参数对象
      let paramsex = {};
      if (orderNo != "") paramsex.orderNo = orderNo;
      if (consignee != "") paramsex.consignee = consignee;
      if (phone != "") paramsex.phone = phone;
      if (orderState != "" && orderState != "全部")
        paramsex.orderState = orderState;
      if (this.formInline.date)
        paramsex.date = JSON.stringify([
          getDate(this.formInline.date[0]),
          getDate(this.formInline.date[1]),
        ]);

      this.paramsex = paramsex;
      this.currentPage=1
      this.pageSize=5
      this.randorder(this.paramsex);
      // orderlist(
      //   currentPage,
      //   pagesize,
      // ).then((res) => {
      //   if (res.data) {
      //     let arr = res.data.data;
      //     for (let obj of arr) {
      //       obj.orderTime1 = getHoursDate(obj.orderTime);
      //       obj.deliveryTime1 = getHoursDate(obj.deliveryTime);
      //     }
      //     this.total = res.data.total;
      //     this.orderlist = arr;
      //   } else {
      //     alert("数据加载失败");
      //   }
      // });
    },
    //渲染函数
    randorder(paramsex) {
      orderlist({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        ...paramsex,
      }).then((res) => {
        if (res.data) {
          let arr = res.data.data;
          for (let obj of arr) {
            obj.orderTime1 = getHoursDate(obj.orderTime);
            obj.deliveryTime1 = getHoursDate(obj.deliveryTime);
          }
          this.total = res.data.total;
          this.orderlist = arr;
          this.loading = false;
        } else {
          alert("数据加载失败");
        }
      });
    },
  },
  created() {
    this.randorder();
  },
};
</script>

<style lang="less" scoped>
.order {
  padding: 10px;
  background: #ffffff;
  .list_div {
    min-height: 500px;
    .el-pagination {
      margin-top: 30px;
    }
  }

  #orderseach_btn {
    margin-left: 20px;
  }
  .time_span {
    font-size: 14px;
    color: #606266;
  }
}
.detail_row {
  margin-bottom: 20px;
  .detail_col {
    font-weight: bold;
  }
}
</style>