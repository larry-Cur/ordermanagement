<template>
  <el-container>
    <!-- 侧边栏导航 -->
    <el-aside width="270px">
      <div class="aside-title_div">
        <div class="t-img_div">
          <i class="el-icon-dish"></i>
        </div>
        <p>源丰订单中心</p>
      </div>
      <el-menu
        :default-active="curhash"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#4ED793"
        router
        unique-opened
      >
        <div v-for="item in power" :key="item.url">
          <el-menu-item v-if="!item.children" :index="item.url">
            <i :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.url">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.url"
              :index="child.url"
            >{{child.title}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header class="header">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="header-nav">
          <el-breadcrumb-item :to="{ path: '/' }"><span class="nav_span">首页</span></el-breadcrumb-item>
          <el-breadcrumb-item v-for="item in hashName" :key="item"><span class="nav_span">{{item}}</span></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="user-img">
          <router-link to="/main/person">
            <span>{{username}}</span>
            <el-avatar :src="userimg" :size="50"></el-avatar>
          </router-link>
        </div>
      </el-header>
      <!-- 身体 -->
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { checktoken, accinfo } from "@/api/apis";
export default {
  data() {
    return {
      username: "",
      hashName: [],
      curhash: "",
      userimg: "",
      navlist: [
        {
          title: "后台首页",
          icon: "el-icon-s-home",
          url: "/main/index",
          roles: ["super", "normal"],
        },
        {
          title: "订单管理",
          icon: "el-icon-document",
          url: "/main/order",
          roles: ["super", "normal"],
        },
        {
          title: "商品管理",
          icon: "el-icon-shopping-bag-1",
          url: "/main/items",
          children: [
            {
              title: "商品列表",
              url: "/main/items/itemlist",
            },
            {
              title: "商品添加",
              url: "/main/items/itemadd",
            },
            {
              title: "商品分类",
              url: "/main/items/itemcategory",
            },
          ],
          roles: ["super", "normal"],
        },
        {
          title: "店铺管理",
          icon: "el-icon-takeaway-box",
          url: "/main/store",
          roles: ["super"],
        },
        {
          title: "账号管理",
          icon: "el-icon-takeaway-box",
          url: "/main/users/accountlist",
          children: [
            {
              title: "账号列表",
              url: "/main/users/accountlist",
            },
            {
              title: "添加账号",
              url: "/main/users/accountadd",
            },
            {
              title: "修改密码",
              url: "/main/users/accountchange",
            },
          ],
          roles: ["super"],
        },
        {
          title: "销售统计",
          icon: "el-icon-pie-chart",
          url: "/main/sal",
          children: [
            {
              title: "商品统计",
              url: "/main/sales",
            },
            {
              title: "订单统计",
              url: "/main/salesorder",
            },
          ],
          roles: ["super"],
        },
      ],
    };
  },
  computed: {
    //权限数组
    power() {
      return this.navlist.filter((item) =>
        item.roles.includes(localStorage.role)
      );
    },
  },
  created() {
    //当前HASH值路由对象
    (this.curhash = this.$route.path),
      //验证token
      checktoken(localStorage.token).then((res) => {
        if (res.data.code == 0) {
          this.username = localStorage.acc;
          this.$message({
            message: "登录成功",
            type: "success",
          });
        } else {
          this.username = "请登录";
        }
      });
    // 渲染
    this.rerandinfo();
    //监听bus的传递事件
    this.$bus.$on("imgup", () => {
      this.rerandinfo();
    });
    //初始化给二级导航赋值
    this.hashName = this.$route.meta.hashname;
  },
  methods: {
    rerandinfo() {
      accinfo(localStorage.id).then((res) => {
        this.userimg = res.data.accountInfo.imgUrl;
      });
    },
  },
  watch: {
    //面包屑导航
    $route(to) {
      this.hashName = to.meta.hashname;
    },
  },
};
</script>

<style lang="less" scoped>
@base: #304156;
@basegary: #f0f2f5;
.nav_span{
  color: #fff;
}
.el-container {
  height: 100%;
  .el-aside {
    background: @base;
    p {
      color: #4ed793;
    }
  }
}

.header {
  display: flex;
  background-image: linear-gradient(to right, #2d3a4b, #4ed793;);
  .header-nav {
    font-size: 20px;
    line-height: 50px;
    flex: 1;
  }
  .is-link {
    color: #fff;
  }
  .user-img {
    a {
      display: flex;
      align-items: center;
      color: #000;
      span {
        margin-left: 12px;
        font-weight: bold;
      }
    }
  }
}
.el-main {
  background: @basegary;
  padding: 20px 10px 0;
  min-width: 1000px;
}
ul {
  border: none;
}
.aside-title_div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  .t-img_div {
    background: #4ed793;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 100%;
    i {
      font-size: 40px;
    }
  }
  p {
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    margin-left: 10px;
  }
}
.el-menu-item,
.el-submenu span {
  font-size: 18px;
}
</style>