<template>
  <div class="itemcate">
    <h3>
      商品分类
      <el-button type="primary" @click="addcateClick">添加分类</el-button>
    </h3>
    <el-dialog title="添加分类" :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="5">
          <p class="col_p">分类名称</p>
        </el-col>
        <el-col :span="15">
          <el-input v-model="input" placeholder="分类名称" width="60%"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="end">
        <el-col :span="3">
          <p>是否启用</p>
        </el-col>
        <el-col :span="6">
          <el-switch v-model="value1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addcateSend" lain="true">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 表单 -->
    <el-table :data="itemcate" stripe style="width: 100%">
      <el-table-column type="index" min-width="200" label="序号"></el-table-column>
      <el-table-column label="分类名称" min-width="240">
        <template scope="scope">
          <span v-show="scope.row.changeType" @click="changeValue(scope)">{{scope.row.cateName}}</span>
          <!-- <el-input
            v-model="scope.row.cateName"
            v-show="!scope.row.changeType"
            @blur="changeValue(scope)"
          ></el-input> -->
          <el-input
            v-model="scope.row.cateName"
            v-show="!scope.row.changeType"
          ></el-input>
          
        </template>
      </el-table-column>
      <el-table-column label="是否启用" min-width="200">
        <template scope="scope">
          <el-switch :disabled="scope.row.changeType" v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" @change="changebol(scope)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button
            :type="scope.row.changeType?'':'success'"
            size="small"
            @click="changeValue(scope)"
          >{{scope.row.changeType?'编辑':'完成'}}</el-button>
          <el-button @click="catedelClick(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>


<script>
import { catelist, delcate, addcate, editcate, takecate } from "@/api/apis";
export default {
  data() {
    return {
      dialogVisible: false,
      value: true,
      value1: true,
      currentPage: 1,
      input: "",
      pageSize: 5,
      total: 0,
      itemcate: [],
      allCate:[],
    };
  },
  created() {
    this.randercate();
  },
  methods: {
    //渲染
    randercate() {
      catelist(this.currentPage, this.pageSize).then((res) => {
        if (res.data) {
          let arr = res.data.data;
          // this.total = res.data.total;
          // this.itemcate = res.data.data;
          for (let k of arr) {
            k.changeType = true;
            k.state = k.state == 1
          }
          this.total = res.data.total;
          this.itemcate = arr;
         
        } else {
          alert("数据错误");
        }
      });
      takecate().then((res)=>{
          console.log(res.data.categories);

      })
    },
  //修改
    catesend(scope){
       editcate(scope.row).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          } else {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          }
        });
    },

    //添加分类
    addcateClick() {
      this.dialogVisible = true;
    },
    addcateSend() {
      addcate(this.input, this.value1).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.dialogVisible = false;
          //  渲染
          this.randercate();
        } else {
          this.$message({
            message: "添加失败",
            type: "error",
          });
        }
      });
    },
    //删除
    catedelClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delcate(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              //渲染函数
              this.randercate();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //
    handleCurrentChange(val) {
      this.currentPage = val;
       
      // 渲染
      this.randercate();
    },

    //修改分类
    changeValue(scope) {
      if (scope.row.changeType == true) {
        scope.row.changeType = false;
      } else {
        if (scope.row.cateName == "") {
          this.$message({
            type: "error",
            message: "请输入分类名!",
          });
          return;
        }
        this.catesend(scope)
        scope.row.changeType = true;
      }
    },
    changebol(scope){
      this.catesend(scope)
    }
  },
};
</script>

<style lang="less" scoped>
.itemcate {
  padding: 0 10px;
  background: #fff;
  min-height: 600px;
  h3 {
    font-size: 18px;
    border-bottom: 1px solid #dddddd;
    font-weight: normal;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px 5px 0;
  }
  .col_p {
    font-size: 16px;
    line-height: 40px;
  }
}
.row-bg {
  padding: 10px 0;
}
</style>