<template>
  <div class="person">
    <p>管理员信息</p>
    <p>
      管理员ID：
      <span>{{user.id}}</span>
    </p>
    <p>
      账号：
      <span>{{user.account}}</span>
    </p>
    <p>
      用户组：
      <span>{{user.userGroup}}</span>
    </p>
    <p>
      创建时间：
      <span>{{user.ctime}}</span>
    </p>
    <div class="userimg_div">
      <span>管理员头像:</span>
      <div class="img_div">
        <el-upload
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :data="uploaddata"
          :limit="maxnum"
        >
          <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import { takeuser } from "@/api/apis";
import { getDate } from "@/utils/utils";

export default {
  data() {
    return {
      maxnum:1,
      uploaddata: {},
      user: {
        id: "",
        name: "",
        group: "",
        date: "",
        src: "",
      },
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.$bus.$emit('imgup')
      }
      console.log(res);
      console.log(file);
    },
    randinfo() {
      takeuser(localStorage.id).then((res) => {
        if (res.data) {
          console.log(res.data);
          this.user = res.data.accountInfo;

          this.user.ctime = getDate( this.user.ctime)
        } else {
          alert("数据加载失败");
        }
      });
    },
  },
  created() {
    this.uploaddata = { id: localStorage.id };
    this.randinfo()
  },
};
</script>

<style lang="less" scoped>
.person {
  background: #fff;
  min-height: 500px;
  padding: 10px;
  p {
    display: flex;
    font-size: 16px;
    color: #555;
    line-height: 50px;
    border-bottom: 2px solid #dddddd;
    text-indent: 10px;
    span {
      margin-right: 10px;
    }
  }
  .userimg_div {
    font-size: 16px;
    color: #555;
    display: flex;
    align-items: center;
    margin-top: 20px;
    span {
      text-indent: 10px;
    }
    .img_div {
      width: 200px;
      height: 200px;
      border: 1px solid #dddddd;
      margin-left: 20px;
      position: relative;
      i {
        position: absolute;
        top: 44%;
        left: 44%;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>