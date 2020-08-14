<template>
  <div class="itemlist">
    <h3 class="title_h3">商品列表</h3>

    <!-- 编辑弹框 -->
    <el-dialog title="修改商品" :visible.sync="dialogFormVisible">
      <el-form :model="goodtable">
        <el-form-item label="商品名称" :label-width="formLabelWidth" class="alrt_item">
          <el-input v-model="goodtable.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth" class="alrt_item">
          <!-- <el-input v-model="goodtable.category" autocomplete="off"></el-input> -->
          <el-select v-model="goodtable.category" placeholder="请选择商品分类">
            <el-option v-for="item in goodtable.cate" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth" class="alrt_item">
          <el-input v-model="goodtable.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品图片地址" :label-width="formLabelWidth" class="alrt_item">
          <el-upload :action="ITEMS_IMG_UPLOAD" :on-success="handleAvatarSuccess" ref="upload" :show-file-list="false">
            <i class="el-icon-plus" v-show="goodtable.imgUrl==''"></i>
            <img
              style="width:100% "
              v-show="goodtable.imgUrl!=''"
              :src="ITEMS_IMG_URL+goodtable.imgUrl"
            />
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth" class="alrt_item">
          <el-input v-model="goodtable.goodsDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelClick">取 消</el-button>
        <el-button type="primary" @click="changegoodClick" lain="true">确 定</el-button>
      </div>
    </el-dialog>

    <el-table :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props" class="item-desc">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="ITEMS_IMG_URL+props.row.imgUrl" alt />
            </el-form-item>
            <!-- time -->
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount}}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img :src="ITEMS_IMG_URL+scope.row.imgUrl" min-width="50" height="50" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small" @click="delClick(scope.row)" lain="true">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="currentPage"
      layout="total, prev, pager, next, jumper"
      :page-size="pagesize"
      :page-sizes="[5, 10, 20]"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import {
  goodlist,
  delgood,
  changegood,
  takecate,
  ITEMS_IMG_URL,
  ITEMS_IMG_UPLOAD,
} from "@/api/apis";
import { getDate } from "@/utils/utils";

export default {
  data() {
    return {
       loading:true,
      pagesize: 5,
      currentPage: 1,
      total: 10,
      tableData: [],
      catelist: [],
      dialogFormVisible: false,
      formLabelWidth: "100px",
      ITEMS_IMG_UPLOAD: "",
      ITEMS_IMG_URL: "",
      goodtable: {},
    };
  },
  created() {
    this.randerItem();
  },
  methods: {
    //渲染
    randerItem() {
      let { currentPage, pagesize } = this;
      this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD;
      this.ITEMS_IMG_URL = ITEMS_IMG_URL;
      goodlist(currentPage, pagesize).then((res) => {
        if (res.data) {
          let arr = res.data.data;
          for (let obj of arr) {
            obj.ctime = getDate(obj.ctime);
          }
          this.total = res.data.total;
          this.tableData = arr;
          // console.log(this.tableData);
          this.loading=false
        } else {
          alert("数据加载失败");
        }
      });
    },
    // 编辑
    handleClick(row) {
      takecate().then((res) => {
        let obj = { ...row };
        obj.cate = [];
        let arr = res.data.categories;

        for (let key of arr) {
          obj.cate.push(key.cateName);
        }
        this.goodtable = obj;
        this.dialogFormVisible = true;
      });
    },

    // 图片上传
    //删除

    //上传图片
    handleAvatarSuccess(res) {
      if (res.code == 0) {
        // this.goodtable.imgUrl1 = file.url;
        this.goodtable.imgUrl = res.imgUrl;
      }
    },
    // 修改确认
    changegoodClick() {
      delete this.goodtable.rating;
      delete this.goodtable.ratings;
      delete this.goodtable.sellCount;
      delete this.goodtable.ctime;
      delete this.goodtable.cate;

      console.log(this.goodtable);
      changegood(this.goodtable).then((res) => {
        if (res.data.code == 0) {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          this.dialogFormVisible = false;
          //渲染函数
          this.randerItem();
        } else {
          this.$message({
            type: "error",
            message: "修改失败!",
          });
        }
      });
    },
    //取消
    cancelClick() {
      this.dialogFormVisible = false;
      this.$refs.upload.clearFiles();
    },

    // 删除
    delClick(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delgood(row.id).then((res) => {
            if (res.data.code == 0) {
              this.$message({
                message: "删除成功",
                type: "success",
              });
              //渲染函数
              this.randerItem();
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

    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      //渲染函数
      this.randerItem();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      //渲染函数
      this.randerItem();
    },
  },
};
</script>

<style lang="less" scoped>
.itemlist {
  padding: 0 10px;
  background: #fff;
  min-height: 500px;
  .title_h3 {
    font-size: 18px;
    line-height: 50px;
    border-bottom: 1px solid #dddddd;
    font-weight: normal;
  }

  .el-form-item {
    width: 40%;
  }

  .el-form-item {
    img {
      width: 30px;
    }
  }
  .el-pagination {
    margin-top: 30px;
  }
}
.alrt_item {
  width: 60% !important;
}
</style>