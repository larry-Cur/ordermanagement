<template>
  <el-container>
    <div class="login_div">
      <h1>鑫三利餐馆后台管理</h1>
      <p class="username_p">
        <i class="el-icon-user-solid"></i>
        <input type="text" id="username_ipt" v-model="acc" />
      </p>
      <p class="password_p">
        <i class="el-icon-lock"></i>
        <input type="password" id="password_ipt" v-model="pwd" />
      </p>
      <p class="err_p">{{errMsg}}</p>
      <p>
        <button type="button" id="login_btn" @click="loginClick" lain="true">登录</button>
      </p>
    </div>
  </el-container>
</template>

<script>
import { login } from "@/api/apis";
//@表示src根目录
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      errMsg: "",
    };
  },
  methods: {
    loginClick() {
      // console.log(this.$router)  指向main.js的router对象实例
      login(this.acc, this.pwd).then((res) => {
        if (res.data.code == 0) {
          localStorage.token = res.data.token;
          localStorage.role = res.data.role;
          localStorage.acc = this.acc;
          localStorage.id = res.data.id;

          this.$message({
            message: "登录成功",
            type: "success",
          });
          this.$router.push("/main/index");
        } else {
          this.errMsg = res.data.msg;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  width: 100%;
  background: #2d3a4b;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .login_div {
    width: 550px;
    color: #fff;
    h1 {
      line-height: 50px;
    }
    p {
      margin-top: 30px;
      width: 100%;
      position: relative;
      input {
        border: none;
        outline: none;
        width: 100%;
        height: 50px;
        font-size: 30px;
        border: 1px solid #c6c9cc;
        border-radius: 10px;
        background: #283443;
        color: #fff;
        text-indent: 3rem;
      }
      i {
        position: absolute;
        font-size: 30px;
        top: 50%;
        left: 5px;
        color: #c0c4cc;
        margin-top: -15px;
      }
    }
  }
  #login_btn {
    width: 100%;
    background: #409eff;
    line-height: 54px;
    border: none;
    outline: none;
    color: #fff;
    font-size: 20px;
    border-radius: 10px;
  }
  .err_p {
    color: crimson;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>