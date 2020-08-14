<template>
  <div class="store">
    <h3>
      店铺管理
      <el-button type="primary" @click="changeClick" lain="true">保存</el-button>
    </h3>
    <el-form ref="form" :model="form" label-width="80px" v-loading="loading">
      <el-form-item label="店铺名称">
        <el-col :span="8">
          <el-input v-model="form.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺公告">
        <el-col :span="8">
          <el-input type="textarea" v-model="form.bulletin"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺头像">
        <el-upload
          :action="SHOP_IMG_UPLOAD"
          :on-success="handleAvatarSuccess"
          ref="upload"
          :show-file-list="false"
        >
          <i class="el-icon-plus" v-show="form.avatar==''"></i>
          <img style="width:150px" v-show="form.avatar!=''" :src="SHOP_IMG_URL+form.avatar" />
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺图片">
        <!-- <el-upload :action="SHOP_IMG_UPLOAD" :on-success="picsSuccess" ref="upload" :show-file-list="false">
          <i class="el-icon-plus" v-show="form.pics==''"></i>
          <img
            v-for="item in form.pics"
            :key="item"
            style="width:100px"
            v-show="form.pics!=''"
            :src="SHOP_IMG_URL+item"
          />
        </el-upload>-->
        <el-upload
          :action="SHOP_IMG_UPLOAD"
          list-type="picture-card"
          :on-success="picsSuccess"
          :on-remove="removeImg"
          :file-list="shopimgs"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="配送费">
        <el-col :span="8">
          <el-input v-model="form.deliveryPrice"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配送时间">
        <el-col :span="8">
          <el-input v-model="form.deliveryTime"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="配送描述">
        <el-col :span="8">
          <el-input v-model="form.description"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="店铺评分">
        <el-col :span="8">
          <div class="star_div">
            <el-rate
              v-model="form.score"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            ></el-rate>
          </div>
        </el-col>
      </el-form-item>
      <el-form-item label="销量">
        <el-col :span="8">
          <el-input v-model="form.sellCount"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="活动">
        <el-col :span="8">
          <el-checkbox-group v-model="form.supports">
            <el-checkbox v-for="item in form.supportsList" :key="item" :label="item" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-form-item>
      <el-form-item label="营业时间">
        <el-col :span="8">
          <el-time-picker
            is-range
            v-model="form.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// shopedit
import { shopinfo, SHOP_IMG_UPLOAD, SHOP_IMG_URL, shopedit } from "@/api/apis";
import { getDate } from "@/utils/utils";
//  shopedit
export default {
  data() {
    return {
      loading: true,
      dialogVisible: false,
      maxnum: 1,
      form: {},
      SHOP_IMG_URL: "",
      SHOP_IMG_UPLOAD: "",
      shopimgs: [],
      supportsList: [
        "单人精彩套餐",
        "VC无限橙果汁全场8折",
        "在线支付满28减5",
        "特价饮品8折抢购",
        "单人特色套餐",
        "单人加量吃货餐",
      ],
    };
  },
  created() {
    this.randstore();
  },
  methods: {
    // 上传图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        this.form.avatar = res.imgUrl;
      }
    },
    picsSuccess(res) {
      if (res.code == 0) {
        console.log(res.imgUrl);
        this.form.pics.push(res.imgUrl);
      }
    },
    //移除
    removeImg(res) {
      // 要移除的图片名字
      // 找到并移除
      this.form.pics.splice(this.form.pics.indexOf(res.name), 1);
    },

    //保存
    changeClick() {
      let {
        id,
        name,
        bulletin,
        avatar,
        deliveryPrice,
        deliveryTime,
        description,
        score,
        sellCount,
        supports,
        date,
        pics,
      } = this.form;

      pics = JSON.stringify(pics);
      date = JSON.stringify([getDate(date[0]), getDate(date[1])]);
      supports = JSON.stringify(supports);
      shopedit(
        id,
        name,
        bulletin,
        avatar,
        deliveryPrice,
        deliveryTime,
        description,
        score,
        sellCount,
        supports,
        date,
        pics
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });

          this.randstore();
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });
    },

    //渲染
    randstore() {
      shopinfo().then((res) => {
        // console.log(res.data);
        this.form = res.data.data;
        this.form.supportsList = this.supportsList;
        this.SHOP_IMG_URL = SHOP_IMG_URL;
        this.SHOP_IMG_UPLOAD = SHOP_IMG_UPLOAD;

        this.shopimgs = this.form.pics.map((imgstr) => {
          return {
            name: imgstr,
            url: SHOP_IMG_URL + imgstr,
          };
        });
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.store {
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
    margin-bottom: 20px;
  }
  .up-store {
    padding: 10px;
    background: #fff;
  }
}

.el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.pics_div {
  display: flex;
  width: 40%;
  flex-wrap: wrap;
  justify-content: space-between;
  div {
    margin-bottom: 20px;
  }
}
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
.star_div {
  height: 40px;
  display: flex;
  align-items: center;
}
</style>