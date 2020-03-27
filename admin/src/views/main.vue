<template>
  <div class="main">
    <el-container style="height: 100vh;">
       <div class="aside" width="200px" style="background-color: #545c64">
      <el-menu
        :default-openeds="[]"
        router
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
      >
        <el-menu-item style="  color: white; font-size:20px">
          <a class="iconfont" v-if="isCollapse" @click="changeCollapse">&#xe64b;</a>

          <span slot="title">“昌航通”信息平台</span>
        </el-menu-item>
        <el-menu-item index="/">
          <i class="el-icon-pie-chart"></i>
          <span slot="title">数据中心</span>
        </el-menu-item>
        <el-menu-item index="/admin">
          <i class="el-icon-user-solid"></i>
          <span slot="title">个人中心</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-folder-checked"></i>
            <span slot="title">审核中心</span>
          </template>
          <el-menu-item-group>
            <span slot="title">内容审核</span>

            <el-menu-item index="/contentexamine">问答</el-menu-item>
            <el-menu-item index="1-1">活动</el-menu-item>
            <el-menu-item index="1-2">二手信息</el-menu-item>
            <el-menu-item index="/contentexamine">招聘</el-menu-item>
            <el-menu-item index="/contentexamine">文章/新闻</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">内容审核</span>
            <el-menu-item index="1-1">评论</el-menu-item>
            <el-menu-item index="1-2">回复</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont" >&#xe65c;</i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="/useruser">用户管理</el-menu-item>
          <el-menu-item index="/useradmin">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">网站管理中心</span>
          </template>
         
          <el-menu-item index="/managementlable">标签管理</el-menu-item>
          <el-menu-item index="3-2">轮播管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">反馈中心</span>
          </template>

          <el-menu-item index="3-1">意见反馈</el-menu-item>
          <el-menu-item index="3-2">违规举报</el-menu-item>
        </el-submenu>
       
      </el-menu>
       </div>
      <el-container style=" position:relative ;">
        <el-header>
          <li style="position: absolute;top: 0;left: 60px; font-size:20px">
            <span style="font-size:20px" v-if="isCollapse">“昌航通”信息平台</span>
            <a class="iconfont" @click="changeCollapse" v-if="!isCollapse">&#xe61f;</a>
          </li>

          <span style="margin-right: 30px">王小虎</span>
          <span>退出</span>
        </el-header>

        <el-main style=" padding: 0px; background-color: #f7f7f7;">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      isCollapse: true
    };
  },
  methods: {
    changeCollapse() {
      this.isCollapse = !this.isCollapse;
    }
  }
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-header {
  text-align: right;
  font-size: 12px;
  background-color: #545c64;
  color: white;
  line-height: 60px;
  text-align: right;
}
.el-menu {
  border-right: 0;
}
.el-aside {
  color: white;
}
.aside{
    overflow:auto;
}
</style>