<template>
  <div class="acclist">
    <h3>账号列表</h3>
    <!-- 编辑弹框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisible">
      <el-form :model="changeacc">
        <el-form-item label="修改账号" :label-width="formLabelWidth">
          <el-input v-model="changeacc.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="修改用户组" :label-width="formLabelWidth">
          <el-select v-model="changeacc.userGroup" placeholder="修改用户组">
            <el-option v-for="item in changeacc.group" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeaccClick" lain="true">确 定</el-button>
      </div>
    </el-dialog>
    
    <!-- 主体 -->
    <el-table
      ref="multipleTable"
      :data="userlist"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="userGroup" label="用户组"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">{{ scope.row.ctime }}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="changeClick(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="delClick(scope.row)" lain="true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 15]"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
    <div style="margin-top: 20px">
      <el-button type="danger" @click="delAll()" lain="true">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import { userlist, deluser, delbatches, changeuser } from "@/api/apis";
import { getDate } from "@/utils/utils";
export default {
  data() {
    return {
      loading:true,
      total: 0,
      currentPage: 1,
      pageSize: 5,
      userlist: [],
      multipleSelection: [],
      dialogFormVisible: false,
      changeacc: {
        name: "",
        userGroup: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        group: ["超级管理员", "普通管理员"],
        resource: "",
        desc: "",
        id: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    //渲染函数
    randerlist() {
      let { currentPage, pageSize } = this;
      userlist(currentPage, pageSize).then((res) => {
        if (res.data) {
          let arr = res.data.data;
          for (let obj of arr) {
            obj.ctime = getDate(obj.ctime);
          }
          this.total = res.data.total;
          this.userlist = arr;
          this.loading=false
        } else {
          alert("数据加载失败");
        }
      });
    },

    // 批量删除
    delAll() {
      if (this.multipleSelection.length) {
        this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let delarr = [];
            for (var k of this.multipleSelection) {
              delarr.push(k.id);
            }
            var ids = JSON.stringify(delarr);
            delbatches(ids).then((res) => {
              if (res.data.code == 0) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                //渲染函数

                this.randerlist();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          message: "您还没有选择用户",
          type: "warning",
        });
      }
    },
    // 选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      //渲染函数
      this.currentPage = 1;
      this.randerlist();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      //渲染函数

      this.randerlist();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除
    delClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deluser(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              //渲染函数
              this.randerlist();
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
    //编辑
    changeClick(row) {
      this.dialogFormVisible = true;
      this.changeacc.name = row.account;
      this.changeacc.userGroup = row.userGroup;
      this.changeacc.id = row.id;
    },
    changeaccClick() {
      let { id, name, userGroup } = this.changeacc;
      changeuser(id, name, userGroup).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          //渲染函数
          this.randerlist();
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });

      this.dialogFormVisible = false;
    },
  },
  created() {
    this.randerlist();
  },
};
</script>

<style lang="less" scoped>
.acclist {
  padding: 0 10px;
  background: #fff;
  min-height: 600px;
  h3 {
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    font-weight: normal;
  }
}
</style>