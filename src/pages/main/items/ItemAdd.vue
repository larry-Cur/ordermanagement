<template>
  <div class="itemadd">
    <h3 class="title_h3">商品添加</h3>
    <el-form ref="itemadd" :model="itemadd" label-width="80px">
      <el-form-item label="商品名称">
        <el-input v-model="itemadd.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item label="商品分类">
        <el-select v-model="selectVal" placeholder="请选择商品分类">
          <el-option v-for="item in cate" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="itemadd.price"
          @change="handleChange"
          :min="0"
          :max="9999"
          label="商品价格"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品图片">
        <el-upload
          action="http://127.0.0.1:5000/goods/goods_img_upload"
          list-type="picture-card"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :limit="maxnum"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>

      <el-form-item label="商品描述">
        <el-input type="textarea" v-model="itemadd.goodsDesc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="itemaddClick" lain="true">添加商品</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addgood, takecate } from "@/api/apis";
export default {
  data() {
    return {
      cate: [],
      dialogImageUrl: "",
      dialogVisible: false,
      maxnum: 1,
      selectVal:"",
      itemadd: {
        name: "",
        category: "",
        price: "",
        delivery: false,
        type: [],
        imgUrl: "1590399003384.webp",
        goodsDesc: "",
      },
    };
  },
  created() {
    this.randerItemcate();
  },
  methods: {
    //渲染函数
    randerItemcate() {
      takecate().then((res) => {
        if (res.data) {
          this.cate=res.data.categories
          this.selectVal= this.cate[0].cateName
        } else {
          alert("数据错误");
        }
      });
    },
    // 图片上传
    //删除
    handleRemove() {
      // console.log(file, fileList);
    },
  
    //上传图片
    handleAvatarSuccess(res, file) {
      if (res.code == 0) {
        this.dialogImageUrl = file.url;
        this.itemadd.imgUrl = res.imgUrl;
      }
    },

    // 商品添加
    itemaddClick() {
      addgood(
        this.itemadd.name,
        this.selectVal,
        this.itemadd.price,
        this.itemadd.imgUrl,
        this.itemadd.goodsDesc
      ).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            message: "添加成功",
            type: "success",
          });
          this.itemadd.name = "";
          this.itemadd.price = "";
          this.itemadd.goodsDesc = "";
        } else {
          this.$message({
            message: "添加失败",
            type: "warning",
          });
        }
      });
    },
    handleChange(value) {
      this.itemadd.price = value;
    },
  },
};
</script>

<style lang="less" scoped>
.itemadd {
  padding: 0 10px;
  background: #fff;
  min-height: 600px;
  .title_h3 {
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    font-weight: normal;
  }
  .el-form {
    margin-top: 20px;
    .el-input {
      width: 400px;
    }
  }
}
</style>