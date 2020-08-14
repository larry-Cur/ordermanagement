<template>
  <div class="accadd">
    <h3>添加账号</h3>
    <el-col :span="10">
      <el-form :model="addAcc" status-icon ref="addAcc" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username">
          <el-input type="username" v-model="addAcc.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addAcc.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="group">
          <el-select v-model="addAcc.val">
            <el-option
              v-for="item in addAcc.group"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="useraddClick" lain="true">添加</el-button>
          <el-button @click="reClick">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { adduser } from "@/api/apis";
export default {
  data() {
    return {
      addAcc: {
        username: "",
        password: "",
        val: "",
        group: [
          {
            value: "超级管理员",
          },
          {
            value: "普通管理员",
          },
        ],
      },
    };
  },
  methods: {
    useraddClick() {
      let {username,password,val} =this.addAcc
      adduser(username, password, val).then(
        (res) => {
          if (res.data.code == 0) {
            this.addAcc.username = "";
            this.addAcc.password = "";
            this.addAcc.val = "";
            this.$message({
              message: "添加成功",
              type: "success",
            });
          } else {
            alert('注册失败');
          }
        }
      );
    },
    reClick() {
      this.addAcc.username = "";
      this.addAcc.password = "";
      this.addAcc.val = "";
    },
  },
};
</script>

<style lang="less" scoped>
.accadd {
  padding: 0 10px;
  background: #fff;
  min-height: 600px;
  h3 {
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    font-weight: normal;
    margin-bottom: 40px;
  }
}
</style>