<template>
  <el-container>
    <el-header>
      <h1>源丰后台管理</h1>
    </el-header>
    <el-main>
      <div class="log_img">
        <img src="../assets/imgs/logo.png" alt="logo" />
      </div>
      <div class="login_div">
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
    </el-main>
    <el-footer id="footer">
      <p v-html="copy"></p>
    </el-footer>
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
      copy:
        "Copyright &copy; 2020源丰餐饮集团 All Rights Reserved&#8195;&#8195;&#8195; 鄂ICP备05016420号鄂公网安备110401300072号",
      // logo:"",
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
  background-image: linear-gradient(#4ed793, #2d3a4b);
  text-align: center;
  min-width: 1000px;
  h1 {
    padding: 50px 0;
    line-height: 100px;
    font-size: 40px;
    color: #fff;
  }
  .el-main {
    padding: 0 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    min-height: 600px;
  }
  .login_div {
    width: 550px;
    color: #fff;

    p {
      margin-top: 30px;
      width: 100%;
      position: relative;
      input {
        border: none;
        outline: none;
        width: 80%;
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
        left: 60px;
        color: #4ed793;
        margin-top: -15px;
      }
    }
  }
  #login_btn {
    width: 80%;
    background: #4ed793;
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
#footer {
  color: #dddddd;
  height: 30px !important;
}
</style>