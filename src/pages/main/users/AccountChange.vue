<template>
  <div class="accchange">
    <h3>修改密码</h3>
    <el-col :span="10">
      <el-form :model="pwdlist" status-icon ref="pwdlist" label-width="100px" class="demo-ruleForm">
        <el-form-item label="原密码" prop="oldpwd">
          <el-input type="username" v-model="pwdlist.oldpwd" autocomplete="off" @blur="check"></el-input>
        </el-form-item>
        <p v-show="show1" class="warn_p">原密码不正确</p>
        <el-form-item label="新密码" prop="newpwd">
          <el-input type="password" v-model="pwdlist.newpwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model.number="pwdlist.checkpwd" @blur="checknew"></el-input>
        </el-form-item>
        <p v-show="show2" class="warn_p">两次输入密码不一致</p>
        <el-form-item>
          <el-button type="primary" @click="changeClick" lain="true">确定</el-button>
          <el-button @click="reClick">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>

<script>
import { changepwd, checkpwd } from "@/api/apis";

export default {
  data() {
    return {
      flag: 0,
      show1: false,
      show2:false,
      pwdlist: {
        oldpwd: "",
        newpwd: "",
        checkpwd: "",
      },
    };
  },
  methods: {
    // 检查原密码是否正确
    check() {
      checkpwd(this.pwdlist.oldpwd, localStorage.id).then((res) => {
        if (res.data.code == 0) {
          this.flag = 1;
          this.show1 = false;
        } else {
          this.show1 = true;
          this.flag = 0;
        }
      });
    },
    //确认新密码
    checknew() {
      if (this.pwdlist.checkpwd == this.pwdlist.newpwd) {
        this.flag = 1;
        this.show2 = false;
      } else {
        this.show2 = true;
        this.flag = 0;
      }
    },
    //修改密码
    changeClick() {
      if (this.pwdlist.newpwd == "") {
        alert("请输入新密码");
        return;
      }
      if (this.flag) {
        console.log(this.pwdlist.newpwd,localStorage.id);
        changepwd(this.pwdlist.newpwd, localStorage.id).then((res) => {
          if (res.data.code == 0) {
            this.$message({
              type: "success",
              message: "修改成功!",
            });

             this.$router.push("/");
          } else {
            this.$message({
              type: "error",
              message: "修改失败!",
            });
          }
        });
      } else {
        this.$message({
          type: "error",
          message: "请输入正确的数据",
        });
      }
    },
    reClick() {
      this.oldpwd = "";
      this.newpwd = "";
      this.checkpwd = "";
    },
  },
};
</script>

<style lang="less" scoped>
.accchange {
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
.warn_p {
  text-align: center;
  color: rgb(219, 37, 37);
  line-height: 20px;
  margin-bottom: 15px;
}
</style>